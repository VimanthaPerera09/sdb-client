import React, { useState } from 'react';
import axios from 'axios';

const AddUser = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleAddUser = async () => {
    try {
      await axios.post('http://20.106.171.147:3001/add-user', {
        username,
        password,
        role,
      });

      console.log('User added successfully');
    } catch (error) {
      console.error('Error adding user', error);
    }
  };

  return (
    <div>
      <h2>Add User</h2>
      <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <input type="text" placeholder="Role" onChange={(e) => setRole(e.target.value)} />
      <button onClick={handleAddUser}>Add User</button>
    </div>
  );
};

export default AddUser;
