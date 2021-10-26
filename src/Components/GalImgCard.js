import { Link } from 'react-router-dom'

export default function GalImgCard({img}) {
    return (
        <div className="img-card">
            <img 
                src={img.imgUrl} 
                alt={img.alt}
                ></img>
            <Link 
                to={`/artworks/${img.api_id}`} 
                className="img-deets" >
                    <div className="txt">
                        <h3>{img.title}</h3>
                        <h4>{img.artist}</h4>
                    </div>
            </Link>
        </div>
    )
}