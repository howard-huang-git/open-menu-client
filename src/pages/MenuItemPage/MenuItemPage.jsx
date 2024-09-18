import { useEffect, useState } from "react";
import axios from "axios";
import Divider from '../../components/Divider/Divider'
import './MenuItemPage.scss'
import { useParams } from "react-router-dom";
import MenuReview from "../../components/MenuReview/MenuReview";

function MenuItemPage() {

  const { id } = useParams();
  const apiUrl = `${import.meta.env.VITE_API_URL}`;

  const [foodData, setFoodData] = useState({})
  const [foodReviews, setFoodReviews] = useState([])

  const fetchFood = async () => {
    try {
      let response = await axios.get(apiUrl + `/foods/${id}`);
      if (Array.isArray(response.data)) {
        if (response.data[0].avg_rating) {
          let data = {
            ...response.data[0],
            avg_rating: Number(response.data[0].avg_rating)
          }
          setFoodData(data);
        } else {
          setFoodData(response.data[0]);
        }
        
      } else {
        setError("Invalid data format");
      }
    } catch (error) {
      console.error(error);
    }
  }

  const fetchMenuReview = async () => {
    try {
      let response = await axios.get(apiUrl + `/ratings/food/${id}`);
      if (Array.isArray(response.data)) {
        setFoodReviews(response.data)
      } else {
        setError("Invalid data format");
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchFood();
    fetchMenuReview();
  }, []);

  const rating = (star) => {
    try {
      if (star === 0) {
        return ""
      } else {
        return `${star.toFixed(1)} ★`
      }
    } catch {}
    
  }

  const cost = (price) => {
    try {
      return `$${price.toFixed(2)}`
    } catch {}
  }


  return (
    <>
      <section className="menu-item__info">
        <div className="menu-item__details">
          <h1 className="menu-item__title">{foodData.item}</h1>
          <h3 className="menu-item__restaurant">{foodData.name}</h3>
          <h3 className="menu-item__category">{foodData.category}</h3>
        </div>
        <div className="menu-item__data">
          <h2 className="menu-item__rating">{rating(foodData.avg_rating)}</h2>
          <h2 className="menu-item__price">{cost(foodData.price)}</h2>
        </div>
      </section>
      <Divider />
      <section className="menu-item__reviews">
          <h3 className="menu-item__reviews-title">Reviews</h3>
          {
            foodReviews.map((review) => (
              <MenuReview key={review.id} review={review} />
            ))
          }
      </section>
    </>
  )
}

export default MenuItemPage