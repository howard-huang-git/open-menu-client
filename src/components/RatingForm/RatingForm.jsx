import './RatingForm.scss'
import CTA from '../CTA/CTA'
import FormField from '../FormField/FormField'
import StarSelector from '../StarSelector/StarSelector'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function RatingForm() {

    const { id } = useParams();
    const apiUrl = `${import.meta.env.VITE_API_URL}`;
    const navigate = useNavigate();

    const [menuData, setMenuData] = useState({})
    const [ratingStars, setRatingStars] = useState(0)

    const fetchFood = async () => {
        try {
          let response = await axios.get(apiUrl + `/foods/${id}`);
          setMenuData(response.data[0]);
        } catch (error) {
          console.error(error);
        }
      }

      useEffect(() => {
        fetchFood();
      }, []);

      const handleSubmit = async (event) => {
        event.preventDefault();
        let form = event.target;
        let name = form.ratingName.value
        let review = form.ratingReview.value

        try {

            const formData = {
                rating: ratingStars,
                review: review,
                reviewer_name: name,
                menu_id: id,
                restaurant_id: menuData.restaurant_id
            }

            axios.post(apiUrl + "/ratings", formData)
            .then(() => {
                alert("Submission Successfull!")
                navigate(`/menu/${id}`)

            })
            .catch((error) => {
                console.error(error);
            }) 
        } catch (error) {
            console.error(error)
        }
      }

  return (
    <>
        <form className='rating-form' onSubmit={handleSubmit}>
            <h2 className="rating-form__headline">Review Your Meal</h2>
            <div className="rating-form__info-box">
                <div className="rating-form__info">
                    <p className="rating-form__info-label">Menu Item:</p>
                    <p className="rating-form__detail">{menuData.item}</p>
                </div>
                <div className="rating-form__info">
                    <p className="rating-form__info-label">Restaurant:</p>
                    <p className="rating-form__detail">{menuData.name}</p>
                </div>
            </div>
            <div className="rating-form__rater">
                <p className="rating-form__label">Rating:</p>
                <div className="rating-form__stars"><StarSelector rating={ratingStars} change={setRatingStars} /></div>
            </div>
            <div className="rating-form__field">
                <label className="rating-form__label" htmlFor="ratingName">Name:</label>
                <FormField className="rating-form__name" type="input" placeholder="Enter your name" name="ratingName" />
            </div>
            <div className="rating-form__field">
                <label className="rating-form__label" htmlFor="ratingReview">Review:</label>
                <FormField className="rating-form__review" type="textarea" placeholder="Share your thoughts" name="ratingReview" />
            </div>
            <CTA className="rating-form__button" text="SUBMIT"/>
        </form>
    </>
  )
}

export default RatingForm