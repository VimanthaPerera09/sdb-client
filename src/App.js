import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './Login';
import Search from './Search';
import AddUser from './AddUser';
import AddCustomer from './AddCustomer';

const App = () => {
  const [token, setToken] = useState('');

  return (
    <Router>
      <Routes>
        {/* Redirect to Login by default */}
        <Route path="/" element={<Login setToken={setToken} />} />

        {/* Protected route: User must be logged in */}
        <Route path="/search" element={token ? <Search token={token} /> : null} />

        {/* Route that doesn't require login */}
        <Route path="/add-user" element={<AddUser />} />

        {/* Route that doesn't require login */}
        <Route path="/add-customer" element={<AddCustomer />} />
      </Routes>
    </Router>
  );
};

export default App;
