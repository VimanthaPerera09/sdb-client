import React, { useState } from 'react';
import axios from 'axios';

const AddCustomer = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [creditCard, setCreditCard] = useState('');
  const [medicalRecords, setMedicalRecords] = useState('');

  const handleAddCustomer = async () => {
    try {
      await axios.post('http://20.106.171.147:3001/add-customer', {
        name,
        email,
        address,
        phone,
        creditCard,
        medicalRecords,
      });
      console.log('Customer added successfully');
    } catch (error) {
      console.error('Error adding customer', error);
    }
  };
  return (
    <div>
      <h2>Add Customer</h2>
      <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="text" placeholder="Address" onChange={(e) => setAddress(e.target.value)} />
      <input type="text" placeholder="Phone" onChange={(e) => setPhone(e.target.value)} />
      <input type="text" placeholder="Credit Card" onChange={(e) => setCreditCard(e.target.value)} />
      <input type="text" placeholder="Medical Records" onChange={(e) => setMedicalRecords(e.target.value)} />
      <button onClick={handleAddCustomer}>Add Customer</button>
    </div>
  );
};

export default AddCustomer;
