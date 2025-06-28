import React from "react";

const Footer = () => (
  <footer className="w-full bg-white text-grey-900 py-8 border-t border-violet-violet/70 shadow-[0_2px_8px_0_rgba(124,58,237,0.06)]">
    <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
      <div className="mb-4 md:mb-0">
        <span className="font-bold text-lg">Syntra</span>
        <span className="ml-2 text-sm">&copy; {new Date().getFullYear()} All rights reserved.</span>
      </div>
      <div className="mt-4 md:mt-0 text-xs text-gray-900">
        Made with <span className="text-red-500">♥</span> by Syntra Team
      </div>
    </div>
  </footer>
);

export default Footer;
