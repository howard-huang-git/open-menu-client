import { Link } from 'react-router-dom'
import './MenuListing.scss'

function MenuListing({ data }) {

  const rating = (avg) => {
    if (avg === 0) {
      return ""
    } else {
      return `${avg.toFixed(1)} ★`
    }
  }

  return (
    <>
        <div className="menu-listing">
            <div className="menu-listing__left">
                <Link to={`/menu/${data.id}`} className="menu-listing__link">
                  <p className="menu-listing__name">{data.item}</p>
                </Link>
                <p className="menu-listing__restaurant">{data.name}</p>
            </div>
            <div className="menu-listing__right">
                <p className="menu-listing__rating">{rating(data.avg_rating)}</p>
                <p className="menu-listing__price">${data.price.toFixed(2)}</p>
            </div>
        </div>
    </>
  )
}

export default MenuListing