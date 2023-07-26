import React from 'react';
import './Menu.css';
import { Link, NavLink } from 'react-router-dom';

function Menu({ isOpen, handleCloseClick }) {
  const isOpened = isOpen ? "menu_opened" : "";

  return(
    <div className={`menu ${isOpened}`}>
      <div className="menu__overlay"></div>
      <button type="button" className="menu__close" onClick={handleCloseClick}></button>
      <nav className="menu__navigation">
        <div className="menu__wrapper">
          <NavLink to="/" className={({isActive}) => `menu__link ${isActive ? "menu__link_active" : ""}`}>
            Главная
          </NavLink>
          <NavLink to="/movies" className={({isActive}) => `menu__link ${isActive ? "menu__link_active" : ""}`}>
            Фильмы
          </NavLink>
          <NavLink to="/saved-movies" className={({isActive}) => `menu__link ${isActive ? "menu__link_active" : ""}`}>
            Сохранённые фильмы
          </NavLink>
        </div>
        <Link to="/profile">
          <div className="menu__account-logo"></div>
        </Link>
      </nav>
    </div>
  );
}

export default Menu;
