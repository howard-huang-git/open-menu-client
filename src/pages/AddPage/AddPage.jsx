import { useState } from 'react'
import AddRestaurant from '../../components/AddRestaurant/AddRestaurant'
import Header from '../../components/Header/Header'
import './AddPage.scss'
import AddMenuItem from '../../components/AddMenuItem/AddMenuItem'

function AddPage() {

    const [addType, setAddType] = useState(true)

    const addMain = (type) => {
        if (type === true) {
            return <AddRestaurant />
        } else {
            return <AddMenuItem />
        }
    }

    const toggleRestaurant = () => {
        if (addType === false) {
          setAddType(true)
        }
    }

    const toggleMenu = () => {
        if (addType === true) {
            setAddType(false)
        }
    }

    const classMenuSearch = () => {
        if (addType === false) {
          return "search-banner--active"
        } else {
          return "search-banner--inactive"
        }
    }

    const classRestaurantSearch = () => {
        if (addType === true) {
          return "search-banner--active"
        } else {
          return "search-banner--inactive"
        }
    }


  return (
    <>
        <Header />
        <div className="add-banner">
          <div className="add-banner__container">
            <div className={`add-banner__restaurant ` + classMenuSearch()} onClick={toggleMenu}>Menu Item</div>
            <div className={`add-banner__food ` + classRestaurantSearch()} onClick={toggleRestaurant}>Restaurant</div>
          </div>
        </div>
        {addMain(addType)}
    </>
  )
}

export default AddPage