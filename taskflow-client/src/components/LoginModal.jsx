import React, { useState } from 'react';
import SignupForm from './SignupForm';

function LoginModal({ isOpen, onClose, darkMode }) {
  const [isSignup, setIsSignup] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate login success
    onClose();
  };

  return ( 
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div
        className={`p-6 rounded shadow-md w-96 ${
          darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'
        }`}
      >
        {isSignup ? (
          <SignupForm switchToLogin={() => setIsSignup(false)} />
        ) : (
          <form onSubmit={handleLogin} className="w-full">
            <h2 className="text-xl font-semibold mb-4">Login</h2>
            <input
              type="email"
              placeholder="Email"
              className="text-black w-full mb-2 p-2 border rounded"
              required
            />
            <input
            
              type="password"
              placeholder="Password"
              className="text-black w-full mb-4 p-2 border rounded"
              required
            />
            <button type="submit" className="bg-purple-600 text-white w-full py-2 rounded">
              Log In
            </button>
            <p className="mt-2 text-sm text-center">
              Don't have an account?{" "}
              <button
                type="button"
                className="text-purple-600 underline"
                onClick={() => setIsSignup(true)}
              >
                Sign up
              </button>
            </p>
          </form>
        )}

        <button
          onClick={onClose}
          className="mt-4 text-sm text-gray-500 underline block text-center w-full"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default LoginModal;
