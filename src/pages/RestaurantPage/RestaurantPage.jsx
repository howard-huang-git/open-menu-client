import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import Divider from '../../components/Divider/Divider'
import './RestaurantPage.scss'
import RestaurantMenu from '../../components/RestaurantMenu/RestaurantMenu';
import Header from '../../components/Header/Header';

function RestaurantPage() {

  const { id } = useParams();
  const apiUrl = `${import.meta.env.VITE_API_URL}`;

  const [restaurantData, setRestaurantData] = useState({})
  const [restaurantMenu, setRestaurantMenu] = useState([])
  const [menuCategories, setMenuCategories] = useState([])

  const fetchRestaurant = async () => {
    try {
      let response = await axios.get(apiUrl + `/restaurants/${id}`);
      let data = {
        ...response.data,
        rating: Number(response.data.rating),
        full_address: response.data.address + ", " + response.data.area,
        price_range: `$${response.data["min(`price`)"]} - $${response.data["max(`price`)"]}`
      }
      setRestaurantData(data);
    } catch (error) {
      console.error(error)
    }
  }

  const fetchRestaurantMenu = async () => {
    try {
      let response = await axios.get(apiUrl + `/foods/restaurant/${id}`);
      let categories = []
      for (let i = 0; i < response.data.length; i++) {
        if (categories.includes(response.data[i].category) === false) {
          categories.push(response.data[i].category)
        }
      }
      setRestaurantMenu(response.data)
      setMenuCategories(categories)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchRestaurant();
    fetchRestaurantMenu();
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

  const price_range = (val) => {
    if (val.includes("null")) {
      return ""
    } else {
      return restaurantData.price_range
    }
  }

  return (
    <>
      <Header link="/search"/>
      <section className="restaurant__info">
        <div className="restaurant__details">
          <h1 className="restaurant__name">{restaurantData.name}</h1>
          <h3 className="restaurant__type">{restaurantData.type}</h3>
          <h3 className="restaurant__address">{restaurantData.full_address}</h3>
        </div>
        <div className="restaurant__data">
          <h2 className="restaurant__rating">{rating(restaurantData.rating)}</h2>
          <h2 className="restaurant__price">{price_range(restaurantData.price_range)}</h2>
        </div>
      </section>
      <Divider />
      <h2 className="restaurant__headline">Menu</h2>
      <Divider />
      <section className="restaurant__menu">
        {
          menuCategories.map((category) => (
            <>
              <h3 className="restaurant-menu__category">{category}</h3>
              {
                restaurantMenu.filter((item) => item.category === category).map((item) => (
                  <RestaurantMenu item={item} />
                ))
              }
            </>
          ))
        }
      </section>
      


      {/* <RestaurantMenu item={restaurantMenu[0]} /> */}
    </>
  )
}

export default RestaurantPage