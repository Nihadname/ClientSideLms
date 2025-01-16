import React, { useState } from 'react';
import axios from 'axios';
import './ChangePassword.css'; // Import custom CSS for styling

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChangePassword = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    try {
      const beakerToken = localStorage.getItem('jwtToken'); // Retrieve the token
      const response = await axios.post(
        'https://localhost:7032/api/User/ChangePassword', // Update with your actual endpoint
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${beakerToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      setSuccess("Password changed successfully!");
    } catch (error) {
      setError('Error changing password: ' + error.message);
    }
  };

  return (
    <div className="change-password-page">
      <h1>Change Password</h1>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleChangePassword} className="change-password-form">
        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
}

export default ChangePassword; 