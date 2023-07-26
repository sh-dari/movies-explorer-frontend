import { React, useState, useEffect } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { movies } from '../../utils/constants';

function MoviesCardList({ savedList }) {
  const [cards, setCards] = useState(movies);
  useEffect(() => {
    if (savedList) {
      setCards(cards => cards.filter(el => el.saved))
    }
  }, [savedList]);

  return(
    <section className="movies-list">
      <ul className="movies-list__list">
        {cards.map((card, index) => (
          <MoviesCard card={card} key={index} savedList={savedList}/>
        ))}
      </ul>
      {!savedList && <button className="movies-list__button" type="button">Ещё</button>}
    </section>
  );
}

export default MoviesCardList;
