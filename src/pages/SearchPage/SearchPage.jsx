import { useEffect, useState } from "react";
import axios from "axios";
import MenuListing from '../../components/MenuListing/MenuListing'
import RestaurantListing from '../../components/RestaurantListing/RestaurantListing'
import './SearchPage.scss'
import SearchBox from "../../components/SearchBox/SearchBox";
import Divider from "../../components/Divider/Divider"

function SearchPage() {

  const apiUrl = `${import.meta.env.VITE_API_URL}`;

  const [menuData, setMenuData] = useState([]);
  const [restaurantData, setRestaurantData] = useState([]);
  const [searchFilter, setSearchFilter] = useState({search: "", area: "", sort: ""});

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

  const sortFunction = (sort) => {
    if (sort === "price-sort") {
      return function(a, b){return a.price - b.price}
    } else if (sort === "rating-sort") {
      return function(a, b){return b.avg_rating - a.avg_rating}
    } else {
      return function(a, b){return b - a}
    }
  }

  const areaFunction = (area) => {
    return (item) => item.area === area
  }

  const searchFunction = (search) => {
    if (search.trim() === "") {
      return (item) => item
    } else {
      return (item) => item.item.toUpperCase().includes(search.trim().toUpperCase()) || item.category.toUpperCase().includes(search.trim().toUpperCase())
    }
  }

  const searchType = true;

  const searchList = (type) => {
    if (type === true) {
      return (
        <>
          {
            menuData.filter(searchFunction(searchFilter.search)).filter(areaFunction(searchFilter.area)).sort(sortFunction(searchFilter.sort)).map((item) => (
              <div key={item.id} className="search-page__listing">
                <MenuListing key={item.id} data={item} /> 
                <Divider />
              </div>
              
            ))
          }
        </>
      )
    } else {
      return (
        <>
          {
            restaurantData.map((item) => (
              <div key={item.id} className="search-page__listing">
                <RestaurantListing key={item.id} data={item} />
                <Divider />
              </div>
              
            ))
          }
        </>
      )
    }
  }

  return (
    <>
      <SearchBox change={setSearchFilter} />
      <Divider />
      {searchList(searchType)}
    </>
  )
}

export default SearchPage