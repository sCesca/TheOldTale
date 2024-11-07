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
      }, 1000); // Limpa a mensagem de erro após 3 segundos

      return () => clearTimeout(timer); // Limpa o timer se o componente for desmontado
    }
  }, [errorMessage]);

  const handleIncrement = async () => {
    if (player._money > 0) {
      // Verifica se o atributo já atingiu o máximo
      if (player[attribute] < maxAttribute) {
        // Incrementa o atributo e decrementa uma moeda
        const updatedPlayer = { ...player };
        updatedPlayer[attribute] += 1;
        updatedPlayer._money -= 1;

        // Atualiza o estado do jogador
        setPlayer({...updatedPlayer});

        // Persistir a atualização no Firebase
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
