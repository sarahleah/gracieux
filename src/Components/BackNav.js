import './Nav.css'

import { Link } from 'react-router-dom'

import bigBack from '../icons/bigBack.png'

export default function BackNav() {

    return (
        <nav>
            <Link to="/" className="icon-nav" >
                <img src={bigBack} alt="arrow" className="icon"/>
            </Link>
        </nav>
    )
}