import Player from '../models/Player';

import { db } from './FirebaseConfig';

import { ref, set, get, child } from 'firebase/database';

class PlayerService {
    async buscaJogador(userId) {
        const dbRef = ref(db);
        try {
          const snapshot = await get(child(dbRef, `users/${userId}/player`));
          if (snapshot.exists()) {
            return snapshot.val();
          } else {
            const newPlayer = new Player(userId);
            await set(ref(db, `users/${userId}/player`), newPlayer);
            return newPlayer;
          }
        } catch (error) {
          console.error('Erro ao buscar dados do Firebase:', error);
        }
      }
    
      async salvaJogador(userId, player) {
        try {
          await set(ref(db, `users/${userId}/player`), player);
        } catch (error) {
          console.error('Erro ao salvar dados no Firebase:', error);
        }
      }
}

export default new PlayerService();