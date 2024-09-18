import './MenuReview.scss'
import TimestampConverter from '../TimestampConverter/TimestampConverter'

function MenuReview({ review }) {

    const rating = (star) => {
        if (star === 0) {
            return ""
        } else {
            return `${star} ★`
        }
      }

      try {
        return (
            <>
                <div className="menu-review">
                    <div className="menu-review__head">
                        <div className="menu-review__left">
                            <h3 className="menu-review__name">{review.reviewer_name}</h3>
                            <p className="menu-review__date">{<TimestampConverter timestamp={review.timestamp} />}</p>
                        </div>
                        <div className="menu-review__right">
                            <h3 className="menu-review__rating">{rating(review.rating)}</h3>
                        </div>
                    </div>
                    <div className="menu-review__body">
                        <p className="menu-review__copy">{review.review}</p>
                    </div>
                </div>
            </>
          )
      } catch {}
  
}

export default MenuReview