import React from "react";

import { useNavigate } from 'react-router-dom';

import { useState } from "react";

import './TelaRecuperarSenha.css';

import AuthServices from "../../services/AuthServices";

import arrowLeft from '/assets/icons/arrow_circle_left.png';

import circleRight from '/assets/icons/arrow_circle_right.png';

import InputGroup from "../../components/InputGroup/InputGroup";

const TelaRecuperarSenha = () => {  
  const navigate = useNavigate();

  const [email, setEmail] = useState('');

  const handleBackClick = () => {
    navigate('/');
  };

  const recuperarSenha = async () => {
    const result = await AuthServices.resetPassword(email);
    if (result.success) {
      navigate('/');
    } else {
      console.error(result.error);
    }
  }

  return (
    <div className="recSenha">
      <div className="container-recSenha">
          <InputGroup
              label="EMAIL"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          <div className="button-return">
            <img
              className="arrow-circle-left"
              alt="Arrow circle left"
              src={arrowLeft}
              onClick={handleBackClick}
            />
            <img
              className="arrow-circle-right"
              alt="Arrow circle right"
              src={circleRight}
              onClick={recuperarSenha}
            />
          </div>
      </div>
    </div>
  );
};

export default TelaRecuperarSenha;