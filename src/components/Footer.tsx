import { Flame } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="footer bg-orange-300 p-2 text-center font-sans font-semibold ">
      <div className="container mx-auto">
        <Link to="/legal" className="text-orange-800 mb-1 inline-block no-underline">Mentions légales</Link>
        <p className='text-orange-800 text-xs'>&copy; 2025 To Doom App. All rights reserved.<Flame className="inline-block ml-1 w-3 h-3" /></p>
      </div>
    </footer>
  );
};

export default Footer;