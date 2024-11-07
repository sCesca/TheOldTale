import React, {useContext, useState} from 'react';

import './VisualNovelIntro.css';

import karmalumia from '/assets/images/karma-lumia.png';

import arrowRight from '/assets/icons/arrow_circle_right.png';

import { GameContext } from '../../context/GameContext';

const VisualNovelIntro = ({ onClose, introduction }) => {
    const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
    const { currentRegion, setShowIntroduction, isFirstLogin } = useContext(GameContext)

    const dialogues = [
        [
          "Olá, meu nome é Karma Lumia, sou a feiticeira dos mundos encantados.",
          "Bem-vindo ao nosso mundo! Aqui começa a sua jornada...",
          "Você encontrará muitos desafios e aventuras pela frente.",
          "Prepare-se para uma experiência inesquecível!"
        ],
        
        introduction
        
      ];

    const handleNextDialogue = () => {
      if (currentDialogueIndex < dialogues.length - 1) {
        setCurrentDialogueIndex(currentDialogueIndex + 1);
      } else {
        setShowIntroduction(false)
        onClose();
      }
    };

    return (
        <div className="visual-novel-intro">
          <div className="npc-image">
              <img src={karmalumia} alt="NPC" />
          </div>
        <div className="story-text">
            {`Região ${currentRegion}`}
            {dialogues[currentDialogueIndex].map((line, index) => (
              <p key={index}>{line}</p>
            ))}
        </div>

        <button className="next-button" onClick={handleNextDialogue}>
            <img src={arrowRight} alt="Next" />
        </button>
        </div>
    );
};

export default VisualNovelIntro;