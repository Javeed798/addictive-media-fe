import React from 'react';
import Register from '../components/Auth/Register';

const RegisterPage = () => {
  return (
    <div className='flex items-center justify-center mt-32 flex-col'>
      <h2 className='text-3xl font-bold text-black'>Register</h2>
      <Register />
    </div>
  );
};

export default RegisterPage;
