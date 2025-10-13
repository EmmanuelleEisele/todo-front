import { Zap } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import {motion} from "framer-motion";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="font-sans text-center min-h-[calc(100vh-68px)] max-w-6xl sm:mx-auto mx-2 xs:mx-0 py-2">
      <motion.div
        className="div"
        initial={{ y: -5, opacity: 0 }}
        animate={{ y: 5, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 1 }}
      >
        <Zap
          size={40}
          className="text-orange-900 hover:scale-110 transition-transform duration-200 animate-pulse"
        />
      </motion.div>
      <h1 className="font-bold text-4xl text-orange-800 mb-4"> To-Doom </h1>
      <div className="shadow-xl bg-orange-300/70 rounded-2xl p-4 sm:p-8 w-fit mx-auto">
        <p className="text-lg mb-2 px-2 sm:px-0 font-semibold">
          To-Doom est une application de gestion de tâches pour éviter la
          procrastination 😏
        </p>
        <p className="text-lg mb-2 px-2 sm:px-0 font-semibold ">
          On veut que vous soyez fière de tout ce que vous avez accompli 😎
        </p>
        <p className="p-2 sm:p-0">
          Pour accéder aux fonctionnalités, il faut vous connecter ou vous
          inscrire.{" "}
        </p>
        <p className="pt-2">Et oui encore une tâche à accomplir !</p>

        <div className="flex justify-center gap-4 p-2 sm:p-8">
          <Link
            to="/login"
            className="bg-orange-700 text-white font-semibold py-2 px-4 rounded-lg no-underline hover:scale-110 ease-in-out duration-200"
          >
            Se connecter
          </Link>
          <Link
            to="/register"
            className="bg-orange-700 text-white font-semibold py-2 px-4 rounded-lg no-underline hover:scale-110 ease-in-out duration-200"
          >
            S'inscrire
          </Link>
        </div>
      </div>

        <h2 className="font-bold text-3xl py-4 text-orange-900">
          Fonctionnalités
        </h2>
      <div className="flex flex-col w-fit mx-auto rounded-2xl  ">
        <ul className="text-left">
          <li className="mb-2 p-2 text-lg bg-orange-300/70 rounded-lg hover:scale-105 ease-in-out duration-200">
            Créer, modifier et supprimer des tâches
          </li>
          <li className="mb-2 p-2 text-lg bg-orange-300/70 rounded-lg hover:scale-105 ease-in-out duration-200">
            Marquer les tâches comme terminées
          </li>
          <li className="mb-2 p-2 text-lg bg-orange-300/70 rounded-lg hover:scale-105 ease-in-out duration-200">
            Filtrer les tâches par statut
          </li>
          <li className="mb-2 p-2 text-lg bg-orange-300/70 rounded-lg hover:scale-105 ease-in-out duration-200">
            Définir des échéances pour les tâches
          </li>
        </ul>
      </div>
      <p className="pt-2 text-lg font-semibold">C'est simple, intuitif et efficace !</p>
    </div>
  );
} 