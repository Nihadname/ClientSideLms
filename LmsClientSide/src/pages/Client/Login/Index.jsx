import React, { useState } from 'react';
import './index.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

function Login() {
  const [FormData, setFormData] = useState({
    userNameOrGmail: '',
    password: '',
  });
  const navigate = useNavigate();  // Create the navigate function

  const handleSubmit =async (e) => {
    e.preventDefault();
    try{
        console.log("Username or Gmail:", FormData.userNameOrGmail);
    console.log("Password:", FormData.password);
        const response =await  axios.post('https://localhost:7032/api/Auth/Login', FormData);
    
        if(response.data.isSuccess==true){
            const token = response.data.token;
            localStorage.setItem('jwtToken', token);
            console.log('User registered successfully:', token);
            navigate('/');
        }
        //axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }catch (error) {
          console.error('Error registering user:', error);
             }
    
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value, // Dynamically set the value for the field based on the name
    }));
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-header">Welcome Back</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="userNameOrGmail">Username or Gmail</label>
            <input
              type="text"
              id="userNameOrGmail"
              name="userNameOrGmail" // Use the name attribute
              value={FormData.userNameOrGmail}
              onChange={handleChange} // Handle the change using a common function
              placeholder="Enter your username or Gmail"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password" // Use the name attribute
              value={FormData.password}
              onChange={handleChange} // Handle the change using a common function
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="login-btn">Login</button>
          <p className="signup-link">Don't have an account? <a href="#">Sign up</a></p>
        </form>
      </div>
    </div>
  );
}

export default Login;
