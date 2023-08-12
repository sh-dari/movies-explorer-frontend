import React from 'react';
import { useLocation } from 'react-router-dom';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm({
  handleSubmitSearch,
  searchTerm,
  isChecked,
  setIsChecked,
  handleChange,
  handleChangeInput,
  setErrorPopupOpened,
  setErrorMessage
}) {

  const location = useLocation();

  const handleSubmit = evt => {
    evt.preventDefault();
    if (!searchTerm && location.pathname === "/movies") {
      setErrorPopupOpened(true);
      setErrorMessage("Нужно ввести ключевое слово");
    }
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
            value={searchTerm || ""}
            onChange={handleChangeInput}
            required
          />
          <button type="submit" className="search-form__button-submit" onClick={handleSubmit}/>
        </div>
        <FilterCheckbox handleSubmit={handleSubmitSearch} isChecked={isChecked} setIsChecked={setIsChecked} handleChange={handleChange} />
      </form>
    </section>
  );
}

export default SearchForm;
