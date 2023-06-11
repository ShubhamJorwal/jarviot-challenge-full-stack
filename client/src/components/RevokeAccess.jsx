import React from 'react';
import axios from 'axios';

const RevokeAccess = () => {
  const handleRevokeAccess = async () => {
    try {
      const response = await axios.post('http://localhost:5000/revoke');
      if (response.status === 200) {
        alert('Google Drive access revoked');
      } else {
        throw new Error('Failed to revoke Google Drive access');
      }
    } catch (error) {
      console.error('Access revocation error:', error);
      alert('Failed to revoke Google Drive access');
    }
  };

  return (
    <div>
      <h2>Revoke Access</h2>
      <button onClick={handleRevokeAccess}>Revoke Access</button>
    </div>
  );
};

export default RevokeAccess;
