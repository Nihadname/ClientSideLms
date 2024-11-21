import React from 'react';
import './index.css';

const Home = () => {
  return (
    <div>
      <div className="flex justify-center items-center mt-10">
        <div className="relative w-full max-w-2xl">
          {/* Background Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 rounded-3xl blur-2xl opacity-30"></div>

          {/* Auth Card */}
          <div className="relative bg-gradient-to-bl from-gray-800 via-gray-900 to-gray-800 shadow-2xl rounded-3xl p-10">
            {/* Floating Logo */}
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-600 via-pink-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg floating">
                <span className="text-white text-4xl font-extrabold">A</span>
              </div>
            </div>

            {/* Welcome Message */}
            <h1 className="text-4xl font-bold text-center mb-4 tracking-wide">
              Welcome to <span className="text-purple-400">EduHub</span>
            </h1>
            <p className="text-center text-gray-300 text-lg mb-8">
              Login or create an account to explore the features we offer.
            </p>

            {/* Action Buttons */}
            <div className="space-y-6">
              <button
                id="loginButton"
                className="block w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold text-lg text-center py-4 rounded-full shadow-lg transform hover:scale-105 transition-all"
              >
                Login
              </button>
              <a
                href="/register"
                className="block w-full bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-gray-800 font-semibold text-lg text-center py-4 rounded-full shadow-lg transform hover:scale-105 transition-all"
              >
                Register
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
