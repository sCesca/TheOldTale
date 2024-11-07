import Monster from '../models/Monster.js';

import { db } from './FirebaseConfig';

import { ref, set, get, child } from 'firebase/database';

class MonsterService {
    
    async resetMonsters(userId, theme) {
        const newMonsters = {};
        for (let i = 0; i < 3; i++) {
            const name = await this.buscaNomeMonstro(theme, userId);
            const newMonster = await this.criaMonstro(name);
            newMonster.imagePath = await this.criaImagem(theme, i);
            newMonsters[i] = newMonster;
        }
        await set(ref(db, `users/${userId}/monsters`), newMonsters);
    }

    async buscaNomeMonstro(theme, userId) {
        const dbRef = ref(db);
        const snapshot = await get(child(dbRef, `users/${userId}/monsters`));

        if (snapshot.exists()) {
            const data = snapshot.val();
        } else {
            console.log('No monsters found for user:', userId);
        }

        const inputText = `Generate a single name related to the theme ${theme}. The name should be one word, without repetitions, and can be inspired by various sources such as pop culture, religions, movies, mythology, or any other relevant themes, be creative. Avoid including quotes around the name and explications, give only the name.`;
        
        try {
            const response = await fetch('http://localhost:5000/names-generator', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    text: inputText
                })
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            return data.monster_name;
        } catch (error) {
            console.error('Erro ao buscar dados da API:', error);
        }
    }

    async criaImagem(theme, index) {
        const payload = {
            "prompt": `(masterpiece:1.1, good quality, high quality), (A drawing of ${theme}:1), (opponent, enemy:1),  <lora:J_ancient_sketch:1>,  pen sketch:1, j_ancient_sketch, black and white, black paint, on paper, paper background, sketch, <lora:add_detail:0.5>, full body shot`,
            "negative_prompt": "bad quality, worse quality:1, medium quality, distorted, foggy, mutated, overexposure, (background:1.2, sole objects, only objects), colorful",
            "steps": 10,
            "batch_size": 1,
            "cfg_scale": 7,
            "width": 512,
            "height": 512,
            "override_settings_restore_afterwards": false,
            "sampler_index": "Euler a",
            "scheduler": "Karras",
            "sd_lora": "add_detail",
            "sd_model_name":"dreamshaper_8",
            "override_settings": {
                "sd_model_checkpoint": "dreamshaper_8",
                "CLIP_stop_at_last_layers": 2
            }
        }
    
        console.log('Creating image with theme:', theme);

        try {
            const response = await fetch(`http://localhost:5000/image-generator?index=${index}`, { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
    
            // Return the image path from the response
            return data.imagePath;
        } catch (error) {
            console.error('Erro ao buscar dados da API:', error);
        }
    }
    async criaMonstro(name, regiao = 1) {
        return Monster.createNew(name, regiao); 
    }

    async buscaMonstros(userId, theme) { 
        const dbRef = ref(db);
        const snapshot = await get(child(dbRef, `users/${userId}/monsters`));
    
        if (snapshot.exists()) {

          const data = snapshot.val();
          return Object.values(data).map(monsterData => new Monster(
            monsterData.name,
            monsterData.rarity,
            monsterData.level,
            monsterData.health,
            monsterData.maxHealth
          ));
        } else {
          const newMonsters = {};
          for (let i = 0; i < 3; i++) {
            const name = await this.buscaNomeMonstro(theme, userId);
            const newMonster = await this.criaMonstro(name);
            console.log('Theme-:', theme);
            await this.criaImagem(theme, i);
            newMonsters[i] = newMonster;
          }
          await set(ref(db, `users/${userId}/monsters`), newMonsters);
          return Object.values(newMonsters);
        }
    }

    async salvaMonstros(userId, monsters) {
        try {
            await set(ref(db, `users/${userId}/monsters`), monsters);
        } catch (error) {
            console.error('Erro ao salvar monstros no Firebase:', error);
        }
    }
}

export default new MonsterService();