import React from 'react';
import { useLocation } from 'react-router-dom';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm({
  handleSubmitSearch,
  searchTerm,
  setSearchTerm,
  isChecked,
  setIsChecked
}) {

  const location = useLocation();
  
  const handleChange = evt => {
    setSearchTerm(evt.target.value);
  };

  const handleChangeSaved = evt => {
    setSearchTerm(evt.target.value);
    handleSubmitSearch(searchTerm, isChecked);
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    handleSubmitSearch(searchTerm, isChecked);
  }

  return(
    <section>
      <form className="search-form" onSubmit={handleSubmit} noValidate>
        <div className="search-form__wrapper">
          <button type="submit" className="search-form__button" onClick={handleSubmit}/>
          <input
            className="search-form__input"
            type="text"
            placeholder="Фильм"
            value={searchTerm}
            onChange={location.pathname === "/saved-movies" ? handleChangeSaved : handleChange}
            required
          />
          <button type="submit" className="search-form__button-submit" onClick={handleSubmit}/>
        </div>
        <FilterCheckbox handleSubmit={handleSubmitSearch} isChecked={isChecked} setIsChecked={setIsChecked}/>
      </form>
    </section>
  );
}

export default SearchForm;
