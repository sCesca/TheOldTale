import React from 'react';
import './Monstro.css'; 

function LoadingMonstro({ index }) {
    const borderColor = "transparent";

    const monsterBoxStyle = {
        boxShadow: `0 0 1rem ${borderColor},
                    0 0 0.8rem ${borderColor},
                    0 0 .5rem ${borderColor},
                    inset 0 0 1.0rem ${borderColor}`,
        cursor: "default"
    };

    return (
        <div className="monster-container">
            <div className="monster-box-loading" style={{ borderColor: borderColor, pointerEvents: 'none' }}>
                <h1 className="loading">
                    <div className="monster-name">
                        Carregando...
                    </div>
                </h1>
                <div style={monsterBoxStyle} className="loading-image-placeholder"></div>
            </div>
        </div>
    );
}

export default LoadingMonstro;