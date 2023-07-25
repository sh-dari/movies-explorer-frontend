import React from 'react'
import { useNavigate } from 'react-router-dom';
import './NoMatch.css'

const NoMatch = () => {
  const navigate = useNavigate();

  return (
    <main className="no-match">
      <h1 className="no-match__code">404</h1>
      <p className="no-match__text">Страница не найдена</p>
      <button className="no-match__button" type="button" onClick={() => navigate(-1)}>Назад</button>
    </main>
  )
};

export default NoMatch;
