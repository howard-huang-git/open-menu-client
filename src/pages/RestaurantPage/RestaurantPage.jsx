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
        // full_address: response.data.address + ", " + response.data.area,
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
    try {
      if (val.includes("null")) {
        return "N/A"
      } else {
        return restaurantData.price_range
      }
    } catch {}
  }

  const summary = (string) => {
    if (string === "" || string === null) {
      return <></>
    } else {
      return <p className="restaurant__summary">{restaurantData.summary}</p>
    }
  }

  const menuList = (data) => {
    try {
      if (data.length === 0) {
        return <></>
      } else {
        return (<>
          <h2 className="restaurant__headline">Menu</h2>
      <Divider />
      <section className="restaurant__menu">
      {
       (menuCategories.map((category) => (
          <>
            <h3 className="restaurant-menu__category">{category}</h3>
            {
              restaurantMenu.filter((item) => item.category === category).map((item) => (
                <RestaurantMenu item={item} />
              ))
            }
          </>
        )))
      }
      </section>
        </>)
      }
    } catch {}
  }

  return (
    <>
      <Header link="/search"/>
      <section className="restaurant__info">
        <h1 className="restaurant__name">{restaurantData.name}</h1>
        <h2 className="restaurant__rating">{rating(restaurantData.rating)}</h2>
        {summary(restaurantData.summary)}
        <div className="restaurant__details">
          <p className="restaurant__label">Address:</p>
          <h3 className="restaurant__address">{restaurantData.address}</h3>
          <p className="restaurant__label">Phone:</p>
          <h3 className="restaurant__address">{restaurantData.phone}</h3>
          <p className="restaurant__label">Price Range:</p>
          <h2 className="restaurant__price">{price_range(restaurantData.price_range)}</h2>
        </div>
        <a href={restaurantData.url} className="restaurant__link">
          <p className="restaurant__maps">Google Maps</p>
        </a>
      </section>
      <Divider />
      {menuList(restaurantMenu)}
    </>
  )
}

export default RestaurantPage