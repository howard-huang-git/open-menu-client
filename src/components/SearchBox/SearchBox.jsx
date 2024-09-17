import CTA from '../CTA/CTA'
import FormField from '../FormField/FormField'
import './SearchBox.scss'

function SearchBox() {
  return (
    <>
        <section className="search-box">
            <form className="search-box__form">
                <FormField className="form-field--search search-box__bar" type="input" placeholder="Search..." name="search-bar" />
                <div className="search-box__dropdowns">
                    <select name="area-select" id="area-select" className="search-box__select">
                        <option value="">Select Area</option>
                        <option value="Markham">Markham</option>
                        <option value="Scarborough">Scarborough</option>
                    </select>
                    <select name="sort-select" id="sort-select" className="search-box__select">
                        <option value="">Select Sort Method</option>
                        <option value="rating-sort">Sort by Rating</option>
                        <option value="price-sort">Sort by Price</option>
                    </select>
                </div>
                <CTA className="search-box__button" text="Search" />
            </form>
        </section>
    </>
  )
}

export default SearchBox