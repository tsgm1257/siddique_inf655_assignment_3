// src/AuthPage.js
import React from 'react';
import SignUp from './SignUp';
import Login from './Login';

const AuthPage = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      <div>
        <SignUp />
      </div>
      <div>
        <Login />
      </div>
    </div>
  );
};

export default AuthPage;