import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import { Flame } from "lucide-react";
import { authService } from "../services/authService";

export default function Dashboard() {
  const user = authService.getCurrentUser();

  if (!user) {
    return (
      <div className="flex flex-col font-sans items-center justify-center min-h-[calc(100vh-116px)] bg-gradient-to-b from-orange-100 to-orange-300">
        <p className="text-orange-700">
          Vous devez être connecté pour accéder au tableau de bord.
        </p>
        <Link to="/login" className="flex justify-center no-underline">
          <Button className="mt-4 bg-orange-600 text-white hover:bg-orange-700">
            Se connecter
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-center sm:justify-between sm:items-center">
        <div className="p-4 mt-8 font-sans flex flex-row gap-2 items-center">
          <Flame className="w-12 h-12 text-orange-600" />
          <div>
            <h1 className="text-2xl font-bold mb-4 text-orange-700">
              Tableau de bord
            </h1>
            <p className="text-orange-700">Bienvenue, {user.pseudo} !</p>
          </div>
        </div>
        <Link to="/tasks" className="no-underline mr-4">
          <Button className="mt-4 bg-orange-600 text-white hover:bg-orange-700 cursor-pointer" title="Accéder à mes tâches">
            Mes tâches
          </Button>
        </Link>
      </div>
    </div>
  );
}
