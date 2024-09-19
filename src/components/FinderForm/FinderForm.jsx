import CTA from '../CTA/CTA'
import FormField from '../FormField/FormField'
import './FinderForm.scss'

function FinderForm() {
  return (
    <>
        <form className="finder-form">
            <h2 className="finder-form__headline">Find Your Meal</h2>
            <div className="finder-form__field">
                <label className="finder-form__label" htmlFor="finderArea">Area:</label>
                <FormField className="finder-form__area" type="input" placeholder="Enter area" name="finderArea" />
            </div>
            <div className="finder-form__field">
                <label className="finder-form__label" htmlFor="finderRestaurant">Restaurant:</label>
                <FormField className="finder-form__restaurant" type="input" placeholder="Enter name of restaurant" name="finderRestaurant" />
            </div>
            <div className="finder-form__field">
                <label className="finder-form__label" htmlFor="finderFood">Menu Item:</label>
                <FormField className="finder-form__item" type="input" placeholder="Enter name of menu item" name="finderFood" />
            </div>
            <CTA className="finder-form__button" text="SEARCH"/>
        </form>
    </>
  )
}

export default FinderForm