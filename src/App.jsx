import React, { useContext, Suspense } from 'react';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { AuthContext, AuthProvider } from './context/AuthContext';

import LoadingScreen from './pages/LoadingScreen/LoadingScreen';

import { GameProvider } from './context/GameContext';

import VideoIntro from './components/VideoIntro/VideoIntro';

const TelaInicial = React.lazy(() => import('./pages/TelaInicial/Telainicial'));

const TelaPrincipal = React.lazy(() => import('./pages/TelaPrincipal/TelaPrincipal'));

const TelaCadastro = React.lazy(() => import('./pages/TelaCadastro/TelaCadastro'));

const TelaRecuperarSenha = React.lazy(() => import('./pages/TelaRecuperarSenha/TelaRecuperarSenha'));

const AppRoutes = () => {
  const { user } = useContext(AuthContext);

  return (
    <Suspense fallback={<LoadingScreen currentLog={''} logs={[]}/>}>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/telaPrincipal" /> : <TelaInicial />} />
        <Route path="/telaInicial" element={<TelaInicial />} />
        <Route path="/telaPrincipal" element={user ? <TelaPrincipal /> : <Navigate to="/" />} />
        <Route path="/cadastro" element={<TelaCadastro />} />
        <Route path="/recuperarSenha" element={<TelaRecuperarSenha />} />
      </Routes>
    </Suspense>
  );
};

const App = () => (
  <AuthProvider>
    <GameProvider>
      <Router>
        <VideoIntro/>
        <AppRoutes />
      </Router>
    </GameProvider>
  </AuthProvider>
);

export default App;