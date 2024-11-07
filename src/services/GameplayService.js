import { db } from './FirebaseConfig';

import { ref, set, get, child, update } from 'firebase/database';

class GameplayService {
    async changeTheme(theme) {
        const inputText = `Please provide a set of 4 hexadecimal colors that form a cohesive color palette for a website with the theme ${theme}. The colors should be suitable for the following elements: 1. Header background 2. Sidebar background 3. Icon color 4. Text color Ensure that the colors are visually appealing and follow web design best practices. Respond only with the hex values separated by commas, no explanations.`;
        try {
            const response = await fetch('http://localhost:5000/theme-generator', { 
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
            console.log(`API response: ${JSON.stringify(data)}`);
           
            const colors = data.color.split(',').map(color => color.trim());
            if (colors.length >= 4) {
                return {
                    headerColor: colors[0],
                    sidebarColor: colors[1],
                    iconColor: colors[2],
                    textColor: colors[3]
                };
            } else {
                throw new Error('Formato de resposta inesperado');
            }
        } catch (error) {
            console.error('Erro ao buscar dados da API:', error);
        }
    }

    async buscaRegiaoAtual(userId) {
        const dbRef = ref(db);
        const snapshot = await get(child(dbRef, `users/${userId}/currentRegion`));
    
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            await set(ref(db, `users/${userId}/currentRegion`), 1);
            return 1;
        }
    }

    async buscaColetaveis(userId) {
        const dbRef = ref(db);
        const snapshot = await get(child(dbRef, `users/${userId}/coletaveis`));

        if (snapshot.exists()) {
            console.log('Coletáveis encontrados:', snapshot.val());
            return snapshot.val()
        } else {
            const coletaveis = { anel: 0, grimorio: 0, marcador: 0 }
            await set(ref(db, `users/${userId}/coletaveis`), coletaveis);
            return coletaveis
        }
    }

    async setColetaveis(userId, item) {
        console.log('entrei: ' + item)
        try {
            const dbRef = ref(db, `users/${userId}/coletaveis`);
            const snapshot = await get(dbRef);

            if (snapshot.exists()) {
                const coletaveis = snapshot.val();
                coletaveis[item] = 1;
                console.log('coletavel-firebase: ' + JSON.stringify(coletaveis))
                await update(dbRef, coletaveis);
                console.log(`Item ${item} atualizado para 1`);
            } else {
                const newColetaveis = { anel: 0, grimorio: 0, marcador: 0 };
                newColetaveis[item] = 1;
                await set(dbRef, newColetaveis);
                console.log(`Coletáveis criados e item ${item} atualizado para 1`);
            }
        } catch (error) {
            console.error('Erro ao atualizar coletáveis:', error);
        }
    }

    async buscaInventario(userId) {
        const dbRef = ref(db);
        const snapshot = await get(child(dbRef, `users/${userId}/inventory`));
    
        if (snapshot.exists()) {
            console.log('Inventário encontrado:', snapshot.val());
            return snapshot.val();
        } else {
            console.log('Inventário não encontrado. Criando novo inventário...');
            const initialInventory = {
                regiao1: [],
                regiao2: [],
                regiao3: []
            };
            await set(ref(db, `users/${userId}/inventory`), initialInventory);
            return initialInventory;
        }
    }
    
    async adicionaItemAoInventario(userId, regiao, item) {
        try {
            const dbRef = ref(db, `users/${userId}/inventory`);
            const snapshot = await get(dbRef);
    
            if (snapshot.exists()) {
                const inventory = snapshot.val();

                if (!inventory[`regiao${regiao}`]) {
                    inventory[`regiao${regiao}`] = [];
                }

                inventory[`regiao${regiao}`].push(item);
                await update(dbRef, inventory);
                console.log(`Item ${item.name} adicionado ao inventário na região ${regiao}`);
    
            } else {
                const newInventory = {
                    [`regiao${regiao}`]: [item]
                };
                await set(dbRef, newInventory);
                console.log(`Inventário criado e item ${item.name} adicionado na região ${regiao}`);
           }
        } catch (error) {
            console.error('Erro ao adicionar item ao inventário:', error);
        }
    }

    async setRegiaoAtual(userId, regiao) {
        try {
            await set(ref(db, `users/${userId}/currentRegion`), regiao);
            console.log(`Região atual do usuário ${userId} definida para ${regiao}`);
        } catch (error) {
            console.error('Erro ao definir a região atual:', error);
        }
    }

    async buscaHistoria(userId, theme, regiao) {
        const dbRef = ref(db);
        const snapshot = await get(child(dbRef, `users/${userId}/story-${regiao}`));
        let inputText;

        switch(regiao) {
            case 'regiao1':
                inputText = `Create a brief introduction for the first region called 'Twilight Library', in Portuguese-BR, based on the player's chosen theme: ${theme}. The character awakens in endless corridors of a magical library, where towering shelves fade into the shadows, and ancient books seem to whisper secrets. Twilight seeps through the dusty windows, hinting at a forgotten era. The silent, imposing library holds ancient mysteries tied subtly to the chosen theme, and the character senses that their presence here is both an invitation and a riddle. This marks the beginning of their journey, where the unknown still reigns, but the first clues of their mission start to surface. Only 6 lines of text, with no additional explanations or symbols.`;
                break;
            case 'regiao2':
                inputText = `Develop a continuation for the second region called 'Lost Garden', in Portuguese-BR, based on the player's chosen theme: ${theme}. After escaping the mysteries of the library, the character encounters a vast, enigmatic garden hidden around its outskirts. Exotic plants grow amid ancient ruins, and the sound of the wind through the leaves brings memories of ages past. Here, every flower and ancient stone tells part of the library's secrets, and the connection to the theme becomes clearer. Danger lurks as hidden forces emerge, challenging the character’s resolve and deepening the mysteries tied to their path. Only 6 lines of text, with no additional explanations or symbols.`;
                break;
            case 'regiao3':
                inputText = `Write a plot for the third region called 'Stairway to the World's End', in Portuguese-BR, centered around the player's chosen theme: ${theme}. The character now faces the towering staircase leading beyond the world’s edge, where the library’s mysteries reach their grand climax. Each step resonates with the power of ancient knowledge as the landscape shifts, reflecting the chosen theme with a sense of finality. The journey is nearing its peak, and the stakes have never been higher as reality and myth begin to merge. Only 6 lines of text, with no additional explanations or symbols.`;
                break;
            default:
                inputText = '';
                break;
        }

        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            try {
                const response = await fetch('http://localhost:5000/story-generator', { 
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

                const formattedHistoria = data.story.split('. ').map(sentence => sentence.trim()).filter(sentence => sentence.length > 0);
    
                await set(ref(db, `users/${userId}/story-${regiao}`), formattedHistoria);
                return formattedHistoria;
            } catch (error) {
                console.error('Erro ao gerar história:', error);
            }
        }
    }

    async geraDerrota(theme, enemy) {
        const inputText = `
            Write a narrative about the defeat of the young factory worker from 1800s England. 
            He was inside a cursed book and faced a ${enemy}, but was ultimately defeated. 
            The story should have a somber tone, with hints of tragedy, as the worker succumbs to the curse of the book and loses his life. 
            The theme of the defeat should be tied to ${theme}, and the consequences of losing should be dire and mysterious. Don't give explications, I need only the text and nothing more.. Also, write 3 paragraphs. Do not use \ or / in the text.
        `;
    
        try {
            const response = await fetch('http://localhost:5000/story-generator', { 
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
            return data.story;
        } catch (error) {
            console.error('Erro ao gerar história de derrota:', error);
        }
    }
}

export default new GameplayService();