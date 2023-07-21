import { React, useState, useEffect } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

const movies = [
  {
    title: "33 слова о дизайне",
    image: "https://cdnn21.img.ria.ru/images/156302/75/1563027536_0:0:817:460_600x0_80_0_0_e4c3e477a7530ba67c91944349601ffe.jpg",
    time: "1ч 17м"
  },
  {
    title: "Киноальманах «100 лет дизайна»",
    image: "https://mcdn.tvzvezda.ru/storage/news_other_images/2020/08/20/d11845194d494045b7ad14c74e6e96e0.jpg",
    time: "1ч 17м",
    saved: true
  },
  {
    title: "В погоне за Бенкси",
    image: "https://www.tvoybro.com/uploads/affiche/event/image/580bdeb4ebf5c92c0e00009d/87d20bc8-a37a-4a9d-b659-e172c55cb14d.jpg",
    time: "1ч 17м"
  },
  {
    title: "33 слова о дизайне",
    image: "https://cdnn21.img.ria.ru/images/156302/75/1563027536_0:0:817:460_600x0_80_0_0_e4c3e477a7530ba67c91944349601ffe.jpg",
    time: "1ч 17м",
    saved: true
  },
  {
    title: "Киноальманах «100 лет дизайна»",
    image: "https://mcdn.tvzvezda.ru/storage/news_other_images/2020/08/20/d11845194d494045b7ad14c74e6e96e0.jpg",
    time: "1ч 17м"
  },
  {
    title: "В погоне за Бенкси",
    image: "https://www.tvoybro.com/uploads/affiche/event/image/580bdeb4ebf5c92c0e00009d/87d20bc8-a37a-4a9d-b659-e172c55cb14d.jpg",
    time: "1ч 17м",
    saved: true
  },
  {
    title: "33 слова о дизайне",
    image: "https://cdnn21.img.ria.ru/images/156302/75/1563027536_0:0:817:460_600x0_80_0_0_e4c3e477a7530ba67c91944349601ffe.jpg",
    time: "1ч 17м"
  },
  {
    title: "Киноальманах «100 лет дизайна»",
    image: "https://mcdn.tvzvezda.ru/storage/news_other_images/2020/08/20/d11845194d494045b7ad14c74e6e96e0.jpg",
    time: "1ч 17м"
  },
  {
    title: "В погоне за Бенкси",
    image: "https://www.tvoybro.com/uploads/affiche/event/image/580bdeb4ebf5c92c0e00009d/87d20bc8-a37a-4a9d-b659-e172c55cb14d.jpg",
    time: "1ч 17м",
    saved: true
  },
  {
    title: "33 слова о дизайне",
    image: "https://cdnn21.img.ria.ru/images/156302/75/1563027536_0:0:817:460_600x0_80_0_0_e4c3e477a7530ba67c91944349601ffe.jpg",
    time: "1ч 17м"
  },
  {
    title: "Киноальманах «100 лет дизайна»",
    image: "https://mcdn.tvzvezda.ru/storage/news_other_images/2020/08/20/d11845194d494045b7ad14c74e6e96e0.jpg",
    time: "1ч 17м"
  },
  {
    title: "В погоне за Бенкси",
    image: "https://www.tvoybro.com/uploads/affiche/event/image/580bdeb4ebf5c92c0e00009d/87d20bc8-a37a-4a9d-b659-e172c55cb14d.jpg",
    time: "1ч 17м"
  }
]

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
