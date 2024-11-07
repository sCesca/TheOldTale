import React, { useContext, useEffect, useState } from 'react';

import { useSpring, animated } from '@react-spring/web';

import './BarraLateralDireita.css'

import pen from '/assets/icons/pen.png'

import arrowDown from '/assets/icons/arrow_down.png'

import JogadorInfo from '../JogadorInfo/JogadorInfo';

import Popup from '../PopUpInputTheme.jsx/PopUpInputTheme';

import { GameContext } from '../../context/GameContext';

function BarraLateralDireita({ color }) {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');

  const {
    player,
    setTheme
  } = useContext(GameContext)

  const handleYinYangClick = () => {
    if (player.moedas >= 200) {
      setIsPopupVisible(true);
    } else {
      setErrorMessage('Moedas insuficientes');
      setTimeout(() => setErrorMessage(''), 3000); 
    }
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false); 
  };

  const handleFormSubmit = () => {
    setIsPopupVisible(false); 
  };

  const errorAnimation = useSpring({
    opacity: errorMessage ? 1 : 0,
    transform: errorMessage ? 'translateY(0)' : 'translateY(-20px)',
    config: { duration: 300 },
  });

  return (
    <aside className="stats-info" >
      <JogadorInfo jogador={player} />
      <div className='title-gerar-mundo'>
        "Reimaginar o mundo"
      </div>
        
      <img src={arrowDown} className='arrow-down' alt="Arrow Down"/>

      <button className='pen-btn' onClick={handleYinYangClick}>
        <img src={pen} alt="Pen Button"/>
      </button>

      <div className="money-right">
        200 GC
      </div>

      <animated.div style={errorAnimation} className="error-message">
        {errorMessage}
      </animated.div>
    
      <Popup
        isVisible={isPopupVisible}
        onClose={handleClosePopup}
        onSubmit={handleFormSubmit}
        setThemeInput={setTheme}
      />
    </aside>
  );
}

export default BarraLateralDireita;