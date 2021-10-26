import './Nav.css'

import bigUp from '../icons/bigUp.png'

export default function UpNav() {

    const handleScroll = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    return (
        <nav className="icon-nav" >
            <button onClick={handleScroll}><img src={bigUp} alt="arrow" className="icon"/></button>
        </nav>
    )
}