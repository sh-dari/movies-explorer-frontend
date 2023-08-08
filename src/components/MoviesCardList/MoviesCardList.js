import { React, useState, useEffect } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useResize } from '../../hooks/useResize';
import Preloader from '../Preloader/Preloader';

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
        setCardItems(12);
      } else if (isScreenSm) {
        setCardItems(8);
      } else {
        setCardItems(5);
      }
    }
  }, [movies]);

  useEffect(() => {
    if (isScreenMd) {
      setCardItems(Math.ceil(cardItems / 3) * 3);
    } else if (isScreenSm) {
      setCardItems(Math.ceil(cardItems / 2) * 2);
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
      setCardItems(cardItems + 3);
    } else {
      setCardItems(cardItems + 2);
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
