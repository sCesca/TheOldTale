# **The Old Tale**

**The Old Tale** é um jogo clicker que utiliza inteligência artificial para gerar imagens e textos de forma generativa.

<div align="center">
  <img src="./public/assets/images/background_menu.jpg" alt="Banner do Projeto" style="border-radius: 8px;">
</div>

---

## **Tecnologias Utilizadas**

<div align="center">
  <img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E" alt="JavaScript">
  <img src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React">
  <img src="https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white" alt="Flask">
  <img src="https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white" alt="Figma">
</div>

---

## **Índice**

- [Instalação](#instalação)
- [Instalação de APIs 🌐](#instalação-de-apis)
- [Atualizar Projeto Local](#atualizar-projeto-local)
- [Iniciando Projeto Localmente](#iniciando-projeto-localmente)
- [Login](#login)
- [Final do Game](#final-do-game)
- [Social](#social)
- [License](#license)

---

## **Instalação**

### **1. Pré-requisitos**

Certifique-se de ter as seguintes ferramentas instaladas:
- [Git](https://git-scm.com/downloads)
- [Python](https://www.python.org/downloads/)

### **2. Clone o repositório**

Crie uma pasta no local desejado, abra o terminal nela e execute o comando abaixo:

```bash
git clone https://github.com/sCesca/TheOldTale.git
```

### **3. Instalar Dependências**

Após clonar o repositório, navegue até o diretório do projeto e instale as dependências com o seguinte comando:

```bash
cd TheOldTale
npm install
```

## **Instalação de APIs 🌐**

Para a construção do projeto, utilizamos as seguintes APIs:

### Geração de Imagens 🎨

- **Stable Diffusion:** [Link para o modelo](https://github.com/AUTOMATIC1111/stable-diffusion-webui)
  
- **Modelos Utilizados**:
  - **Modelo DreamShaper 8:** [Link para o Modelo](https://civitai.com/models/4384/dreamshaper)
    
  - **Lora Ancient Sketch:** [Link para o Lora](https://civitai.com/models/309555/paper-backgroundvintage-and-ragged-paper-background-game-prop-hand-drawn-draft)
    
  - **Lora Add Details:** [Link para o Lora](https://civitai.com/models/58390/detail-tweaker-lora-lora)

---

### Geração de Textos ✍️

Utilizamos o Ollama para a geração de textos durante a gameplay. Para configurar, siga as instruções no repositório do Ollama.

- **Modelo utilizado no Ollama:** llama3.1

## Iniciando Projeto Localmente 🚀

Após instalar todas as dependências e configurar as APIs necessárias, siga os passos abaixo para iniciar o projeto localmente:

### Iniciar o Backend:

- Para rodar o backend em Flask:
```bash
  python app.py
```

- Iniciar o Frontend:

No diretório do projeto, execute o seguinte comando:

```bash
  npm run dev
```

Após isso, basta utilizar: 'CTRL+CliqueEsquerdo' no link para abri-lo no browser.

- É necessário que o Stable Diffusion esteja rodando em conjunto com o setup Ollama

## Login 🔐
![Demonstração do Login](./gif-1.gif)

## Final do Game 🎉
![Demonstração do Final do Jogo](./gif-2.gif)

## Social 🌍

Siga-me nas redes sociais:

- [Linkedin](https://www.linkedin.com/in/samuelcesca/)
- [Instagram](https://www.instagram.com/samuelcesca)
