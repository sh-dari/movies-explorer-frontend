import React, { useState } from 'react';
import './FilterCheckbox.css';

function FilterCheckbox() {
  const [isChecked, setIsChecked] = useState(false);
  const handleChange = () => {
    setIsChecked(!isChecked);
  }
  return(
    <div className="checkbox">
      <label className="checkbox__switch">
        <input className="checkbox__switch-input" type="checkbox" value={isChecked} onChange={handleChange} />
        <span className="checkbox__switch-slider"></span>
      </label>
      <p className="checkbox__text">Короткометражки</p>
    </div>
  );
}

export default FilterCheckbox;
