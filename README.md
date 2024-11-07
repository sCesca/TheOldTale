# The Old Tale

**The Old Tale** é um jogo clicker que utiliza inteligência artificial para gerar imagens e textos de forma generativa.

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)

## Índice

[Instalação](#instalação)

[Atualizar Projeto Local](#atualizar-projeto-local)

[Iniciando Projeto Localmente](#iniciando-projeto-localmente)

[Fazendo Commits](#fazendo-commits)

[Aviso Anti-Burro](#aviso-anti-burro)

[Social](#social)

[License](#license)

## Instalação

Para clonar o projeto para o seu computador, siga os seguintes passos:

1. **Instale o Git**: Certifique-se de que o Git está instalado no seu sistema. Você pode baixar o Git [aqui](https://git-scm.com/downloads).

2. **Clone o Repositório**: Crie uma pasta aonde deseja colocar o projeto, após isso clique no "caminho" e digite ```cmd``` para abrir o terminal ou o prompt de comando que vai executar aquele comando naquela parte, após isso execute o comando abaixo para clonar o repositório:

   ```bash
   git clone https://github.com/sCesca/TheOldTale.git

3. **Instalar Dependências**: Utilize o ```npm install``` no terminal do projeto (para abrir o terminal basta clicar no VSCODE em "View" e "Terminal" que vai abrir um terminal novo) para instalar todas as dependências como React.js e relacionados. Vale lembrar que é **necessário ter instalado o Node.js** .

## Instalação de APIs

1. Para a construção do projeto, utilizamos a **API de geração de imagens**: Stable Diffusion (https://github.com/AUTOMATIC1111/stable-diffusion-webui)
   1.1 Modelo DreamShaper 8: https://civitai.com/models/4384/dreamshaper

   2.1 Lora Ancient Sketch: https://civitai.com/models/309555/paper-backgroundvintage-and-ragged-paper-background-game-prop-hand-drawn-draft

   2.2 Lora Add Details: https://civitai.com/models/58390/detail-tweaker-lora-lora
   
3. Para gerar textos aleatórios durante a gameplay, o setup do Ollama também foi necessário (https://github.com/AUTOMATIC1111/stable-diffusion-webui)
   2.1 Modelo utilizado no Ollama: llama3.1

## Iniciando Projeto Localmente

- Após instalar tudo necessário você pode iniciar o projeto com o comando ```npm run dev``` e basta segurar 'CTRL+CliqueEsquerdo' no link para abri-lo no browser. Depois disso abra outro terminal e digite ```python server``` depois aperte TAB ai o server vai virar ```.\server.py```, ai sim você pode dar ENTER.

    
## Social

Entre no nosso Discord para contato:

[![Discord](https://img.shields.io/badge/Discord-%235865F2.svg?style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/VDyXbAG6Bb)

## License

Este projeto está licenciado sob a Licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.


A Licença MIT é uma licença permissiva de código aberto que é simples e direta. Aqui está um resumo dos termos principais:

- **Permissão é concedida**: A licença permite que você use, copie, modifique, mescle, publique, distribua, sublicencie e venda cópias do software.

- **Sem garantias**: O software é fornecido "como está", sem garantias de qualquer tipo, expressas ou implícitas, incluindo, mas não se limitando a, garantias de comercialização, adequação a um fim específico e não violação.

- **Aviso de direitos autorais**: É necessário incluir um aviso de direitos autorais e uma cópia da licença em todas as cópias ou partes substanciais do software.

Este resumo não substitui a licença completa. Para mais detalhes, consulte o arquivo [LICENSE](LICENSE) no repositório.
