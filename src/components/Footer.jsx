import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 py-6 mt-10 shadow-inner">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h3 className="text-xl font-semibold">© {new Date().getFullYear()} AuthApp. All rights reserved.</h3>

        <div className="flex space-x-4">
          <a href="#" className="hover:text-blue-600 transition">Privacy</a>
          <a href="#" className="hover:text-blue-600 transition">Terms</a>
          <a href="#" className="hover:text-blue-600 transition">Support</a>
        </div>
      </div>
    </footer>
  );
};
