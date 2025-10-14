import { CheckCircle2, Flame, Shield, Zap } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="font-sans text-center min-h-[calc(100vh-132px)] max-w-6xl sm:mx-auto mx-2 xs:mx-0 py-2 ">
      <motion.div
        className="div mb-2 mt-4"
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0.8 }}
      >
        <Flame
          className="w-20 h-20 text-orange-600 hover:scale-110 transition-transform duration-200 animate-pulse"
        />
      </motion.div>
      <h1 className="font-bold text-4xl text-orange-700 mb-4"> To-Doom </h1>
      <div className="pb-4 sm:p-6 max-w-2xl mx-auto">
        <p className="text-lg text-orange-700 mb-2 px-2 sm:px-0 font-semibold">
          Gérez vos tâches avant la fin du monde. 
        </p>
        <p className=" text-orange-700 mb-2 px-2 sm:px-0 ">
          Une application de to-do liste simple, rapide et efficace pour rester productif jusqu'au dernier moment.
        </p>

        <div className="flex justify-center gap-4 p-2 sm:p-4">
          <Link
            to="/register"
            className="bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg no-underline hover:bg-orange-800 hover:scale-110 ease-in-out duration-200"
          >
            Commencer gratuitement
          </Link>
          <Link
            to="/login"
            className="border border-orange-600 text-orange-600 bg-white font-semibold py-3 px-4 rounded-lg no-underline hover:scale-110 ease-in-out duration-200"
          >
            Se connecter
          </Link>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-8 mx-auto rounded-2xl leading-snug max-w-4xl">
        <article className="bg-white rounded-2xl p-8 border border-orange-300">
          <CheckCircle2 size={40} className="text-orange-600 mb-2 mx-auto" />
          <h2 className="text-orange-900 py-2">Simple & Efficace</h2>
          <p className="text-orange-700">Ajoutez, completez et supprimez vos tâches en un clin d'œil.</p>
        </article>
        <article className="bg-white rounded-2xl p-8 border border-orange-300">
          <Zap size={40} className="text-orange-600 mb-2 mx-auto" />
          <h2 className="text-orange-900 py-2">Ultra Rapide</h2>
          <p className="text-orange-700">Interface fluide et réactive pour une productivité maximale</p>
        </article>
        <article className="bg-white rounded-2xl p-8 border border-orange-300">
          <Shield size={40} className="text-orange-600 mb-2 mx-auto" />
          <h2 className="text-orange-900 py-2">Vos données sauvegardées</h2>
          <p className="text-orange-700">Vos tâches sont stockées localement et sécurisées</p>
        </article>
      </div>
      <h2 className="py-6 text-lg font-semibold text-orange-700">
        C'est simple, intuitif et efficace !
      </h2>
    </div>
  );
}
