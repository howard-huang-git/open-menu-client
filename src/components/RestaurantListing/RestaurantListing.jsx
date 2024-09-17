import './RestaurantListing.scss'

function RestaurantListing({ data }) {

    const rating = (avg) => {
        if (avg === 0) {
          return ""
        } else {
          return `${avg.toFixed(1)} ★`
        }
      }

  return (
    <>
        <div className="restaurant-listing">
            <div className="restaurant-listing__left">
                <p className="restaurant-listing__name">{data.name}</p>
                <p className="restaurant-listing__category">{data.type}</p>
            </div>
            <div className="restaurant-listing__right">
                <p className="restaurant-listing__rating">{rating(data.rating)}</p>
                <p className="restaurant-listing__price">${Math.round(data.min)} - {Math.round(data.max)}</p>
            </div>
        </div>
    </>
  )
}

export default RestaurantListing