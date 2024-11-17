import React, { useEffect, useState } from 'react';

import { useSpring, animated } from '@react-spring/web';

import "./Monstro.css";

import Monster from '../../models/Monster';

import Player from '../../models/Player';

import slashAudio from '/assets/slash-audio.mp3';

import slashImage from '/assets/images/slash.png';

function ComponenteMonstro({ monster, player, index, onMonsterUpdate }) {
    const [isDamaged, setIsDamaged] = useState(false);
    
    const [damageValue, setDamageValue] = useState(0);

    const [showDamage, setShowDamage] = useState(false);
    
    const [damagePosition, setDamagePosition] = useState({ top: 0, left: 0 });

    const [loading, setLoading] = useState(true);

    const [isAttacking, setIsAttacking] = useState(false);

    const [image, setImage] = useState(null)

    const [currentMonster, setCurrentMonster] = useState(new Monster(monster.name, monster.rarity, monster.level, monster.health, monster.maxHealth));

    const [currentPlayer, setCurrentPlayer] = useState(new Player(player._name, player._money, player._xp, player._xpToNextLevel, player._level, player._dano, player._agilidade));

    const damageAnimation = useSpring({
        backgroundColor: isDamaged ? 'rgba(255, 0, 0, 0.5)' : 'transparent',
        transform: isDamaged ? 'scale(1.05)' : 'scale(1)',
        boxShadow: isDamaged ? '0 0 20px rgba(255, 0, 0, 0.5)' : '0 0 10px rgba(0, 0, 0, 0.1)',
        config: { duration: 300 },
    });

    const damageTextAnimation = useSpring({
        opacity: showDamage ? 1 : 0,
        transform: showDamage ? 'translateY(-40px)' : 'translateY(0px)',
        config: { duration: 2 },
    });

    const fetchImage = async () => {
        try {
            const timestamp = new Date().getTime();
            const imagePath = `/assets/images/monsters/${index}.png?timestamp=${timestamp}`;
            const response = await fetch(imagePath);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            setImage(imagePath);
        } catch (err) {
            console.error('Error fetching image:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        
        setCurrentMonster(new Monster(monster.name, monster.rarity, monster.level, monster.health, monster.maxHealth));
       
        setCurrentPlayer(new Player(player._name, player._money, player._xp, player._xpToNextLevel, player._level, player._dano, player._agilidade));
    
        fetchImage()

    }, [monster, player]);

    useEffect(() => {
        if (isDamaged) {
            const timer = setTimeout(() => setIsDamaged(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isDamaged]);

    useEffect(() => {
        if (showDamage) {
            const timer = setTimeout(() => setShowDamage(false), 200);
            return () => clearTimeout(timer);
        }
    }, [showDamage]);

    const clickHandler = () => {
        const damage = currentPlayer._dano * currentPlayer._agilidade;

        const updatedMonster = new Monster(currentMonster.name, currentMonster.rarity, currentMonster.level, currentMonster.health - damage, currentMonster.maxHealth);

        setCurrentMonster(updatedMonster);

        setDamageValue(damage);

        setIsDamaged(true);

        setShowDamage(true);

        setIsAttacking(true); 

        const audio = new Audio(slashAudio);

        audio.play();
        setTimeout(() => {
            setIsAttacking(false); 
        }, 200);

        if (updatedMonster.health <= 0) {
            onMonsterUpdate(index, updatedMonster.rarity);
        }
    };

    if (!currentMonster) return null;

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
            <animated.div className="monster-box" style={{ ...damageAnimation, borderColor: borderColor[currentMonster.rarity] }} onClick={clickHandler}>
                <h1 className={currentMonster.rarity}>
                    <div className="monster-name">
                        {currentMonster.name} {currentMonster.rarity} - {currentMonster.level}
                    </div>
                </h1>
                <img style={monsterBoxStyle} src={image} alt="Monster" />
                <h1 id="monsterhp">HP: {currentMonster.health} / {currentMonster.maxHealth} ({Math.round((currentMonster.health / currentMonster.maxHealth) * 100)}%)</h1>
            </animated.div>
            {showDamage && (
                <animated.div className="damage-text" style={{ ...damageTextAnimation, top: `${damagePosition.top}px`, left: `${damagePosition.left}px` }}>
                +{damageValue}
                </animated.div>
            )}
            <div className={`slash-effect ${isAttacking ? 'active' : ''}`}>
                <img src={slashImage} alt="Slash Effect" />
            </div>
        </div>
    );
}

export default ComponenteMonstro;