import CTA from '../CTA/CTA'
import './FinderForm.scss'
import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import axios from "axios";
import { useNavigate } from 'react-router-dom'

function FinderForm() {

    const apiUrl = `${import.meta.env.VITE_API_URL}`;
    const navigate = useNavigate();

    const [menuDetails, setMenuDetails] = useState([])
    const [restaurantNames, setRestaurantNames] = useState([])
    const [menuNames, setMenuNames] = useState([])
    const [formErrors, setFormErrors] = useState({area: false, restaurant: false, menu: false})
    const [errorResponse, setErrorResponse] = useState([])

    const fetchMenuNames = async () => {
        try {
            let response = await axios.get(apiUrl + `/foods`);
            setMenuDetails(response.data)
            let data = response.data.map((menu) => ({
                value: menu.item,
                label: menu.item
            }))
            setMenuNames(data)
        } catch (error) {
            console.error(error);
        }
    }

    const fetchRestaurantNames = async () => {
        try {
            let response = await axios.get(apiUrl + `/restaurants`);
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
        fetchMenuNames();
        fetchRestaurantNames();
    }, []);

    const areas = [
        { value: 'Markham', label: 'Markham' },
        { value: 'Scarborough', label: 'Scarborough' }
      ]

    const selectStyle = (type) => ({
        control: (baseStyles) => ({
          ...baseStyles,
          borderRadius: '20px',
          borderColor: formErrors[type] ? 'red' : '#999999',
        }),
    })

    const errorMessage = () => {
        if (errorResponse.length === 0) {
            return ""
        } else {
            return (
                <>
                    <div className="finder-form__error">
                        <p className="finder-form__mistake">Errors: </p>
                        {
                            errorResponse.map((error) => (
                                <p key={error} className="finder-form__mistake">{error}</p>
                            ))
                        }
                    </div>
                </>
            )
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrorResponse([])
        setFormErrors({area: false, restaurant: false, menu: false})

        let form = event.target;
        let area = form.finderArea;
        let restaurant = form.finderRestaurant;
        let food = form.finderFood;

        let errors = {area: false, restaurant: false, menu: false}
        let responses = []

        if (!area.value || !restaurant.value || !food.value ) {
            if (!area.value) {
                errors = {...errors, area: true}
                responses.push("Area field is empty")
            } 
            if (!restaurant.value) {
                errors = {...errors, restaurant: true}
                responses.push("Restaurant field is empty")
            } 
            if (!food.value) {
                errors = {...errors, menu: true}
                responses.push("Menu Item field is empty")
            } 
            setFormErrors(errors)
            setErrorResponse(responses)
        } else if (!menuDetails.find((menu) => menu.item === food.value || menu.area === area.value || menu.name === restaurant.value)) {
            if (!menuDetails.find((menu) => menu.item === food.value)) {
                errors = {...errors, area: true}
                responses.push("Area cannot be found")
            }
            if (!menuDetails.find((menu) => menu.name === restaurant.value)) {
                errors = {...errors, restaurant: true}
                responses.push("Restaurant cannot be found")
            }
            if (!menuDetails.find((menu) => menu.area === area.value)) {
                errors = {...errors, menu: true}
                responses.push("Menu Item cannot be found")
            }
            setFormErrors(errors)
            setErrorResponse(responses)
        } else if (!menuDetails.find((menu) => menu.area === area.value && menu.name === restaurant.value)) {
            responses.push("Restaurant cannot be found in Area")
            setFormErrors(errors)
            setErrorResponse(responses)
        } else if (!menuDetails.find((menu) => menu.item === food.value && menu.name === restaurant.value)) {
            responses.push("Restaurant does not have this menu item")
            setFormErrors(errors)
            setErrorResponse(responses)
        } else {
            const found = menuDetails.find((menu) => menu.item === food.value && menu.area === area.value && menu.name === restaurant.value)
            if (found) {
                const menuID = found.id
                navigate(`/rating/${menuID}`)
            }
        }
    }

  return (
    <>
        <form className="finder-form" onSubmit={handleSubmit}>
            <h2 className="finder-form__headline">Find Your Meal</h2>
            <div className="finder-form__field">
                <label className="finder-form__label" htmlFor="finderArea">Area:</label>
                <Select name='finderArea' options={areas} styles={selectStyle("area")} />
            </div>
            <div className="finder-form__field">
                <label className="finder-form__label" htmlFor="finderRestaurant">Restaurant:</label>
                <Select name='finderRestaurant' options={restaurantNames} styles={selectStyle("restaurant")} />
            </div>
            <div className="finder-form__field">
                <label className="finder-form__label" htmlFor="finderFood">Menu Item:</label>
                <Select name='finderFood' options={menuNames} styles={selectStyle("menu")} />
            </div>
            <CTA className="finder-form__button" text="SEARCH"/>
        </form>
        {errorMessage()}
    </>
  )
}

export default FinderForm