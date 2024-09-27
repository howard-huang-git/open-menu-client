import './AddMenuItem.scss'
import Select from 'react-select'
import FormField from '../FormField/FormField'
import CTA from '../CTA/CTA'
import { useEffect, useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import errorTriangle from '../../assets/Icons/error_triangle.png'

function AddMenuItem() {

    const apiUrl = `${import.meta.env.VITE_API_URL}`;
    const navigate = useNavigate();

    const [restaurantDetails, setRestaurantDetails] = useState([])
    const [restaurantNames, setRestaurantNames] = useState([])
    const [errorMessage, setErrorMessage] = useState(0)

    const fetchRestaurantNames = async () => {
        try {
            let response = await axios.get(apiUrl + `/restaurants`);
            setRestaurantDetails(response.data)
            let data = response.data.map((restaurant) => ({
                value: restaurant.name,
                label: restaurant.name
            }))
            setRestaurantNames(data)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchRestaurantNames();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault()
        let form = event.target;
        let item = form.menuName.value
        let category = form.menuCategory.value 
        let price = form.menuPrice.value 
        let area = form.menuArea.value 
        let restaurant = form.menuRestaurant.value

        if (!item || !category || !price || !area || !restaurant) {
            setErrorMessage(1)
        } else if (isNaN(price)) {
            setErrorMessage(2)
        } else {
            try {
                const found = restaurantDetails.find((res) => res.area === area && res.name === restaurant)
                if (found) {
                    const restaurantID = found.id
                    let menu = {
                        item: item,
                        category: category,
                        price: price,
                        restaurant_id : restaurantID
                    }
                    await axios.post(apiUrl + "/foods", menu)
                    .then((response) => {
                        alert("Submission Successful!");
                        navigate(`/menu/${response.data[0].id}`); 
                    });
                } else {
                    setErrorMessage(3)
                }
            } catch(error) {
                console.error(error)
            }
        }
    }

    const areas = [
        { value: 'Markham', label: 'Markham' },
        { value: 'Scarborough', label: 'Scarborough' }
    ]

    const selectStyle = () => ({
        control: (baseStyles) => ({
          ...baseStyles,
          borderRadius: '20px',
          borderColor: '#999999',
        }),
    })

    const error = () => {
        if (errorMessage === 0) {
            return <></>
        } else if (errorMessage === 1) {
            return <p className="add-menu__error"><img src={errorTriangle} alt="error icon" /> Please provide all values in request.</p>
        } else if (errorMessage === 2) {
            return <p className="add-menu__error"><img src={errorTriangle} alt="error icon" /> Please input a valid number for price.</p>
        } else if (errorMessage === 3) {
            return <p className="add-menu__error"><img src={errorTriangle} alt="error icon" /> Restaurant cannot be found. Please check your input.</p>
        }
    }

  return (
    <>
        <form className="add-menu" onSubmit={handleSubmit}>
            <h2 className="add-menu__headline">Add A Menu Item</h2>
            <div className="add-menu__field">
                <label htmlFor="menuArea" className="add-menu__label">Area:</label>
                <Select name='menuArea' options={areas} styles={selectStyle()} />
            </div>
            <div className="add-menu__field">
                <label htmlFor="menuRestaurant" className="add-menu__label">Restaurant:</label>
                <Select name='menuRestaurant' options={restaurantNames} styles={selectStyle()} />
            </div>
            <div className="add-menu__field">
                <label htmlFor="menuName" className="add-menu__label">Name:</label>
                <FormField className="add-menu__input" type="input" placeholder="Enter name of menu item" name="menuName" />
            </div>
            <div className="add-menu__field">
                <label htmlFor="menuCategory" className="add-menu__label">Category:</label>
                <FormField className="add-menu__input" type="input" placeholder="Enter category of menu item" name="menuCategory" />
            </div>
            <div className="add-menu__field">
                <label htmlFor="menuPrice" className="add-menu__label">Price:</label>
                <FormField className="add-menu__input" type="input" placeholder="Enter price of menu item" name="menuPrice" />
            </div>
            <CTA className="add-menu__button" text="SUBMIT" type="submit"/>
            {error()}
        </form>
    </>
  )
}

export default AddMenuItem