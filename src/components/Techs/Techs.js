import React from 'react';
import './Techs.css';
import SectionHeader from '../SectionHeader/SectionHeader';

function Techs() {
  return(
    <section className="techs">
      <div className="techs__content">
        <SectionHeader text="Технологии"/>
        <h3 className="techs__header">7 технологий</h3>
        <p className="techs__info">На&nbsp;курсе веб-разработки мы&nbsp;освоили технологии, которые применили в&nbsp;дипломном проекте.</p>
        <ul className="techs__list">
          <li className="techs__item">HTML</li>
          <li className="techs__item">CSS</li>
          <li className="techs__item">JS</li>
          <li className="techs__item">React</li>
          <li className="techs__item">Git</li>
          <li className="techs__item">Express.js</li>
          <li className="techs__item">mongoDB</li>
        </ul>
      </div>
    </section>
  );
}

export default Techs;
