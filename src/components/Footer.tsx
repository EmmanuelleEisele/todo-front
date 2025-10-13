import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="footer bg-orange-800 p-2 text-center font-sans ">
      <div className="container mx-auto">
        <Link to="/" className="text-white mb-1 inline-block no-underline">Mentions légales</Link>
        <p className='text-white text-xs'>&copy; 2024 Todo App. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;