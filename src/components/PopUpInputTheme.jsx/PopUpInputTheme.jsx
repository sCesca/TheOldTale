import React from 'react';

import ReactDOM from 'react-dom';

import { useState, useContext } from 'react';

import { GameContext } from '../../context/GameContext';

import './PopUpInputTheme.css';

const Popup = ({ isVisible, onClose, onSubmit, setThemeInput }) => {
    const {player, setPlayer, user} = useContext(GameContext);
    
    const [localThemeInput, setLocalThemeInput] = useState('');

    if (!isVisible) return null;

    const handleInputChange = (event) => {
        setLocalThemeInput(event.target.value);
    };

    const handleFormSubmit = async (event) => {
        const updatedPlayer = { ...player };

        updatedPlayer._money -= 200;

        setPlayer({...updatedPlayer});

        try {
          await PlayerService.salvaJogador(user.uid, updatedPlayer);
          setErrorMessage('');
        } catch (error) {
          console.error('Erro ao atualizar o jogador no Firebase:', error);
          setErrorMessage('Erro ao atualizar o jogador.');
        }
        event.preventDefault();
        setThemeInput(localThemeInput); 
        onSubmit();
        onClose();
    };

    const handlePopupClick = (event) => {
        if (event.target.className === 'popup') {
        onClose();
        }
    };

    return ReactDOM.createPortal(
        <div className="popup" onClick={handlePopupClick}>
        <div className="popup-content">
            <span className="close-btn_popup" onClick={onClose}>&times;</span>
            <div className="form_popup">
            <label className="label_popup" htmlFor="theme-input">INSIRA O TEMA</label>
            <input
                type="text"
                id="theme-input"
                className='input_popup'
                value={localThemeInput}
                onChange={handleInputChange}
            />
            <button className="button_popup" onClick={handleFormSubmit}>Enviar</button>
            </div>
        </div>
        </div>,
        document.body
    );
};

export default Popup;