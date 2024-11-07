import React from 'react';

import arrowIcon from '/assets/icons/arrow_circle_right.png';

import './IntroductionScreen.css'; // Certifique-se de que o caminho está correto

import { textSalvamento } from '../../constants/Texts';

import level01 from '/assets/icons/level01.png';

import level02 from '/assets/icons/level02.png';

import level03 from '/assets/icons/level03.png';

import level04 from '/assets/icons/level04.png';

import level05 from '/assets/icons/level05.png';

import level06 from '/assets/icons/level06.png';

import level07 from '/assets/icons/level07.png';

import level08 from '/assets/icons/level08.png';

import level09 from '/assets/icons/level09.png';

import level10 from '/assets/icons/level10.png';

const IntroductionScreen = ({ introduction, onProceed }) => {
  const levels = [
    { icon: level01, text: "Level 01" },
    { icon: level02, text: "Level 02" },
    { icon: level03, text: "Level 03" },
    { icon: level04, text: "Level 04" },
    { icon: level05, text: "Level 05" },
    { icon: level06, text: "Level 06" },
    { icon: level07, text: "Level 07" },
    { icon: level08, text: "Level 08" },
    { icon: level09, text: "Level 09" },
    { icon: level10, text: "Level 10" }
  ];
  return (
    <div className="introduction-screen">
       <div className='line1'>
        <div className="introduction-content">
          <h1>Bem-vindo ao Jogo</h1>
          <p>{introduction}</p>
        </div>

        <div className="introduction-content">
          <h1>Salvamento</h1>
          <p>{textSalvamento}</p>
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        </div>
      </div>
     
      <div className='line2'>
        <div className="progress-content">
          <h1>Progresso do Jogador</h1>
          <div className="image-grid">
            {levels.map((level, index) => (
              <div key={index} className="image-container">
                <img src={level.icon} alt={level.text} />
                <p>{level.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="proceed-icon" onClick={onProceed}>
        <img src={arrowIcon} alt="Proceed" />
      </div>
    </div>
  );
};

export default IntroductionScreen;