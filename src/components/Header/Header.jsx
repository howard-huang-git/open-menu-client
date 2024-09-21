import './Header.scss'
import arrow from '../../assets/Icons/arrow_back-25px.png'
import { Link, NavLink } from 'react-router-dom'

function Header({ link }) {

  const navLinks = ({ isActive }) => isActive ? "header__nav-link header__nav-link--active" : "header__nav-link"

  return (
    <>
        <header className='header'>
            <Link to={link} className='header__back'><img src={arrow} alt="back arrow" className='header__arrow' /></Link>
            <h1 className="header__title">Open Menu</h1>
            <div className="header__placeholder"></div>
            <ul className="header__nav-bar">
              <li className="header__nav-list"><NavLink to="/" className={navLinks}>Home</NavLink></li>
              <li className="header__nav-list"><NavLink to="/about" className={navLinks}>About</NavLink></li>
              <li className="header__nav-list"><NavLink to="/search" className={navLinks}>Search</NavLink></li>
              <li className="header__nav-list"><NavLink to="/rating" className={navLinks}>Rate</NavLink></li>
            </ul>
        </header>
    </>
  )
}

export default Header