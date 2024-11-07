import React, { useContext } from 'react';

import { GameContext } from '../../context/GameContext.jsx';

import './VideoIntro.css';

import video from '/public/assets/introducao.mp4';

const VideoIntro = () => {
  const { isFirstLogin, setIsFirstLogin } = useContext(GameContext);

  const handleVideoEnd = () => {
    setIsFirstLogin(false);
  };

  return (
    isFirstLogin && (
      <div className="video-intro">
        <video
          src={video}
          autoPlay
          onEnded={handleVideoEnd}
          className="video-fullscreen"
        />
      </div>
    )
  );
};

export default VideoIntro;