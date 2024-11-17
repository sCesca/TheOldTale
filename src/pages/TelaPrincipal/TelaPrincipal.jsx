import React, { useContext, useState, useEffect } from 'react';

import Header from '../../components/Header/Header';

import BarraLateralEsquerda from '../../components/BarraLateralEsquerda/BarraLateralEsquerda';

import ComponenteCentral from '../../components/ComponenteCentral/ComponenteCentral';

import BarraLateralDireita from '../../components/BarraLateralDireita/BarraLateralDireita';

import VisualNovelIntro from '../../components/VisualNovelIntro/VisualNovelIntro.jsx';

import './TelaPrincipal.css';

import LoadingScreen from '../LoadingScreen/LoadingScreen.jsx';

import { GameContext } from '../../context/GameContext.jsx';

import { AuthContext } from '../../context/AuthContext.jsx';

import GameEndPage from '../GameEnd/GameEnd.jsx';

import GameplayService from '../../services/GameplayService.js';


const TelaPrincipal = () => {

  const {
    setShowIntroduction,
    loading,
    showIntroduction,
    introduction,
    handleMonsterUpdate,
    currentLog,
    isFirstLogin,
    currentRegion,
    coletaveis,
    theme
  } = useContext(GameContext)

  const {
    user
  } = useContext(AuthContext)

  const [gameEnd, setGameEnd] = useState('');

  useEffect(() => {
    const fetchGameEndStory = async () => {
      if (currentRegion === 4 && user) {
        const story = await GameplayService.buscaFimDeJogo(user.uid, theme, coletaveis);
        setGameEnd(story); 
        console.log(story);
      }  
    }  

    fetchGameEndStory()
  }, [currentRegion, user, theme, coletaveis]) 

  if (loading) {
    return <LoadingScreen currentLog={currentLog} />;
  }

  if (currentRegion === 4) {
    return <GameEndPage story={gameEnd}/>;
  }

  const handleCloseIntroduction = () => {
    setShowIntroduction(false);
  };

  return (
    <div className="first-screen">
      {showIntroduction && !isFirstLogin && <VisualNovelIntro introduction={introduction} onClose={handleCloseIntroduction} />}
      <Header user={user}/>
      <div className="layout-container">
        <BarraLateralEsquerda userId={user.uid}/>
        <ComponenteCentral onMonsterUpdate={handleMonsterUpdate}
        />
        <BarraLateralDireita/>
      </div>
    </div>
  );
}

export default TelaPrincipal;