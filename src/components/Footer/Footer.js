import React from 'react';
import './Footer.css';

function Footer() {
  return(
    <footer className="footer">
      <p className="footer__text">Учебный проект Яндекс.Практикум &#1093; BeatFilm.</p>
      <div className="footer__info">
        <p className="footer__copyright">&copy; {new Date().getFullYear()}</p>
        <ul className="footer__links">
          <li className="footer__item">
            <a className="footer__link" href="https://practicum.yandex.ru/" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
          </li>
          <li className="footer__item">
            <a className="footer__link" href="https://github.com/sh-dari" target="_blank" rel="noreferrer">Github</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
