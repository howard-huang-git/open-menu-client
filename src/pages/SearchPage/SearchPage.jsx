import { useEffect, useState } from "react";
import axios from "axios";
import MenuListing from '../../components/MenuListing/MenuListing'
import RestaurantListing from '../../components/RestaurantListing/RestaurantListing'
import './SearchPage.scss'

function SearchPage() {

  const apiUrl = `${import.meta.env.VITE_API_URL}`;

  const [menuData, setMenuData] = useState([]);
  const [restaurantData, setRestaurantData] = useState([]);

  const fetchMenu = async () => {
    try {
      let response = await axios.get(apiUrl + "/foods");
      if (Array.isArray(response.data)) {
        setMenuData(response.data);
      } else {
        setError("Invalid data format");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRestaurants = async () => {
    try {
      let response = await axios.get(apiUrl + "/restaurants")
      if (Array.isArray(response.data)) {
        setRestaurantData(response.data);
      } else {
        setError("Invalid data format");
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchMenu();
    fetchRestaurants();
  }, []);

  const searchType = true;

  const searchList = (type) => {
    if (type === true) {
      return (
        <>
          {
            menuData.slice(0,20).map((item) => (
              <MenuListing key={item.id} data={item} />
            ))
          }
        </>
      )
    } else {
      return (
        <>
          {
            restaurantData.map((item) => (
              <RestaurantListing key={item.id} data={item} />
            ))
          }
        </>
      )
    }
  }

  return (
    <>
      {searchList(searchType)}
    </>
  )
}

export default SearchPage