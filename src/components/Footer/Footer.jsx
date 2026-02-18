import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#0f0f0f] text-gray-300 mt-20">
      <div className="w-11/12 mx-auto py-12 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white">
            B<span className="text-[#cf3520]">tracker</span>
          </h2>
          <p className="mt-4 text-sm text-gray-400 max-w-xs">
            Btracker is a simple and powerful task management tool that helps you stay organized,
            focused, and productive every day.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-[#cf3520] cursor-pointer">Dashboard</li>
            <li className="hover:text-[#cf3520] cursor-pointer">My Tasks</li>
            <li className="hover:text-[#cf3520] cursor-pointer">Completed Tasks</li>
            <li className="hover:text-[#cf3520] cursor-pointer">Settings</li>
          </ul>
        </div>

        {/* Call to Action */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Stay Productive</h3>
          <p className="text-sm text-gray-400 mb-4">
            Manage your tasks smarter and achieve more with Btracker.
          </p>
          <button className="btn bg-[#cf3520] hover:bg-[#b92f1d] text-white border-none btn-sm">
            Get Started
          </button>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Btracker. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
