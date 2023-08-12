import { React, useState, useEffect } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useResize } from '../../hooks/useResize';
import Preloader from '../Preloader/Preloader';
import {
  COUNT_SCREEN_LG,
  COUNT_SCREEN_MD,
  COUNT_SCREEN_SM,
  COLUMNS_SCREEN_LG,
  COLUMNS_SCREEN_MD
} from '../../utils/constants';

function MoviesCardList({
  savedList,
  movies,
  isLoading,
  notFoundMessage,
  handleMovieSave,
  handleMovieDelete
}) {
  const {isScreenSm, isScreenMd} = useResize();
  const [cardItems, setCardItems] = useState(0);
  const [noneButton, setNoneButton] = useState("");

  useEffect(() => {
    if (savedList) {
      setCardItems(movies && movies.length);
    } else {
      if (isScreenMd) {
        setCardItems(COUNT_SCREEN_LG);
      } else if (isScreenSm) {
        setCardItems(COUNT_SCREEN_MD);
      } else {
        setCardItems(COUNT_SCREEN_SM);
      }
    }
  }, [movies]);

  useEffect(() => {
    if (isScreenMd) {
      setCardItems(Math.ceil(cardItems / COLUMNS_SCREEN_LG) * COLUMNS_SCREEN_LG);
    } else if (isScreenSm) {
      setCardItems(Math.ceil(cardItems / COLUMNS_SCREEN_MD) * COLUMNS_SCREEN_MD);
    }
  }, [isScreenSm, isScreenMd]);

  useEffect(() => {
    setNoneButton("");
    if (movies && cardItems >= movies.length || !movies) {
      setNoneButton("movies-list__button_none");
    }
  }, [cardItems, movies]);

  const showMore = () => {
    if (isScreenMd) {
      setCardItems(cardItems + COLUMNS_SCREEN_LG);
    } else {
      setCardItems(cardItems + COLUMNS_SCREEN_MD);
    }
  };

  return(
    <section className="movies-list">
      { isLoading ? <Preloader /> :
        movies && !movies.length ? <p className="movies-list__not-found">{notFoundMessage}</p> :
        <ul className="movies-list__list">
          {movies && movies.slice(0, cardItems).map((card) => (
            <MoviesCard
              card={card}
              key={card.id ? card.id : card._id}
              savedList={savedList}
              onCardSave={handleMovieSave}
              onCardDelete={handleMovieDelete}
            />
          ))}
        </ul>
      }
      {!savedList && !isLoading && <button className={`movies-list__button ${noneButton}`} type="button" onClick={showMore}>Ещё</button>}
    </section>
  );
}

export default MoviesCardList;
