import React, { useState, useEffect } from 'react';
import './index.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const HeaderClient = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();
  const location = useLocation(); // Hook to detect route changes

  useEffect(() => {
    // Check if the user is logged in
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      setIsLoggedIn(false);
      return;
    }

    // Fetch user data from the API
    fetch('https://localhost:7032/api/Auth/CheckAuth', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 401) {
          // Unauthorized: Remove token and set as not logged in
          localStorage.removeItem('jwtToken');
          setIsLoggedIn(false);
        }
        return null;
      })
      .then((data) => {
        if (data) {
          setUserName(data.userName || 'User'); // Use user data from the API
          setIsLoggedIn(true);
        }
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        setIsLoggedIn(false);
      });
  }, [location]); // Re-run effect whenever the route changes

  const handleLogout = () => {
    // Clear local storage and navigate to home
    localStorage.removeItem('jwtToken');
    setIsLoggedIn(false);
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">EduHub</Link>
        </div>
        <nav className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
          <a href="#home" className="navbar-link">Home</a>
          <a href="#courses" className="navbar-link">Courses</a>
          <a href="#about" className="navbar-link">About</a>
          <a href="#contact" className="navbar-link">Contact</a>
        </nav>
        <div className="navbar-user">
          {isLoggedIn ? (
            <>
              <span className="navbar-username">Hi, {userName}</span>
              <Link to="/profile" className="navbar-profile-link">Profile</Link>
              <button onClick={handleLogout} className="navbar-logout">Logout</button>
            </>
          ) : (
            <Link to="/login" className="navbar-login">Login</Link>
          )}
        </div>
        <div className="navbar-toggle" onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>
    </header>
  );
};

export default HeaderClient;
