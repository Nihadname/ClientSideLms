import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import './index.css';

function Profile() {
  const navigate = useNavigate(); // Create the navigate function
  const [user, setUser] = useState(null); // State to hold user data
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(null); // State to handle error

  useEffect(() => {
    // Check if the token is present in localStorage
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      // If no token found, redirect to home
      navigate('/');
      return;
    }

    // Verify token with an API request (replace with your actual API URL)
    fetch("https://localhost:7032/api/Auth/Profile", {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'accept': '*/*',
      },
    })
      .then((response) => response.json()) // Parse response as JSON
      .then((data) => {
        setUser(data); // Set the user data to state
        setLoading(false); // Set loading to false
      })
      .catch((error) => {
        console.error('Error fetching profile:', error);
        setError('Error fetching user data'); // Set error if there's an issue
        setLoading(false); // Set loading to false even in case of error
      });
  }, [navigate]); // Effect runs only once when component mounts

  // If loading, show a loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  // If there's an error, show the error message
  if (error) {
    return <div>{error}</div>;
  }

  // If user data is not available, show a message
  if (!user) {
    return <div>User data is not available</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="avatar">
            <img src={user.image} alt="User Avatar" />
          </div>
          <h2 className="username">{user.fullName}</h2>
          <p className="bio">{user.userName}</p>
        </div>

        <div className="profile-details">
          <h3>Profile Information</h3>
          <div className="info">
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phoneNumber || 'Not Provided'}</p>
            <p><strong>Blocked:</strong> {user.isBlocked ? 'Yes' : 'No'}</p>
          </div>
        </div>

        <div className="profile-actions">
          <button className="edit-btn">Edit Profile</button>
          <button className="logout-btn">Log Out</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
