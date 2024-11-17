import React, { createContext, useState, useEffect, useContext } from 'react';

import AuthServices from '../services/AuthServices';

import MonsterService from '../services/MonsterService';

import PlayerService from '../services/PlayerService';

import GameplayService from '../services/GameplayService';

import Player from '../models/Player';

import { AuthContext } from './AuthContext';

import { itensColetaveis } from '../constants/ItensColetaveis'

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [monsters, setMonsters] = useState([]);
  const [theme, setTheme] = useState('');
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMonsters, setLoadingMonsters] = useState([]);
  const [currentLog, setCurrentLog] = useState('');
  const [showIntroduction, setShowIntroduction] = useState(false);
  const [introduction, setIntroduction] = useState('');
  const [currentRegion, setCurrentRegion] = useState(1);
  const [inventory, setInventory] = useState({ regiao1: [], regiao2: [], regiao3: [] });
  const [coletaveis, setColetaveis] = useState([]);
  const [isFirstLogin, setIsFirstLogin] = useState(false);

  const { user } = useContext(AuthContext)

  const initializeData = async () => {
    try {
      setLoading(true);

      if (user) {
        const firstLogin = localStorage.getItem('firstLogin');
        if (!firstLogin) {
          setIsFirstLogin(true);
          localStorage.setItem('firstLogin', 'true');
        }
        setCurrentLog('Buscando temas...');
        const userTheme = await AuthServices.buscarTheme(user.uid);

        setCurrentLog('Buscando monstros...');
        const fetchedMonsters = await MonsterService.buscaMonstros(user.uid, userTheme);
        setMonsters(fetchedMonsters);

        setCurrentLog('Buscando dados do jogador...');
        const fetchedPlayerData = await PlayerService.buscaJogador(user.uid);
        setPlayer(fetchedPlayerData);

        setCurrentLog('Buscando região atual...');
        const region = await GameplayService.buscaRegiaoAtual(user.uid);
        setCurrentRegion(region);

        setCurrentLog('Buscando inventário...');
        const fetchedInventory = await GameplayService.buscaInventario(user.uid);
        setInventory(fetchedInventory);

        setCurrentLog('Buscando coletáveis...');
        const fetchedColetaveis = await GameplayService.buscaColetaveis(user.uid);
        setColetaveis(fetchedColetaveis);

        setCurrentLog('Gerando história...');
        const intro = await GameplayService.buscaHistoria(user.uid, userTheme, `regiao${region}`);
        setIntroduction(intro);
        setShowIntroduction(true);

      } else {
        setCurrentLog('Usuário não autenticado.');
      }
    } catch (error) {
      console.error('Erro ao inicializar dados:', error);
      setCurrentLog('Erro ao carregar dados.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      setLoading(true);
      initializeData();
    }
  }, [user, currentRegion]);

  useEffect(() => {
    const applyTheme = async () => {
      if (user && theme) {
        setLoading(true);
        try {
          user.theme = theme;
          await AuthServices.updateUserInDatabase(user);

          await MonsterService.resetMonsters(user.uid, theme);

          initializeData();
        } catch (error) {
          console.error('Erro ao aplicar tema:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    applyTheme();
  }, [theme]);

  const handleMonsterUpdate = async (index, raridade) => {
    setLoadingMonsters((prev) => {
      const newLoadingMonsters = [...prev];
      newLoadingMonsters[index] = true;
      return newLoadingMonsters;
    });

    try {
      const name = await MonsterService.buscaNomeMonstro(theme, user.uid);
      const newMonster = await MonsterService.criaMonstro(name, currentRegion);
      const userTheme = await AuthServices.buscarTheme(user.uid);
      await MonsterService.criaImagem(userTheme, index);

      const newMonsters = [...monsters];
      newMonsters[index] = newMonster;
      setMonsters(newMonsters);

      const updatedPlayer = new Player(player._name, player._money, player._xp, player._xpToNextLevel, player._level, player._dano, player._agilidade);
      updatedPlayer.addXP(raridade);
      updatedPlayer.earnMoney(1);
      setPlayer(updatedPlayer);

      const dropChance = Math.random();

      if (dropChance < 1) {
        const itensRegiao = itensColetaveis[currentRegion - 1];

        console.log('itensRegiao:', itensRegiao);

        const itemDrop = itensRegiao[Math.floor(Math.random() * itensRegiao.length)];

        if (!inventory[`regiao${currentRegion}`]) {
          inventory[`regiao${currentRegion}`] = [];
        }
        
        const itemJaColetado = inventory[`regiao${currentRegion}`].some((item) => item.name === itemDrop.name);
        
        if (!itemJaColetado) {
          setInventory((prevInventory) => {
            const newInventory = { ...prevInventory };
            newInventory[`regiao${currentRegion}`].push(itemDrop);
            return newInventory;
          });

          await GameplayService.adicionaItemAoInventario(user.uid, currentRegion, itemDrop);
        }      
      }

      if (user) {
        await MonsterService.salvaMonstros(user.uid, newMonsters);
        await PlayerService.salvaJogador(user.uid, updatedPlayer);
      }
    } catch (error) {
      console.error('Erro ao atualizar o monstro:', error);
    } finally {
      setLoadingMonsters((prev) => {
        const newLoadingMonsters = [...prev];
        newLoadingMonsters[index] = false;
        return newLoadingMonsters;
      });
    }
  };

  const updateRegion = async (newRegion) => {
    if (user) {
      try {
        await GameplayService.setRegiaoAtual(user.uid, newRegion);
        setCurrentRegion(newRegion);
        console.log(`Região atual definida para ${newRegion}`);
      } catch (error) {
        console.error('Erro ao atualizar a região:', error);
      }
    }
  };

  const addItemToInventory = async (regiao, item) => {
    if (user) {
      try {
        await GameplayService.adicionaItemAoInventario(user.uid, regiao, item);
        setInventory((prevInventory) => ({
          ...prevInventory,
          [`regiao${regiao}`]: item
        }));
        console.log(`Item ${item} adicionado ao inventário na região ${regiao}`);
      } catch (error) {
        console.error('Erro ao adicionar item ao inventário:', error);
      }
    }
  };

  return (
    <GameContext.Provider
      value={{
        monsters,
        user,
        theme,
        player,
        loading,
        loadingMonsters,
        currentLog,
        showIntroduction,
        introduction,
        currentRegion,
        inventory,
        coletaveis,
        isFirstLogin,
        setIsFirstLogin,
        setColetaveis,
        setTheme,
        handleMonsterUpdate,
        setShowIntroduction,
        setIntroduction,
        setLoading,
        setCurrentLog,
        setPlayer,
        setCurrentRegion, 
        updateRegion,
        addItemToInventory
      }}
    >
      {children}
    </GameContext.Provider>
  );
};