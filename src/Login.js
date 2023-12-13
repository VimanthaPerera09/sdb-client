import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/common.css';

const Login = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(null); // State to track login error
  const navigate = useNavigate(); // Hook to navigate

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://20.106.171.147:3001/login', {
        username,
        password,
      });

      const { token } = response.data;
      setToken(token);

      // Redirect to the search page upon successful login
      navigate('/search');
    } catch (error) {
      console.error('Login failed', error);

      // Set the login error state to display the error message
      setLoginError('Invalid credentials');
    }
  };

  return (
    <div className="container">
      <h2 className="header">Secure Data</h2>
      {loginError && <p className="error-message">{loginError}</p>}
      <div className="input-group">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          placeholder="Enter your username"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="button" onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
