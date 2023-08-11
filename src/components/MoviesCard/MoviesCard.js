import React from 'react';
import './MoviesCard.css';
import { movieApiLink, getTimeFromMinutes } from '../../utils/constants';

function MoviesCard({ card, savedList, onCardSave, onCardDelete }) {
  const cardImage = card.image.url ? `${movieApiLink}/${card.image.url}` : card.image;
  const cardThumbnail = card.image.formats ? `${movieApiLink}/${card.image.formats.thumbnail.url}` : card.thumbnail;

  const handleSaveClick = () => {
    const newCard = {...card};
    newCard.image = cardImage;
    newCard.thumbnail = cardThumbnail;
    newCard.movieId = card.id;
    delete newCard.id;
    delete newCard.created_at;
    delete newCard.updated_at;
    delete newCard.saved;
    onCardSave(newCard);
    card.saved = true;
  }

  const handleDeleteClick = () => {
    onCardDelete(card._id);
    card.saved = false;
  }

  const handleDeleteClickSaved = () => {
    const deleteMovie = JSON.parse(localStorage.getItem("all-saved")).find(el => el.movieId === card.id);
    onCardDelete(deleteMovie._id);
    card.saved = false;
  }

  return(
    <li className="movies-list__item">
      <div className="movies-list__wrapper">
        <a href={card.trailerLink} target="_blank"><img src={cardImage} alt={card.nameRU} className="movies-list__image"/></a>
        {savedList && <button className="movies-list__delete" type="button" onClick={handleDeleteClick} />}
        {!savedList && !card.saved && <button className="movies-list__save" type="button" onClick={handleSaveClick}>Сохранить</button>}
        {!savedList && card.saved && <button className="movies-list__saved" type="button" onClick={handleDeleteClickSaved}></button>}
      </div>
      <div className="movies-list__description">
        <h2 className="movies-list__title">{card.nameRU}</h2>
        <p className="movies-list__time">{getTimeFromMinutes(card.duration)}</p>
      </div>
    </li>
  );
}

export default MoviesCard;
