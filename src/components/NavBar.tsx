import { useState } from 'react';
import { Flame, Menu, Power, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from './ui/Button';

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
 
  // Vérification de l'état de connexion via token
  const token = localStorage.getItem('authToken');
  const isConnected = !!token;
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white mx-auto py-4 font-sans w-full">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 no-underline sm:pl-4">
          <Flame className="w-8 h-8 text-orange-600" />
          <span className="text-orange-700 font-semibold text-xl">To-Doom</span>
        </Link>

        {/* Menu Desktop - Visible uniquement sur écrans larges */}
        <div className="hidden sm:flex items-center gap-3 pr-6">
          {isConnected ? (
            <>
            <Link to="/dashboard">
              <Button
                variant="ghost"
                className="text-orange-700 font-semibold hover:text-orange-900 hover:bg-orange-200 font-sans"
                title='Aller au tableau de bord'
              >
                Tableau de bord
              </Button>
            </Link>
              <Button
                variant="ghost"
                className="text-orange-700 font-semibold hover:text-orange-900 hover:bg-orange-200 font-sans"
                title='Se déconnecter'
              >
                <Power />
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button
                  variant="ghost"
                  className="text-orange-700 font-semibold hover:text-orange-900 hover:bg-orange-200 font-sans"
                >
                  Connexion
                </Button>
              </Link>
              <Link to="/register">
                <Button
                  className="bg-orange-600 font-semibold hover:bg-orange-700 text-white font-sans"
                >
                  Inscription
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Bouton Menu Burger - Visible uniquement sur mobile */}
        <button
          onClick={toggleMenu}
          className="sm:hidden pr-4 text-orange-700 hover:text-orange-900 hover:bg-orange-100 border-none bg-transparent transition-colors"
          aria-label="Menu"
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menu Mobile - Dropdown */}
      {isMenuOpen && (
        <div className="sm:hidden mt-4 py-4 px-2 border-t border-orange-200">
          <div className="flex flex-col gap-3">
            {isConnected ? (
              <>
              <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                <Button
                  variant="ghost"
                  className="w-full text-orange-700 font-semibold hover:text-orange-900 hover:bg-orange-200 font-sans"
                >
                  Tableau de bord
                </Button>
              </Link>
              <Button 
                variant="ghost"
                className="w-full text-orange-700 font-semiboldfont-sans"
                title='Se déconnecter'
              >
                Se déconnecter
              </Button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button
                    variant="ghost"
                    className="w-full text-orange-700 font-semibold hover:text-orange-900 hover:bg-orange-200 font-sans"
                  >
                    Connexion
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                  <Button
                    className="w-full bg-orange-600 font-semibold hover:bg-orange-700 text-white font-sans"
                  >
                    Inscription
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
