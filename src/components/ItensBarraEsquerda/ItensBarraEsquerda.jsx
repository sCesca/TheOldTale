import React from 'react';

import iconPlus from '/assets/icons/icon_plus.png';

import './ItensBarraEsquerda.css';

import { useEffect, useContext, useState } from 'react';

import { GameContext } from '../../context/GameContext';

import PlayerService from '../../services/PlayerService';

import { useSpring, animated } from '@react-spring/web';

function ItensBarraEsquerda({ icon, text, attribute, maxAttribute }) {
  const {player, setPlayer, user} = useContext(GameContext);

  const [errorMessage, setErrorMessage] = useState('');
 
  const errorAnimation = useSpring({
    opacity: errorMessage ? 1 : 0,
    transform: errorMessage ? 'translateY(0)' : 'translateY(-20px)',
    config: { duration: 30 },
  });

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage('');
      }, 1000); 

      return () => clearTimeout(timer); 
    }
  }, [errorMessage]);

  const handleIncrement = async () => {
    if (player._money > 0) {

      if (player[attribute] < maxAttribute) {
   
        const updatedPlayer = { ...player };
        updatedPlayer[attribute] += 1;
        updatedPlayer._money -= 1;

        setPlayer({...updatedPlayer});

        try {
          await PlayerService.salvaJogador(user.uid, updatedPlayer);
          setErrorMessage('');
        } catch (error) {
          console.error('Erro ao atualizar o jogador no Firebase:', error);
          setErrorMessage('Erro ao atualizar o jogador.');
        }
      } else {
        setErrorMessage('Atributo já está no máximo.');
      }
    } else {
      setErrorMessage('Moedas insuficientes.');
    }
  };

  return (
    <div className='container'>
      <div className='atributos'>{player[attribute]}/10</div>
      <div className="sidebar-item">
        <div className="overlap-group">
          {text}
        </div>
      </div>
      <img loading="lazy" src={iconPlus} alt="" className="sidebar-item-icon" onClick={handleIncrement}/>
      <animated.div style={errorAnimation} className="error-message">
        {errorMessage}
      </animated.div>
    </div>
  );
}

export default ItensBarraEsquerda;
