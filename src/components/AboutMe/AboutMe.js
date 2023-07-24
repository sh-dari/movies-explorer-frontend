import React from 'react';
import './AboutMe.css';
import SectionHeader from '../SectionHeader/SectionHeader';
import avatar from '../../images/avatar.png'

function AboutMe() {
  return(
    <section className="student">
      <SectionHeader text="Студент"/>
      <div className="student__wrapper">
        <div className="student__text">
          <h3 className="student__name">Дарья</h3>
          <p className="student__profession">Фронтенд-разработчик, 22 года</p>
          <p className="student__info">
            Я&nbsp;родилась и&nbsp;живу в&nbsp;Ярославле, закончила факультет ИВТ ЯрГУ.
            У&nbsp;меня есть кот Сэм. Люблю читать и&nbsp;смотреть видео Куплинова на&nbsp;YouTube.
            Программированием заинтересовалась ещё в&nbsp;школе, сейчас активно изучаю фронтенд.
          </p>
          <a className="student__git" href="https://github.com/sh-dari" target="_blank" rel="noreferrer">Github</a>
        </div>
        <img className="student__img" src={avatar} alt="Студент"/>
      </div>
    </section>
  );
}

export default AboutMe;
