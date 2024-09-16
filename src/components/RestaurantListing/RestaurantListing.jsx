import './RestaurantListing.scss'

function RestaurantListing() {
  return (
    <>
        <div className="restaurant-listing">
            <div className="restaurant-listing__left">
                <p className="restaurant-listing__name">McDonalds</p>
                <p className="restaurant-listing__category">Fast Food</p>
            </div>
            <div className="restaurant-listing__right">
                <p className="restaurant-listing__rating">4.8 ★</p>
                <p className="restaurant-listing__price">$8 - $16</p>
            </div>
        </div>
    </>
  )
}

export default RestaurantListing