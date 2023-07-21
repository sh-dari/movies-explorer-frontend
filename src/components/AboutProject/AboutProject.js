import React from 'react';
import './AboutProject.css';
import SectionHeader from '../SectionHeader/SectionHeader';

function AboutProject() {
  return(
    <section className="about" id="about">
      <SectionHeader text="О проекте"/>
      <ul className="about__plan">
        <li className="about__plan-item">
          <h3 className="about__plan-header">Дипломный проект включал 5 этапов</h3>
          <p className="about__plan-description">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и&nbsp;финальные доработки.
          </p>
        </li>
        <li className="about__plan-item">
          <h3 className="about__plan-header">На выполнение диплома ушло 5 недель</h3>
          <p className="about__plan-description">
            У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые
            нужно было соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <div className="about__date">
        <p className="about__date-item about__date-item_color_black">1 неделя</p>
        <p className="about__date-item about__date-item_color_gray">4 недели</p>
        <p className="about__date-item">Back-end</p>
        <p className="about__date-item">Front-end</p>
      </div>
    </section>
  );
}

export default AboutProject;
