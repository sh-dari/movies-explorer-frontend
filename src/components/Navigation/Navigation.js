import React from 'react';
import './Navigation.css';
import { NavLink } from 'react-router-dom';

function Navigation() {

  return(
    <nav className="header__movies">
      <NavLink to="/movies" className={({isActive}) => `header__link ${isActive ? "header__link_active" : ""}`}>
        Фильмы
      </NavLink>
      <NavLink to="/saved-movies" className={({isActive}) => `header__link ${isActive ? "header__link_active" : ""}`}>
        Сохранённые фильмы
      </NavLink>
    </nav>
  );
}

export default Navigation;
