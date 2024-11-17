import React from "react";

import { useNavigate } from 'react-router-dom';

import AuthServices from '../../services/AuthServices';

import './Header.css';

import logo from '/assets/icons/logo.png';

import stars from '/assets/icons/stars.png';

const Header = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await AuthServices.logout();
    if (result.success) {
      navigate('/'); 
      window.location.reload(); 
    } else {
      console.error("Failed to log out:", result.error);
    }
  };

  return (
    <div className="box">
      <header className="header">
        <div className="left-group">
          <img className="stars" alt="Stars" src={stars} />
          <img className="logo" alt="logo" src={logo} />
        </div>
        <div className="text-wrapper">Bem-vindo, {user ? user.displayName : 'Usuário'}</div>
        {user && <button className="button-exit" onClick={handleLogout}>Sair</button>}
      </header>
    </div>
  );
};

export default Header;