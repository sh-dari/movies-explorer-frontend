import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox({ isChecked, handleChange }) {

  return(
    <div className="checkbox">
      <label className="checkbox__switch">
        <input className="checkbox__switch-input" type="checkbox" onChange={handleChange} checked={isChecked || false}/>
        <span className="checkbox__switch-slider"></span>
      </label>
      <p className="checkbox__text">Короткометражки</p>
    </div>
  );
}

export default FilterCheckbox;
