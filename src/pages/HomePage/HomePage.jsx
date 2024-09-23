import { Link } from 'react-router-dom'
import CTA from '../../components/CTA/CTA'
import './HomePage.scss'
import restaurant from '../../assets/Images/restaurant.jpg'

function HomePage() {
  return (
    <>
      <main className='homepage'>
        <h1 className="homepage__title">Open Menu</h1>
        <h2 className="homepage__subtitle">The World is Your Menu</h2>
        <div className="homepage__imgbox">
          <img src={restaurant} alt="fried fries and burger on plate" className="homepage__image" />
        </div>
        <Link to="/rating"><CTA className="homepage__button" text="Rate Your Meal" type="button" /></Link>
        <Link to="/search"><CTA className="homepage__button" text="Search for Food" type="button" /></Link>
        <Link to="/add"><CTA className="homepage__button" text="Add a Menu" type="button" /></Link>
      </main>
    </>
  )
}

export default HomePage