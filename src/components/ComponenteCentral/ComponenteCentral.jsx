import React, { useContext, useState, useEffect } from 'react';

import './ComponenteCentral.css';

import { Tooltip as ReactTooltip } from 'react-tooltip'; // Correct import statement

import ComponenteMonstro from '../ComponenteMonstro/Monstro.jsx';

import placeHolder from '/public/assets/images/monster.png';

import { GameContext } from '../../context/GameContext.jsx';

import anelPng from '/public/assets/icons/anel-pristino.png';

import grimorio from '/public/assets/icons/grimorio-sombrio.png';

import marcador from '/public/assets/icons/marcador-de-tempo-quantico.png';

import Crepusculo_Sagrado from '/public/assets/icons/essencia-sagrada.png';

import Pureza_Imaculada from '/public/assets/icons/pureza.png';

import Gema_Destino from '/public/assets/icons/gema.png';

import Pagina_Noite_Eterna from '/public/assets/icons/pagina-perdida.png';

import Calice_Sangue from '/public/assets/icons/calice.png';

import Simbolo_Umbra from '/public/assets/icons/umbra.png';

import Particula_Fluxo from '/public/assets/icons/atomo.png';

import Relicario_Eternidade from '/public/assets/icons/relicario.png';

import Cifra_Horizonte from '/public/assets/icons/cifra.png';

import GameplayService from '../../services/GameplayService.js';

const itemImages = {
  Crepusculo_Sagrado: {
    image: Crepusculo_Sagrado,
    displayName: 'Crepúsculo Sagrado'
  },
  Pureza_Imaculada: {
    image: Pureza_Imaculada,
    displayName: 'Pureza Imaculada'
  },
  Gema_Destino: {
    image: Gema_Destino,
    displayName: 'Gema do Destino'
  },
  Pagina_Noite_Eterna: {
    image: Pagina_Noite_Eterna,
    displayName: 'Página Perdida'
  },
  Calice_Sangue: {
    image: Calice_Sangue,
    displayName: 'Cálice de Sangue'
  },
  Simbolo_Umbra: {
    image: Simbolo_Umbra,
    displayName: 'Símbolo Esquecido'
  },
  Particula_Fluxo: {
    image: Particula_Fluxo,
    displayName: 'Partícula de Fluxo'
  },
  Relicario_Eternidade: {
    image: Relicario_Eternidade,
    displayName: 'Relicário da Eternidade'
  },
  Cifra_Horizonte: {
    image: Cifra_Horizonte,
    displayName: 'Cifra do Horizonte'
  }  
};

const craftableItems = [
  { name: 'anel', image: anelPng, fragments: [0, 1, 2] },
  { name: 'grimorio', image: grimorio, fragments: [3, 4, 5] },
  { name: 'marcador', image: marcador, fragments: [6, 7, 8] }
];

