import { Parallax } from 'react-scroll-parallax'

export default function HeroImg({moveY, className, imgSrc}) {
    return (
        <Parallax y={moveY} className={className}>
                <img 
                    src={imgSrc.imgUrl} 
                    alt={imgSrc.alt}
                    />
        </Parallax>
                    
    )
}