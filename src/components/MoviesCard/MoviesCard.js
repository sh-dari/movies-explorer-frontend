import React, { useContext } from 'react';
import './MoviesCard.css';
import { movieApiLink } from '../../utils/constants';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function MoviesCard({ card, savedList, onCardSave, onCardDelete }) {
  const user = useContext(CurrentUserContext);
  const userId = user._id;
  const cardImage = card.image.url ? `${movieApiLink}/${card.image.url}` : card.image;
  const cardThumbnail = card.image.formats ? `${movieApiLink}/${card.image.formats.thumbnail.url}` : card.thumbnail;
  const cardId = card.id;
  card.saved = [];
  const isSaved = card.saved.includes(userId);

  const handleSaveClick = () => {
    card.saved = [...card.saved, userId];
    const newCard = {...card};
    newCard.image = cardImage;
    newCard.thumbnail = cardThumbnail;
    newCard.movieId = cardId;
    delete newCard.id;
    delete newCard.created_at;
    delete newCard.updated_at;
    delete newCard.saved;
    onCardSave(newCard);
  }

  const handleDeleteClick = () => {
    onCardDelete(card._id);
  }

  const getTimeFromMinutes = (minutes) => {
    return `${Math.trunc(minutes/60)}ч ${minutes % 60}м`;
  };

  return(
    <li className="movies-list__item">
      <div className="movies-list__wrapper">
        <a href={card.trailerLink} target="_blank"><img src={cardImage} alt={card.nameRU} className="movies-list__image"/></a>
        {savedList && <button className="movies-list__delete" type="button" onClick={handleDeleteClick} />}
        {!savedList && !isSaved && <button className="movies-list__save" type="button" onClick={handleSaveClick}>Сохранить</button>}
        {!savedList && isSaved && <div className="movies-list__saved"></div>}
      </div>
      <div className="movies-list__description">
        <h2 className="movies-list__title">{card.nameRU}</h2>
        <p className="movies-list__time">{getTimeFromMinutes(card.duration)}</p>
      </div>
    </li>
  );
}

export default MoviesCard;
