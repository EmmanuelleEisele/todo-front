import { Flame } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="footer bg-orange-500 p-2 text-center font-sans ">
      <div className="container mx-auto">
        <Link to="/legal" className="text-white mb-1 inline-block no-underline">Mentions légales</Link>
        <p className='text-white text-xs'>&copy; 2025 To Doom App. All rights reserved.<Flame className="inline-block ml-1 w-3 h-3" /></p>
      </div>
    </footer>
  );
};

export default Footer;