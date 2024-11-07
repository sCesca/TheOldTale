import React, { useState, useContext } from "react";

import { useNavigate } from 'react-router-dom';

import yinYang from '/assets/images/yin_yang.png';

import circleRight from '/assets/icons/arrow_circle_right.png';

import AuthServices from "../../services/AuthServices";

import './TelaInicial.css';

import InputGroup from '../../components/InputGroup/InputGroup';

import { handleAuthError } from "../../utils/Functions";

import { AuthContext } from "../../context/AuthContext";

const TelaInicial = () => {
  const { handleLogin } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  const navigate = useNavigate();

  const navegarCadastro = () => {
    navigate('/cadastro');
  };

  const navegarRecSenha = () => {
    navigate('/recuperarSenha');
  };

  const handleLoginClick = async () => {
      try {
      console.log('Tentando fazer login com:', email, password);
      const result = await handleLogin(email, password);
      
      if (result.success) {
        console.log('Login bem-sucedido:', result.user);
        navigate('/telaPrincipal'); 
      }  else {
        console.log('else')
        handleAuthError(result.error, setError);
      }
    } catch (error) {
      console.log('Erro no bloco catch:', error);
      setError(error.message);
    }
  };

  return (
    <section className="tela-inicial">
      <div className="container-inicial">
        {error && <p className="error-message">{error}</p>}
        <InputGroup
          label="EMAIL"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputGroup
          label="SENHA"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="text-link" onClick={navegarCadastro}>CADASTRAR</div>
        <div className="text-link" onClick={navegarRecSenha}>RECUPERAR SENHA</div>
        <img className="arrow-circle-right" alt="Arrow circle right" onClick={handleLoginClick} src={circleRight} />
      </div>
    </section>
  );
};

export default TelaInicial;