import { Link } from 'react-router-dom'
import './RestaurantListing.scss'

function RestaurantListing({ data }) {

    const rating = (avg) => {
        if (avg === 0) {
          return ""
        } else {
          return `${avg.toFixed(1)} ★`
        }
    }

    const address = (string) => {
      return string.split(',')[0]
    }

    const price_range = (min, max) => {
      if (min === null || max === null) {
        return <></>
      } else {
        return <p className="restaurant-listing__price">${Math.round(min)} - {Math.round(max)}</p>
      }
    }

  return (
    <>
        <div className="restaurant-listing">
            <div className="restaurant-listing__left">
                <Link to={`/restaurant/${data.id}`} className="restaurant-listing__link">
                  <p className="restaurant-listing__name">{data.name}</p>
                </Link>
                <p className="restaurant-listing__category">{address(data.address)}</p>
            </div>
            <div className="restaurant-listing__right">
                <p className="restaurant-listing__rating">{rating(data.rating)}</p>
                {price_range(data.min, data.max)}
            </div>
        </div>
    </>
  )
}

export default RestaurantListing