function ComponenteCentral({ onMonsterUpdate }) {
  const {
    monsters,
    user,
    loadingMonsters,
    player,
    inventory,
    currentRegion,
    coletaveis,
    setColetaveis
  } = useContext(GameContext);


  const [selectedCells, setSelectedCells] = useState([]); 
  const [craftedItems, setCraftedItems] = useState([]); 

  useEffect(() => {
    const crafted = Object.keys(coletaveis).filter(key => coletaveis[key] === 1);
    setCraftedItems(crafted);
  }, [coletaveis]);

  const handleItemClick = (index) => {

    setSelectedCells((prevSelectedCells) => {
      if (prevSelectedCells.includes(index)) {
        return prevSelectedCells.filter((cellIndex) => cellIndex !== index);
      } else if (prevSelectedCells.length < 3) {
        return [...prevSelectedCells, index];
      } else {
        return prevSelectedCells;
      }
    });
  };

  const handleCraftClick = async (itemName) => {
    if (!craftedItems.includes(itemName)) {
      setCraftedItems((prevCraftedItems) => [...prevCraftedItems, itemName]);
      if (user) {
        
        setColetaveis((prevColetaveis) => ({
          ...prevColetaveis,
          [itemName]: 1
        }));
      }
      await GameplayService.setColetaveis(user.uid, itemName);
    }
  };

  const placeHolderStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    transform: 'scale(1)',
    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 10px'
  };

  const combinedInventory = [];
  for (let i = 1; i <= currentRegion; i++) {
    if (inventory[`regiao${i}`]) {
      combinedInventory.push(...inventory[`regiao${i}`]);
    }
  }

  const filledShelves = Array(9).fill(null).map((_, index) => combinedInventory[index] || null);

  const craftedItem = craftableItems.find(item =>
    item.fragments.every(fragmentIndex => selectedCells.includes(fragmentIndex))
  );

  return (
    <main className="main-content">
      <div className='content'>
        <div className="main-section-content">
          {monsters.map((monster, index) => (
            loadingMonsters[index] ? (
              <div key={index} className="monster-container">
                <div className="monster-box" style={placeHolderStyle}>
                    <div className="monster-name">
                      <h1>‎</h1>
                    </div>
                    <img src={placeHolder}/>
                    <h1 id="monsterhp">Loading...</h1>
                  </div>
                </div>
            ) : (
              <ComponenteMonstro
                key={index}
                index={index}
                monster={monster}
                player={player}
                onMonsterUpdate={onMonsterUpdate}
              />
            )
          ))}
        </div>
        <div className="logs-content">
          <div className="shelf">
          {filledShelves.map((item, index) => (
              <div
                key={index}
                className={`shelf-cell ${selectedCells.includes(index) ? 'selected' : ''}`}
                onClick={() => handleItemClick(index)}
                data-tooltip-id={`tooltip-${index}`}
                data-tooltip-content={item ? itemImages[item.name.replace(/ /g, '_')].displayName : 'Vazio'}
              >
                {item ? <img src={itemImages[item.name.replace(/ /g, '_')].image} alt={itemImages[item.name.replace(/ /g, '_')].displayName} /> : null}
              </div>
            ))}
          </div>
          <div className='shelf-craft'>
            {craftedItem && !craftedItems.includes(craftedItem.name) ? (
              <div
                className={`shelf-craft-cell`}
                onClick={() => handleCraftClick(craftedItem.name)}
              >
                <img
                  src={craftedItem.image}
                  alt={craftedItem.name}
                  style={{ opacity: 0.5, width: '100%', height: '100%' }}
                />
              </div>
            ) : (
              <div className={`shelf-craft-cell`}>
                {craftedItem && (
                  <img
                    src={craftedItem.image}
                    alt={craftedItem.name}
                    style={{ opacity: 1, width: '100%', height: '100%' }}
                  />
                )}
              </div>
            )}
          </div>
          <div className='coletaveis'>
            <img
              src={anelPng}
              alt="Anel Pristino"
              className="anel-pristino"
              data-tooltip-id="tooltip-anel"
              data-tooltip-content="Anel Pristíno"
              style={{ opacity: coletaveis.anel == 1 ? 1 : 0.2 }}
            />
            <img
              src={grimorio}
              alt="Grimório Sombrio"
              className="grimorio-sombrio"
              data-tooltip-id="tooltip-grimorio"
              data-tooltip-content="Grimório Sombrio"
              style={{ opacity: coletaveis.grimorio == 1 ? 1 : 0.2 }}
            />
            <img
              src={marcador}
              alt="Marcador de Tempo Quântico"
              className="marcador-de-tempo"
              data-tooltip-id="tooltip-marcador"
              data-tooltip-content="Marcador de Tempo Quântico"
              style={{ opacity: coletaveis.marcador == 1 ? 1 : 0.2 }}
            />
          </div>
        </div>
      </div>
      {filledShelves.map((item, index) => (
        <ReactTooltip id={`tooltip-${index}`} key={index} className="custom-tooltip" place="top" />
      ))}
      <ReactTooltip id="tooltip-anel" className="custom-tooltip" place="top" />
      <ReactTooltip id="tooltip-grimorio" className="custom-tooltip" place="top" />
      <ReactTooltip id="tooltip-marcador" className="custom-tooltip" place="top" />
    </main>
  );
}

export default ComponenteCentral;