import React from 'react';

import { useSpring, animated } from '@react-spring/web';

import './Monstro.css';

const MonsterBox = ({ currentMonster, image, isDamaged, showDamage, damageValue, damagePosition, clickHandler }) => {
  const damageAnimation = useSpring({
    backgroundColor: isDamaged ? 'rgba(255, 0, 0, 0.5)' : 'transparent',
    transform: isDamaged ? 'scale(1.05)' : 'scale(1)',
    boxShadow: isDamaged ? '0 0 20px rgba(255, 0, 0, 0.5)' : '0 0 10px rgba(0, 0, 0, 0.1)',
    config: { duration: 300 },
  });

  const damageTextAnimation = useSpring({
    opacity: showDamage ? 1 : 0,
    transform: showDamage ? 'translateY(-40px)' : 'translateY(0px)',
    config: { duration: 200 },
  });

  const borderColor = {
    "Comum": "#00FF00",
    "Incomum": "#0000FF",
    "Raro": "#FF00FF",
    "Épico": "#FFA500",
    "Legendário": "#FFD700",
    "Mítico": "#FF69B4",
    "Cósmico": "#00FFFF",
    "Divino": "#FF0000",
    "Eterno": "#FFFF00",
    "Maestral": "#C0C0C0",
    "Defeituoso": "#000000",
    "Administrador": "#FFFFFF"
  }[currentMonster.rarity] || "transparent";

  const monsterBoxStyle = {
    boxShadow: `0 0 1rem ${borderColor},
                0 0 0.8rem ${borderColor},
                0 0 .5rem ${borderColor},
                inset 0 0 1.0rem ${borderColor}`,
    cursor: "pointer"
  };

  return (
    <div className="monster-container">
      <animated.div className="monster-box" style={{ ...damageAnimation, borderColor }} onClick={clickHandler}>
        <h1 className={currentMonster.rarity}>
          <div className="monster-name">
            {currentMonster.name} {currentMonster.rarity} - Lv {currentMonster.level}
          </div>
        </h1>
        <img style={monsterBoxStyle} srcSet={image} alt="Monster" />
        <h1 id="monsterhp">HP: {currentMonster.health} / {currentMonster.maxHealth} ({Math.round((currentMonster.health / currentMonster.maxHealth) * 100)}%)</h1>
      </animated.div>
      {showDamage && (
        <animated.div className="damage-text" style={{ ...damageTextAnimation, top: `${damagePosition.top}px`, left: `${damagePosition.left}px` }}>
          +{damageValue}
        </animated.div>
      )}
    </div>
  );
};

export default MonsterBox;