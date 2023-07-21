import React from 'react';
import './SearchForm.css';

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
    <div className="search-form">
      <div className="search-form__wrapper">
        <input
          className="search-form__input"
          type="text"
          placeholder="Фильм"
          value={searchTerm}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default SearchForm;
