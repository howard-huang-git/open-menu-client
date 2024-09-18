import './RestaurantMenu.scss'

function RestaurantMenu({ item }) {
    try {

        const rating = (star) => {
            if (star === 0) {
                return ""
            } else {
                return `${star.toFixed(1)} ★`
            }
        }

        const cost = (price) => {
            return `$${price.toFixed(2)}`
        }

        return (
            <>
                <div className="restaurant-menu">
                    <h3 className="restaurant-menu__item">{item.item}</h3>
                    <p className="restaurant-menu__price">{cost(item.price)}</p>
                    <h3 className="restaurant-menu__rating">{rating(item.avg_rating)}</h3>
                </div>
            </>
          )
    } catch {}
}

export default RestaurantMenu