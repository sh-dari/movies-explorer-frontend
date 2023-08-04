import React, { useEffect } from 'react';
import './FilterCheckbox.css';

function FilterCheckbox({ handleSubmit, isChecked, setIsChecked }) {

  useEffect(() => {
    if (localStorage.getItem("checkbox")) {
      setIsChecked(JSON.parse(localStorage.getItem("checkbox")));
    }
  }, []);

  const handleChange = () => {
    handleSubmit(localStorage.getItem("request") || "", !isChecked);
    setIsChecked(!isChecked);
  }

  return(
    <div className="checkbox">
      <label className="checkbox__switch">
        <input className="checkbox__switch-input" type="checkbox" onChange={handleChange} checked={isChecked}/>
        <span className="checkbox__switch-slider"></span>
      </label>
      <p className="checkbox__text">Короткометражки</p>
    </div>
  );
}

export default FilterCheckbox;
