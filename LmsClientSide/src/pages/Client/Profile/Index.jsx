import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import './index.css';

function Profile() {
  const navigate = useNavigate(); // Create the navigate function

  useEffect(() => {
    // Check if the token is present in localStorage
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      // If no token found, redirect to home
      navigate('/');
      return;
    }

    // Verify token with an API request (replace with your actual API URL)
    fetch("https://localhost:7032/api/Auth/CheckAuth", {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 401) {
          // If the API returns a 401 status, redirect to home
          navigate('/');
        }
      })
      .catch((error) => {
        console.error('Error checking token:', error);
        navigate('/'); // Redirect on error
      });
  }, [navigate]); // Effect runs only once when component mounts

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="avatar">
            <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="User Avatar" />
          </div>
          <h2 className="username">John Doe</h2>
          <p className="bio">Web Developer & Tech Enthusiast</p>
        </div>

        <div className="profile-details">
          <h3>Profile Information</h3>
          <div className="info">
            <p><strong>Email:</strong> johndoe@gmail.com</p>
            <p><strong>Phone:</strong> +1 234 567 890</p>
            <p><strong>Location:</strong> New York, USA</p>
            <p><strong>Member Since:</strong> January 2020</p>
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
