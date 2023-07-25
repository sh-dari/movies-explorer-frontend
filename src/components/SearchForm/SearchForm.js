import React from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {
  const [searchTerm, setSearchTerm] = React.useState("");
  // const [searchResults, setSearchResults] = React.useState([]);
  const handleChange = event => {
    setSearchTerm(event.target.value);
  };
  React.useEffect(() => {
    // const results = movies.filter(movie =>
    //   movie.toLowerCase().includes(searchTerm)
    // );
    // setSearchResults(results);
  }, [searchTerm]);

  return(
    <section>
      <form className="search-form">
        <div className="search-form__wrapper">
          <input
            className="search-form__input"
            type="text"
            placeholder="Фильм"
            value={searchTerm}
            onChange={handleChange}
            required
          />
        </div>
        <FilterCheckbox />
      </form>
    </section>
  );
}

export default SearchForm;
