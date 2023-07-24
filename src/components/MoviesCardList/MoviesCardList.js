import { React, useState, useEffect, Suspense  } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import { movies } from '../../utils/constants';
// const MoviesCard = lazy(() => import('../MoviesCard/MoviesCard'));

function MoviesCardList({ savedList }) {
  const [cards, setCards] = useState(movies);
  useEffect(() => {
    if (savedList) {
      setCards(cards => cards.filter(el => el.saved))
    }
  }, [savedList]);

  return(
    <Suspense fallback={<Preloader/>}>
      <section className="movies-list">
        <ul className="movies-list__list">
          {cards.map((card, index) => (
            <MoviesCard card={card} key={index} savedList={savedList}/>
          ))}
        </ul>
        {!savedList && <button className="movies-list__button" type="button">Ещё</button>}
      </section>
    </Suspense>
  );
}

export default MoviesCardList;
