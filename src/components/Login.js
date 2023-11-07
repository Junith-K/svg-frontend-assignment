import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginForm = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // Check if the data exists in localStorage
    const storedUsername = localStorage.getItem('username');
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');

    // Check if all data is present and valid
    if (storedUsername && storedEmail && storedPassword) {
      // Automatically navigate to "/" if all data is valid
      navigate('/');
    } else {
      // Clear stored data if any value is missing
      localStorage.removeItem('username');
      localStorage.removeItem('email');
      localStorage.removeItem('password');
      localStorage.removeItem('games_list');
    }
  }, [navigate]);

  const isUsernameValid = (username) => {
    // Add your username validation logic here
    return username.length >= 5; // For example, require a minimum length of 5 characters
  };

  const isEmailValid = (email) => {
    // Add your email validation logic here
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isPasswordValid = (password) => {
    // Add your password validation logic here
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleLogin = () => {
    // Validate entered data
    if (!isUsernameValid(username)) {
      toast.error('Invalid username. Please enter a username with a minimum length of 5 characters.');
      return;
    }

    if (!isEmailValid(email)) {
      toast.error('Invalid email. Please enter a valid email address.');
      return;
    }

    if (!isPasswordValid(password)) {
      toast.error('Invalid password. Password must contain one uppercase letter, one lowercase letter, one number, and one special character.');
      return;
    }

    // Add your login logic here

    // Assuming you want to store username, email, and password in localStorage
    localStorage.setItem('username', username);
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);

    // Redirect to "/" page
    navigate('/');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
      <div className="w-1/3 bg-white p-8 rounded shadow-md transform hover:scale-105 transition-transform duration-300">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
              Username:
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <button
            type="button"
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white p-3 rounded hover:animate-pulse transition duration-2000"
          >
            Login
          </button>
        </form>
      </div>
    <ToastContainer position="top-right" />
    </div>
  );
};

export default LoginForm;
