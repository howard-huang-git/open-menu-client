import CTA from '../CTA/CTA'
import FormField from '../FormField/FormField'
import './SearchBox.scss'

function SearchBox({ change }) {

    const handleSubmit = (event) => {
        event.preventDefault();
        let form = event.target;
        let search = form.searchBar;
        let area = form.areaSelect;
        let sort = form.sortSelect;

        change({search: search.value, area: area.value, sort: sort.value})
    }

  return (
    <>
        <section className="search-box">
            <form className="search-box__form" onSubmit={handleSubmit}>
                <FormField className="form-field--search search-box__bar" type="input" placeholder="Search..." name="searchBar" />
                <div className="search-box__dropdowns">
                    <select name="areaSelect" id="areaSelect" className="search-box__select">
                        <option value="">Select Area</option>
                        <option value="Markham">Markham</option>
                        <option value="Scarborough">Scarborough</option>
                    </select>
                    <select name="sortSelect" id="sortSelect" className="search-box__select">
                        <option value="">Sort by</option>
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