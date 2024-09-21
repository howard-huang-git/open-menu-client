import './Header.scss'
import arrow from '../../assets/Icons/arrow_back-25px.png'
import { Link } from 'react-router-dom'

function Header({ link }) {
  return (
    <>
        <header className='header'>
            <Link to={link}><img src={arrow} alt="back arrow" className='header__back' /></Link>
            <h1 className="header__title">Open Menu</h1>
            <div className="header__placeholder"></div>
        </header>
    </>
  )
}

export default Header