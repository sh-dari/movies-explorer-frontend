import React from 'react';
import './SectionHeader.css';

function SectionHeader({ text }) {
  return(
    <div className="section-header">
      <h2 className="section-header__title">{text}</h2>
      <div className="section-header__line"></div>
    </div>
  );
}

export default SectionHeader;
