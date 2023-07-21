import React from 'react';
import './Promo.css';
import world from '../../images/promo.png'

function Promo() {
  return(
    <section className="promo">
      <div className="promo__content">
        <div className="promo__wrapper">
          <h1 className="promo__header">Учебный проект студента факультета Веб-разработки.</h1>
          <p className="promo__text">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
          <a className="promo__button" href="#about">Узнать больше</a>
        </div>
        <img className="promo__illustration" src={world} alt=""/>
      </div>
    </section>
  );
}

export default Promo;
