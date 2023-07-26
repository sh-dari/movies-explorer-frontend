import React from 'react';
import './Portfolio.css';
import PortfolioLink from '../PortfolioLink/PortfolioLink';

function Portfolio() {
  return(
    <section className="portfolio">
      <h2 className="portfolio__header">Портфолио</h2>
      <ul className="portfolio__list">
        <PortfolioLink text="Статичный сайт" link="https://github.com/sh-dari/how-to-learn" />
        <PortfolioLink text="Адаптивный сайт" link="https://github.com/sh-dari/russian-travel" />
        <PortfolioLink text="Одностраничное приложение" link="https://github.com/sh-dari/react-mesto-api-full-gha" />
      </ul>
    </section>
  );
}

export default Portfolio;
