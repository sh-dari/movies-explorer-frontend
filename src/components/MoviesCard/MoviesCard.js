import React from 'react';
import './MoviesCard.css';

function MoviesCard({ card, savedList }) {

  return(
    <li className="movies-list__item">
      <div className="movies-list__wrapper">
        <img src={card.image} alt={card.title} className="movies-list__image"/>
        {savedList && <button className="movies-list__delete" type="button"/>}
        {!savedList && !card.saved && <button className="movies-list__save" type="button">Сохранить</button>}
        {!savedList && card.saved && <div className="movies-list__saved"></div>}
      </div>
      <div className="movies-list__description">
        <h2 className="movies-list__title">{card.title}</h2>
        <p className="movies-list__time">{card.time}</p>
      </div>
    </li>
  );
}

export default MoviesCard;
