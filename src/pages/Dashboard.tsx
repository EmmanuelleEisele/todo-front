import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import { CheckCircle2, Clock, Flame, ListTodo, TrendingUp } from "lucide-react";
import type { User } from "../types/todoApi";
import ChartComponent from "../components/chart";

export default function Dashboard({ user }: { user?: User | null }) {
  if (!user) {
    return (
      <div className="flex flex-col font-sans items-center justify-center min-h-[calc(100vh-116px)]">
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
    <div className="font-sans min-h-[calc(100vh-116px)] max-w-6xl mx-auto">
      <header className="flex flex-col sm:flex-row items-center sm:justify-between sm:items-center">
        <div className="p-4 mt-8 font-sans flex flex-row gap-2 items-center">
          <Flame className="w-12 h-12 text-orange-600" />
          <div>
            <h1 className="text-2xl font-bold mb-4 text-orange-700">
              Tableau de bord
            </h1>
            <p className="text-orange-700">Bienvenue, {user.pseudo} !</p>
          </div>
        </div>
        <Link to="/tasks" className="no-underline mr-4 ">
          <Button
            variant="light"
            className="flex items-center font-sans gap-2 mt-4"
            title="Accéder à mes tâches"
          >
            <ListTodo size={15} /> Mes tâches
          </Button>
        </Link>
      </header>
      <section className="p-4 font-sans">
        <h2 className="text-xl font-semibold mb-4 text-orange-700">
          Vos statistiques
        </h2>
        <section id="cards" className="mt-8 flex flex-col sm:flex-row gap-6 justify-center ">
          <div className=" w-auto sm:w-1/4 bg-white border-2 border-orange-300 rounded-2xl p-6 flex flex-col items-center sm:items-start gap-2 sm:gap-6">
            <h1 className="flex gap-2 text-orange-800 font-bold"><ListTodo size={18} />Total</h1>
            <p className="text-2xl font-bold text-orange-700">15</p>
            <p className="text-orange-700">Tâches</p>
          </div>
          <div className="w-auto sm:w-1/4 bg-white border-2 border-orange-300 rounded-2xl p-6 flex flex-col items-center sm:items-start gap-2 sm:gap-6">
            <h1 className="flex gap-2 text-orange-800 font-bold"><Clock size={18} />En cours</h1>
            <p className="text-2xl font-bold text-orange-700">7</p>
            <p className="text-orange-700">Tâches en cours</p>
          </div>
          <div className="w-auto sm:w-1/4 bg-white border-2 border-orange-300 rounded-2xl p-6 flex flex-col items-center sm:items-start gap-2 sm:gap-6">
            <h1 className="flex gap-2 text-orange-800 font-bold"><CheckCircle2 size={18} />Terminées</h1>
            <p className="text-2xl font-bold text-orange-700">8</p>
            <p className="text-orange-700">Tâches complétées</p>
          </div>
          <div className="w-auto sm:w-1/4 bg-white border-2 border-orange-300 rounded-2xl p-6 flex flex-col items-center sm:items-start gap-2 sm:gap-6">
            <h1 className="flex gap-2 text-orange-800 font-bold"><TrendingUp size={18} />Taux</h1>
            <p className="text-2xl font-bold text-orange-700">75%</p>
            <p className="text-orange-700">de réalisation</p>
          </div>
        </section>
        <section id="stats" className="mt-8 font-sans">
          <ChartComponent />
        </section>
      </section>
    </div>
  );
}
