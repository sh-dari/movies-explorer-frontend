import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import Navigation from '../Navigation/Navigation';
import Menu from '../Menu/Menu';

function Header({ color, movies }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleBurgerClick = () => {
    setIsMenuOpen(true);
  };
  const handleCloseClick = () => {
    setIsMenuOpen(false);
  }

  return(
    <header className={`header header_color_${color}`}>
      <div className="header__wrapper">
        <div className="header__wrapper-movies">
          <Link to="/">
            <div className="header__logo"></div>
          </Link>
          {movies && <Navigation />}
        </div>
        {movies ?
         <Link to="/profile">
           <div className="header__account-logo"></div>
         </Link> :
        <ul className="header__buttons">
          <li><Link to="/signup" className="header__button">Регистрация</Link></li>
          <li><Link to="/signin" className="header__button header__button_type_black">Войти</Link></li>
        </ul>}
        {!color && <button type="button" className="header__burger" onClick={handleBurgerClick}></button>}
        <Menu isOpen={isMenuOpen} handleCloseClick={handleCloseClick} />
      </div>
    </header>
  );
}

export default Header;
