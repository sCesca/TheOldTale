import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthServices from '../../services/AuthServices'; // Certifique-se de importar o serviço de autenticação

import './GameEnd.css';

import arrowRight from '/assets/icons/arrow_circle_right.png';
import arrowLeft from '/assets/icons/arrow_circle_left.png'; // Importar o ícone de logout

const GameEndPage = ({ story }) => {
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
  const navigate = useNavigate();

  const handleNextDialogue = () => {
    if (currentDialogueIndex < story.length - 1) {
      setCurrentDialogueIndex(currentDialogueIndex + 1);
    }
  };

  const handleLogout = async () => {
    const result = await AuthServices.logout();
    if (result.success) {
      navigate('/'); 
      window.location.reload(); 
    } else {
      console.error("Failed to log out:", result.error);
    }
  };

  return (
    <div className="game-end-page">
      <button className="logout-button" onClick={handleLogout}>
        <img src={arrowLeft} alt="Logout" />
      </button>
      <h1>Fim do Jogo</h1>
      <div className="story-text-game-end">
        <p>{story[currentDialogueIndex]}</p>
      </div>
      {currentDialogueIndex < story.length - 1 && (
        <button className="next-button" onClick={handleNextDialogue}>
          <img src={arrowRight} alt="Next" />
        </button>
      )}
    </div>
  );
};

export default GameEndPage;