import React from 'react';

import './LoadingScreen.css'; 

const LoadingScreen = ({ currentLog }) => {
  return (
    <div className="loading-screen">
      <div className="spinner"></div>
      <p>Carregando...</p>
      <div className="logs">
        <div className="log">{currentLog}</div>
      </div>
    </div>
  );
};

export default LoadingScreen;