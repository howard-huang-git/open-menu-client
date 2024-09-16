import './MenuListing.scss'

function MenuListing() {
  return (
    <>
        <div className="menu-listing">
            <div className="menu-listing__left">
                <p className="menu-listing__name">Big Mac</p>
                <p className="menu-listing__restaurant">McDonalds</p>
            </div>
            <div className="menu-listing__right">
                <p className="menu-listing__rating">4.8 ★</p>
                <p className="menu-listing__price">$7.99</p>
            </div>
        </div>
    </>
  )
}

export default MenuListing