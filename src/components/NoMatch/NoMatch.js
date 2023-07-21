import React from 'react'
import { useNavigate } from 'react-router-dom';
import './NoMatch.css'

const NoMatch = () => {
  const navigate = useNavigate();

  return (
    <section className="no-match">
      <h2 className="no-match__code">404</h2>
      <p className="no-match__text">Страница не найдена</p>
      <button className="no-match__button" type="button" onClick={() => navigate(-1)}>Назад</button>
    </section>
  )
};

export default NoMatch;
