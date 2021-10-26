import './Hero.css'

import axios from 'axios'

import {
     makeImgSrcUrl,
     makeIiifUrl,
     getImgProperties
} from '../lib/api/artUtils'

import HeroImg from './HeroImg'
import Loader from './Loader'
import UpNav from './UpNav'

import { useState, useEffect } from 'react'

import useScroll from '../lib/hooks/useScroll'

export default function Hero() {

    let [imgSrcs, setImgSrcs] = useState({})

    let { y } = useScroll()

    useEffect(() => {
        
        const cancelToken = axios.CancelToken
        const source = cancelToken.source()

        const getImage = id => {

            let builtUrl, alt, title, artist

            let cancelOptions = { cancelToken: source.token }

            axios.get(`https://api.artic.edu/api/v1/artworks/${id}`, cancelOptions)
                .then(({ data }) => {

                    ({ alt, title, artist } = getImgProperties(data))

                    builtUrl = makeIiifUrl(data)

                    return axios.get(builtUrl, cancelOptions)  
                })
                .then(res => {

                    let { width, height } = res.data.sizes[2]
                    
                    let imgUrl = makeImgSrcUrl(width, height, builtUrl)

                    setImgSrcs(prevState => ({...prevState, [id]: {id, imgUrl, alt, title, artist}}))
                })
                .catch(err => {
                    console.log(err)
                })
        }

        getImage(80607)
        getImage(229393)
        getImage(6565)

        return () => source.cancel('cancelled by user')

    }, [])

    return (
        <section className="hero-wrap">
            <div className="hero">   
                {y > 1000 ? <UpNav /> : ''}
                {Object.keys(imgSrcs).length >= 3
                    ? <div className="hero-imgs">
                        <HeroImg moveY={[-40, 40]} className="amer-horr" imgSrc={imgSrcs[6565]}/>
                        <HeroImg moveY={[-30, 30]} className="untitled" imgSrc={imgSrcs[229393]}/>
                        <HeroImg moveY={[-20, 20]} className="self-portrait" imgSrc={imgSrcs[80607]}/>
                    </div>
                    : <Loader />
                }
                <div className="hero-txt">
                    <h1 className="gracieux">
                        gracieux
                    </h1>
                </div>
            </div>
        </section>
    )
}