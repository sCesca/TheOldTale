import GameplayService from '../../services/GameplayService';

const items = {
    'apple': {
      name: 'apple',
      price: 0.5
    },
    'banana': {
      name: 'banana',
      price: 0.3
    },
    'orange': {
      name: 'orange',
      price: 0.4
  }
}

const commandHandler = {
  help: () => ({ text: 'Available commands: help, echo, cls, date, shop, run, generate story (theme) (introducao, conflito, climax, conclusao) (short,medium,large)', type: 'success' }),
  echo: (args) => ({ text: args.join(' '), type: 'success' }),
  cls: () => ({ text: 'cls', type: 'clear' }), // Handle clear separately in the terminal component
  date: () => ({ text: new Date().toLocaleString(), type: 'success' }),
  shop: (args) => {
      // Verifica quantidade de argumentos
      if (args.length <= 0) {
        return { text: 'No argument added.', type: 'error' };
      } else {
        // Checa se o argumento é list e enviar uma lista de todos os items
        if (args[0] === 'list') {
          let itemList = '';
          for (const item in items) {
            itemList += `${items[item].name} - Price: ${items[item].price}\n`;
          }
          return { text: itemList, type: 'success' };
        }
        // Verifica se o argumento é um item da lista, se for, retorna tudo sobre ele
        if (items[args[0]]) {
          return {
            text: `Item: ${items[args[0]].name} - Price: ${items[args[0]].price}`,
            type: 'success'
          };
        } else {
          return {
            text: 'Item not found.',
            type: 'error'
          };
        }
      }
  },
  generate: async (args) => {
    if (args.length < 3) {
        return { text: 'No argument added.', type: 'error' };
    } else {
        if (args[0] === 'story') {
            if (['introducao', 'conflito', 'climax', 'conclusao'].includes(args[2])) {
                if (args[3] === 'short' || args[3] === 'medium' || args[3] === 'long') {
                    try {
                        const story = await GameplayService.geraHistoria(args[1], args[2], args[3]);
                        return { text: JSON.stringify(story), type: 'success' };
                    } catch (error) {
                        console.error('Erro ao buscar dados da API:', error);
                        return { text: 'Erro ao buscar dados da API.', type: 'error' };
                    }
                } else {
                    return { text: 'Invalid story part.', type: 'error' };
                }
            } else {
                return { text: 'Invalid command.', type: 'error' };
            }
        }
    }
  },
  run: (args, run) => {
      if (args.length === 0) {
        return { text: 'Usage: run <YouTube URL>', type: 'error' };
      }
      const url = args[0];
      run(url);
      return { text: `Playing: ${url}`, type: 'success' };
    },
    exit: (args, run, exit) => {
      exit();
      return { text: 'YouTube player closed.', type: 'success' };
    }
    // Add new commands here
  };
  
  export default function handleCommand(command, run, exit) {
    const [cmd, ...args] = command.trim().split(/\s+/);
    if (commandHandler[cmd]) {
      return commandHandler[cmd](args, run, exit);
    } else {
      return { text: `Command not found: ${command}`, type: 'error' };
    }
  }