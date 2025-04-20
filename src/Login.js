import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { useNavigate, Link } from 'react-router-dom'; // Ensure Link is imported

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in successfully!');
      navigate('/dashboard'); // Redirect to dashboard after login
    } catch (loginError) {
      setError(loginError.message);
      console.error('Error logging in:', loginError);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px', margin: 'auto' }}>
      <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Login</h2>
      {error && <p style={{ color: 'red', marginBottom: '10px', textAlign: 'center' }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '3px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '3px', boxSizing: 'border-box' }}
          />
        </div>
        <button
          type="submit"
          style={{ backgroundColor: '#007bff', color: 'white', padding: '10px 15px', border: 'none', borderRadius: '3px', cursor: 'pointer', marginBottom: '10px' }}
        >
          Log In
        </button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '10px' }}>
        Don't have an account? <Link to="/signup" style={{ color: '#28a745' }}>Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;