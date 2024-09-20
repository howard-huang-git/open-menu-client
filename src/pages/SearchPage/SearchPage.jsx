import { useEffect, useState } from "react";
import axios from "axios";
import MenuListing from '../../components/MenuListing/MenuListing'
import RestaurantListing from '../../components/RestaurantListing/RestaurantListing'
import './SearchPage.scss'
import SearchBox from "../../components/SearchBox/SearchBox";
import Divider from "../../components/Divider/Divider"
import Header from "../../components/Header/Header";

function SearchPage() {

  const apiUrl = `${import.meta.env.VITE_API_URL}`;

  const [menuData, setMenuData] = useState([]);
  const [restaurantData, setRestaurantData] = useState([]);
  const [searchFilter, setSearchFilter] = useState({search: "", area: "", sort: ""});
  const [searchType, setSearchType] = useState(true);

  // API Calls
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

  // Search Parameter Functions
  const sortFunction = (sort) => {
    if (searchType === true) {
      if (sort === "price-sort") {
        return function(a, b){return a.price - b.price}
      } else if (sort === "rating-sort") {
        return function(a, b){return b.avg_rating - a.avg_rating}
      } else {
        return function(a, b){return b - a}
      }
    } else if (searchType === false) {
      if (sort === "price-sort") {
        return function(a, b){return (a.max + a.min)/2 - (b.max + b.min)/2}
      } else if (sort === "rating-sort") {
        return function(a, b){return b.rating - a.rating}
      } else {
        return function(a, b){return b - a}
      }
    }
    
  }

  const areaFunction = (area) => {
    return (item) => item.area === area
  }

  const searchFunction = (search) => {
    if (search.trim() === "") {
      return (item) => item
    } else {
      let searchTerm = search.trim().toUpperCase()
      if (searchType === true) {
        return (item) => item.item.toUpperCase().includes(searchTerm) || item.category.toUpperCase().includes(searchTerm) 
      } else if (searchType === false) {
        return (item) => item.name.toUpperCase().includes(searchTerm) || item.type.toUpperCase().includes(searchTerm)
      }
      
    }
  }

  const toggleMenuSearch = () => {
    if (searchType === false) {
      setSearchType(true)
    }
  }

  const toggleRestaurantSearch = () => {
    if (searchType === true) {
      setSearchType(false)
    }
  }

  const classMenuSearch = () => {
    if (searchType === true) {
      return "search-banner--active"
    } else {
      return "search-banner--inactive"
    }
  }

  const classRestaurantSearch = () => {
    if (searchType === false) {
      return "search-banner--active"
    } else {
      return "search-banner--inactive"
    }
  }

  // Components
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
            restaurantData.filter(searchFunction(searchFilter.search)).filter(areaFunction(searchFilter.area)).sort(sortFunction(searchFilter.sort)).map((item) => (
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
      <Header link="/" />
      <div className="search-banner">
        <div className={`search-banner__food ` + classMenuSearch()} onClick={toggleMenuSearch}>Menu Item</div>
        <div className={`search-banner__restaurant ` + classRestaurantSearch()} onClick={toggleRestaurantSearch}>Restaurant</div>
      </div>
      <SearchBox change={setSearchFilter} />
      <Divider />
      {searchList(searchType)}
    </>
  )
}

export default SearchPage