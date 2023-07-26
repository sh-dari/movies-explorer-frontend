import React from 'react';
import './PortfolioLink.css';

function PortfolioLink({ text, link }) {
  return(
    <li className="portfolio__item">
      <a href={link} className="portfolio__link" target="_blank" rel="noreferrer">
        <p className="portfolio__text">{text}</p>
        <div className="portfolio__arrow"></div>
      </a>
    </li>
  );
}

export default PortfolioLink;
