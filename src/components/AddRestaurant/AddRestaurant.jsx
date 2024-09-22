import React, { useState } from 'react'
import './AddRestaurant.scss'
import FormField from '../FormField/FormField'
import CTA from '../CTA/CTA'
import axios from "axios"
import Divider from '../Divider/Divider'
import ConfirmRestaurant from '../ConfirmRestaurant/ConfirmRestaurant'
import Select from 'react-select'

function AddRestaurant() {

    const apiUrl = `${import.meta.env.VITE_API_URL}`;

    const [searchData, setSearchData] = useState({})
    const [searchToggle, setSearchToggle] = useState(false)
    const [searchArea, setSearchArea] = useState("")

    const handleSubmit = async (event) => {
        event.preventDefault()
        let form = event.target;
        let name = form.restaurantName.value 
        let address = form.restaurantAddress.value
        let area = form.restaurantArea.value
        let input = name + " " + address

        try {
            let response = await axios.get(apiUrl + `/google/${input}`);
            setSearchToggle(true)
            setSearchArea(area)
            setSearchData(response.data.candidates[0])
        } catch(error) {
            console.error(error)
        }

    }

    const confirmation = () => {
        if (searchToggle === true) {
            return (
                <>
                    <Divider />
                    <ConfirmRestaurant data={searchData} area={searchArea} toggle={setSearchToggle} />
                </>
            )
        } else {
            return <></>
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

  return (
    <>
        <form className="add-restaurant" onSubmit={handleSubmit}>
            <h2 className="add-restaurant__headline">Add A Restaurant</h2>
            <div className="add-restaurant__field">
                <label htmlFor="restaurantName" className="add-restaurant__label">Name:</label>
                <FormField className="add-restaurant__input" type="input" placeholder="Enter name of restaurant" name="restaurantName" />
            </div>
            <div className="add-restaurant__field">
                <label htmlFor="restaurantAddress" className="add-restaurant__label">Address:</label>
                <FormField className="add-restaurant__input" type="input" placeholder="Enter address" name="restaurantAddress" />
            </div>
            <div className="add-restaurant__field">
                <label htmlFor="restaurantArea" className="add-restaurant__label">Area:</label>
                <Select name='restaurantArea' options={areas} styles={selectStyle()} />
            </div>
            <CTA className="add-restaurant__button" text="SUBMIT" type="submit"/>
        </form>
        {confirmation()}
    </>
  )
}

export default AddRestaurant