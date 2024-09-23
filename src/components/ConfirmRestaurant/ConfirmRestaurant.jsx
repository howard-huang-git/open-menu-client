import './ConfirmRestaurant.scss'
import CTA from '../CTA/CTA'
import axios from "axios"
import { useNavigate } from 'react-router-dom';

function ConfirmRestaurant({ data, area, toggle }) {

    const apiUrl = `${import.meta.env.VITE_API_URL}`;
    const navigate = useNavigate();

    const handleConfirm = async (event) => {
        event.preventDefault()

        try {
            let response = await axios.get(apiUrl + `/google/restaurant/${data.place_id}`);
            let rawData = response.data.result;

            let restaurant = {
                name: rawData.name,
                address: rawData.formatted_address,
                area: area,
                phone: rawData.formatted_phone_number,
                url: rawData.url,
                summary: rawData.editorial_summary.overview

            }

            await axios.post(apiUrl + "/restaurants", restaurant)
            .then((response) => {
                alert("Submission Successful!");
                navigate('/'); 
            })

        } catch(error) {
            console.error(error)
        }
    }

    const handleCancel = (event) => {
        event.preventDefault()
        toggle();
    }

  return (
    <>
        <section className="confirm-restaurant">
            <h3 className="confirm-restaurant__prompt">Is this the restaurant you wish to add?</h3>
            <div className="confirm-restaurant__field">
                <p className="confirm-restaurant__label">Name:</p>
                <p className="confirm-restaurant__copy">{data.name}</p>
            </div>
            <div className="confirm-restaurant__field">
                <p className="confirm-restaurant__label">Address:</p>
                <p className="confirm-restaurant__copy">{data.formatted_address}</p>
            </div>
            <div className="confirm-restaurant__buttons">
                <CTA className="confirm-restaurant__button confirm-restaurant__button--primary" text="CONFIRM" handler={handleConfirm} type="button"/>
                <CTA className="confirm-restaurant__button" text="CANCEL" handler={handleCancel} type="button"/>
            </div>
        </section>
    </>
  )
}

export default ConfirmRestaurant