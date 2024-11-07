import React, { useContext, useState } from 'react';

import ItensBarraEsquerda from '../ItensBarraEsquerda/ItensBarraEsquerda';

import './BarraLateralEsquerda.css';

import dano from '/assets/icons/dano_icon.png';

import agilidade from '/assets/icons/agilidade_icon.png';

import { GameContext } from '../../context/GameContext';

import karmalumia from '/assets/images/karma-lumia.png';

import { Tooltip as ReactTooltip } from 'react-tooltip'; // Correct import statement

const objectives = [
  [
    "Chegue ao nível 3 para desbloquear a região 2",
    "Colete 3 itens para mim, eles serão importantes: ",
    "Fragmento de Pureza Imaculada",
    "Essência do Crepúsculo Sagrado",
    "Gema do Destino Intocado"
  ],
  [
    "Chegue ao nível 6 para desbloquear a região 3",
    "Colete 3 itens para mim, eles serão importantes: ",
    "Página Perdida de Noite Eterna",
    "Cálice de Sangue Enfeitiçado",
    "Símbolo Esquecido de Umbra Profunda"
  ],
  [
    "Chegue ao nível 10 e descubra o que acontece",
    "Colete 3 itens para mim, eles serão importantes: ",
    "Partícula de Fluxo Temporal",
    "Relicário da Eternidade Fragmentada",
    "Cifra do Horizonte Quântico"
  ]
]

function BarraLateralEsquerda({ color }) {
  const {showIntroduction, currentRegion, player , updateRegion } = useContext(GameContext)

  const [showObjectives, setShowObjectives] = useState(false);

  const regionUp = [3, 6, 10]

  const sidebarItems = [
    { icon: dano, text: "Dano", attribute:'_dano' },
    { icon: agilidade, text: "Agilidade", attribute:'_agilidade' },
  ];

  const handleMouseEnter = () => {
    setShowObjectives(true);
  };

  const handleMouseLeave = () => {
    setShowObjectives(false);
  };

  const handleRegionClick = () => {
    if (player._level >= regionUp[currentRegion - 1]) {
      updateRegion(currentRegion + 1);
    }
  };

  return (
    <aside className="sidebar">    
      {sidebarItems.map((item, index) => (
        <ItensBarraEsquerda key={index} attribute={item.attribute}  maxAttribute={10} icon={item.icon} text={item.text} />
      ))}
      { 
        showIntroduction == false ?
        [
          <div key='npc-image' className="npc-image-esquerda" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <img src={karmalumia} alt="NPC" />
            {showObjectives && (
                <div className="objectives-tooltip">
                  <h4>Objetivos da Região {currentRegion}</h4>
                  <ul>
                    {objectives[currentRegion - 1].map((objective, index) => (
                      <li key={index}>{objective}</li>
                    ))}
                  </ul>
                </div>
              )}
          </div>,
        player._level >= regionUp[currentRegion - 1] ? (
          <div
            key='region-title'
            className='region-title clickable'
            onClick={handleRegionClick}
            data-tooltip-id="regionTooltip"
          >
            {`Região ${currentRegion}`}
         </div>
          ) : (
            <div key='region-title' className='region-title'>
              {`Região ${currentRegion}`}
            </div>
          ),
          <ReactTooltip id="regionTooltip" place="right" effect="solid">
            Clique para atualizar a região
          </ReactTooltip>
        ] : null
      }
    </aside>
  );
}

export default BarraLateralEsquerda;
