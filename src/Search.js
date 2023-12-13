import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/common.css';
const forge = require('node-forge');


const Search = ({ token }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [userRole, setUserRole] = useState('');

  function decrypt3DES(input, key) {
    let md5Key = forge.md.md5.create();
    md5Key.update(key);
    md5Key = md5Key.digest().toHex();
    const decipher = forge.cipher.createDecipher('3DES-ECB', md5Key.substring(0, 24));
    decipher.start();

    const inputBytes = forge.util.decode64(input);
    decipher.update(forge.util.createBuffer(inputBytes));
    decipher.finish();
    const decrypted = decipher.output;
    return decrypted.toString('utf8');
  }

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://20.106.171.147:3001/search?term=${searchTerm}`, {
        headers: {
          Authorization: token,
        },
      });

      const decryptedData = response.data.map((customer) => {
        // Decrypt credit card and medical records
        const decryptedCreditCard = decrypt3DES(customer.creditCard, 'A5dghfghA5dghfghA5dghfghA5dghfgh');
        const decryptedMedicalRecords = decrypt3DES(
          customer.medicalRecords,
          'A5dghfghA5dghfghA5dghfghA5dghfgh'
        );

        // Return the decrypted data along with other customer details
        return {
          ...customer,
          decryptedCreditCard,
          decryptedMedicalRecords,
        };
      });

      setSearchResult(decryptedData);
    } catch (error) {
      console.error('Search failed', error);
    }
  };

  const handleSearch = () => {
    // Trigger search when the button is clicked
    fetchData();
  };

  useEffect(() => {
    const tokenPayload = token.split('.')[1];
    const decodedPayload = JSON.parse(atob(tokenPayload));
    const role = decodedPayload.role;
    setUserRole(role);
  }, [token]);

  const renderTableHeader = () => {
    const headers = ['ID', 'Name', 'Email', 'Address'];
    if (userRole === 'admin' || userRole === 'privileged') {
      headers.push('Credit Card');
      if (userRole === 'admin') {
        headers.push('Medical Records');
      }
    }
    return headers.map((header) => <th key={header}>{header}</th>);
  };

  const renderTableData = () => {
    return searchResult.map((customer) => {
      return (
        <tr key={customer.id}>
          <td>{customer.id}</td>
          <td>{customer.name}</td>
          <td>{customer.email}</td>
          <td>{customer.address}</td>
          {userRole === 'admin' || userRole === 'privileged' ? (
            <>
              <td>{customer.decryptedCreditCard}</td>
              {userRole === 'admin' && <td>{customer.decryptedMedicalRecords}</td>}
            </>
          ) : null}
        </tr>
      );
    });
  };

  return (
    <div className="container">
      <h2 className="header">Secure Data</h2>
      <div className="input-group">
        <label htmlFor="searchTerm">Enter search term:</label>
        <input
          type="text"
          id="searchTerm"
          placeholder="Search term..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <button className="button" onClick={handleSearch}>Search</button>
      {searchResult.length > 0 && (
        <table className="table">
          <thead>
            <tr>{renderTableHeader()}</tr>
          </thead>
          <tbody>{renderTableData()}</tbody>
        </table>
      )}
    </div>
  );
};

export default Search;
