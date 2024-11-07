import audioFile from '/assets/mp3.mp3';

export const playMusic = (audio = audioFile) => {
    const music = new Audio(audio);

    music.loop = true;

    music.play().catch(error => {
      console.error('Error playing audio:', error);
    })

    music.volume = 0.1;
}

export const handleAuthError = (error, setError) => {
  let errorMessage = 'Erro ao fazer login';
  if (error.code) {
    switch (error.code) {
      case 'auth/invalid-email':
        errorMessage = 'Email inválido.';
        break;
      case 'auth/user-disabled':
        errorMessage = 'Usuário desativado.';
        break;
      case 'auth/user-not-found':
        errorMessage = 'Usuário não encontrado.';
        break;
      case 'auth/wrong-password':
        errorMessage = 'Senha incorreta.';
        break;
      default:
        errorMessage = 'Erro desconhecido ao fazer login.';
    }
  }
  setError(errorMessage);
};

export const handleAuthErrorCadastro = (error, setError) => {
  let errorMessage = 'Erro ao fazer cadastro';
  if (error.code) {
    switch (error.code) {
      case 'auth/email-already-in-use':
        errorMessage = 'Email já está em uso.';
        break;
      case 'auth/invalid-email':
        errorMessage = 'Email inválido.';
        break;
      case 'auth/weak-password':
        errorMessage = 'Senha fraca.';
        break;
      default:
        errorMessage = 'Erro desconhecido ao fazer cadastro.';
    }
  }
  setError(errorMessage);
};