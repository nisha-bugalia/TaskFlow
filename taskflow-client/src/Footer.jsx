import React from 'react';

function Footer({ darkMode }) {
  return (
    <footer className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-purple-200 text-gray-800'} mt-10 py-6`}>
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm">
        <p>&copy; {new Date().getFullYear()} TaskFlow. All rights reserved.</p>
        <div className="flex space-x-4 mt-2 md:mt-0">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Terms of Service</a>
          <a href="#" className="hover:underline">Support</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
