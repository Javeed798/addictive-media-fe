import React from 'react';
import Login from '../components/Auth/Login';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/profile');
  };

  return (
    <div className='flex flex-col justify-center items-center mt-40'>
      <h2 className='text-3xl font-bold text-black'>Login</h2>
      <Login onLogin={handleLogin} />
    </div>
  );
};

export default LoginPage;
