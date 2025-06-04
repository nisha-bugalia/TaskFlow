// SignupForm.jsx
import React from 'react';

function SignupForm({ switchToLogin }) {
  const handleSignup = (e) => {
    e.preventDefault();
    // Implement signup logic here
    alert("Signed up successfully!");
    switchToLogin(); // Switch back to login after signup
  };

  return (
    <form onSubmit={handleSignup} className="w-full">
      <h2 className="text-xl font-semibold mb-4">Sign Up</h2>
      <input
        type="text"
        placeholder="Name"
        className="text-black w-full mb-2 p-2 border rounded"
        required
      />
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
        Sign Up
      </button>
      <p className="mt-2 text-sm text-center">
        Already have an account?{" "}
        <button
          type="button"
          className="text-purple-600 underline"
          onClick={switchToLogin}
        >
          Log in
        </button>
      </p>
    </form>
  );
}

export default SignupForm;
