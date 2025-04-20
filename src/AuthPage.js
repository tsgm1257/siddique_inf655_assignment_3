// src/AuthPage.js
import React from 'react';
import SignUp from './SignUp';
import Login from './Login';

const AuthPage = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px' }}>
      <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px', maxWidth: '400px' }}>
        <SignUp />
      </div>
      <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px', maxWidth: '400px' }}>
        <Login />
      </div>
    </div>
  );
};

export default AuthPage;