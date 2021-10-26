import './Artwork.css'

import axios from 'axios'

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import UpNav from './UpNav'
import BackNav from './BackNav'

import parse from 'html-react-parser'

import {
    getArtApiUrlById,
    makeIiifUrl,
    makeImgSrcUrl,
    getImgProperties
} from '../lib/api/artUtils'

import {
    getWikiSearchUrl,
    getWikiParseUrl,
    cleanWikiResult
} from '../lib/api/wikiUtils'

import Loader from './Loader'
import useScroll from '../lib/hooks/useScroll'

export default function Artwork() {

    const { id } = useParams()

    let [imgSrc, setImgSrc] = useState('')
    let [description, setDescription] = useState('')

    let { y } = useScroll()
    
    useEffect(() => {

        let builtUrl, alt, title, artist, searchTerm

        let noResult = (
            <p>Looks like there were no results on wiki for this gem - why not <a href="https://en.wikipedia.org/wiki/Wikipedia:Articles_for_creation" target="_blank" rel="noreferrer">ask for one to be created?</a></p>
        )

        const cancelToken = axios.CancelToken
        const source = cancelToken.source()

        let cancelOptions = { cancelToken: source.token }

        axios.get(getArtApiUrlById(id), cancelOptions)
            .then(({ data }) => {
                ({ alt, title, artist, searchTerm } = getImgProperties(data))

                builtUrl = makeIiifUrl(data)

                return axios.get(builtUrl)    
            })
            .then(({data}) => {

                let { width, height } = data.sizes[2]
                let imgUrl = makeImgSrcUrl(width, height, builtUrl)

                setImgSrc({id, imgUrl, alt, title, artist})
            })
            .then(res => {
                return axios.get(getWikiSearchUrl(searchTerm), cancelOptions)
            })
            .then(({data}) => {
                let searchResults = data.query.search
                if (searchResults.length === 0) {
                    setDescription(noResult)
                    return
                }
                let firstName = artist.split(' ')[0]
                let relevantResult = (searchResults.find(item => item.snippet.includes(firstName)) || searchResults[0])
                return axios.get(getWikiParseUrl(relevantResult))
            })
            .then(({ data }) => {
                setDescription(parse(cleanWikiResult(data.parse.text)))
            })
            .catch(err => {
                if (axios.isCancel(err)) {
                    console.log('request cancelled', err.message)
                }
            })

            return () => source.cancel('cancelled by user')

    }, [id])

    return (
        <section className="artwork">
            { imgSrc 
                ? <div className="artwork-main">
                    {y > 1000 ? <UpNav /> : <BackNav />}
                    <h2 className="title">{imgSrc.title}</h2>
                    <h3>{imgSrc.artist}</h3>
                    <img src={imgSrc.imgUrl} alt={imgSrc.alt} className="artwork-img"/>
                    { description
                        ? <div className="description">
                            {description}
                        </div>
                        : <Loader />
                    }
                </div>
                : <Loader />
            }
        </section>
    )
}