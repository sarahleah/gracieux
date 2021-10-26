import './Gallery.css'

import axios from 'axios'

import { 
    getImgProperties, 
    makeImgSrcUrl, 
    makeIiifUrl 
} from '../lib/api/artUtils'

import { useState, useEffect } from 'react'

import InfiniteScroll from 'react-infinite-scroll-component';
import Masonry from 'react-masonry-css'
import GalImgCard from './GalImgCard';
import Loader from './Loader';

export default function Gallery() {

    let [page, setPage] = useState(1)
    let [imgSrcs, setImgSrcs] = useState([])

    useEffect(() => {
        function getPublicImages(pageNum, limit) {
            axios.get(`https://api.artic.edu/api/v1/artworks/search?query[term][is_public_domain]=true&page=${pageNum}&limit=${limit}`)
                .then(res => {
                    let imgs = res.data.data

                    
                    imgs.forEach(img => {
                            let builtUrl, alt, title, artist, id, api_id

                            api_id = img.id

                            axios.get(img.api_link)
                                .then(({ data }) => {

                                    ({ id, alt, title, artist } = getImgProperties(data))

                                    builtUrl = makeIiifUrl(data)

                                    return axios.get(builtUrl)  
                                })
                                .then(res => {
                                    let { width, height } = res.data.sizes[2]
                                    let imgUrl = makeImgSrcUrl(width, height, builtUrl)
                
                                    setImgSrcs(prevState => ([...prevState, {id, imgUrl, alt, title, artist, api_id}]))
                                })
                                .catch(err => {
                                    console.error(err)
                                })
                        })
                    })
                }

        getPublicImages(page, 10)
    }, [page])

    
    const breakpointColumnsObj = {
        default: 4,
        1100: 3,
        700: 2,
        500: 1
    };

    function incPage() {
        setPage(page + 1)
    }
    
    return (
        <section className="gallery">
            <InfiniteScroll
                dataLength={imgSrcs.length}
                next={incPage}
                hasMore={true}
                loader={<Loader />}
            >
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column">
                        {imgSrcs.map((img, i) => <GalImgCard key={i} img={img} />)}
                </Masonry>
            </InfiniteScroll>
        </section>
    )
}