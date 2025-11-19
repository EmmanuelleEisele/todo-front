import React from "react";
import { Link } from "react-router-dom";
import { Flame, Home } from "lucide-react";


const NotFoundPage: React.FC = () => (
  <div className="flex flex-col items-center justify-center min-h-[calc(100vh-116px)] font-sans">
    <h1 className="text-8xl font-bold text-orange-600 mb-4 animate-bounce">4<Flame size={80}/>4</h1>
    <h2 className="text-2xl font-semibold mb-2">Page non trouvée</h2>
    <p className="text-gray-600 mb-6">
      Désolé, la page que vous recherchez n'existe pas.
    </p>
    <Link to="/"className="flex items-center gap-2 bg-orange-600 text-white hover:bg-orange-700 p-2 rounded-lg no-underline">
       <Home size={20} /> Retour à l'accueil 
    </Link>
  </div>
);

export default NotFoundPage;