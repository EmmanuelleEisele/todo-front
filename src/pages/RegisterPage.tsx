import { Flame, Info } from "lucide-react";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  return (
    <div className="flex flex-col font-sans items-center justify-center min-h-screen bg-gradient-to-b from-orange-100 to-orange-300">
      <div className="flex flex-col bg-white py-8 rounded-lg shadow-lg w-fit my-2">
        <div className="flex flex-row justify-center gap-2">
          <Flame className="w-8 h-8 text-orange-600 mb-4" />
          <h2 className="text-2xl font-bold mb-6 text-center text-orange-700">
            Inscription
          </h2>
        </div>
        <form>
          <div className="mb-4 mx-4">
            <label
              htmlFor="firstName"
              className="block text-orange-700 text-sm font-bold mb-2"
            >
              Pseudo{" "}
              <span className="inline-block w-4 h-4 text-orange-600">*</span>
            </label>
            <input
              className="shadow border-1 border-orange-400 appearance-none rounded-lg w-[14rem] sm:w-[26rem] py-2 px-3 text-gray-700 leading-tight focus:border-orange-700 focus:outline-none"
              id="firstName"
              type="text"
              placeholder="Pseudo"
              required
            />
          </div>

          <div className="mb-4 mx-4">
            <label
              className="block text-orange-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email{" "}
              <span className="inline-block w-4 h-4 text-orange-600">*</span>
            </label>
            <input
              className="shadow border-1 border-orange-400 appearance-none rounded-lg w-[14rem] sm:w-[26rem] py-2 px-3 text-gray-700 leading-tight focus:border-orange-700 focus:outline-none"
              id="email"
              type="email"
              placeholder="Email"
              required
            />
          </div>
          <div className=" mx-4 ">
            <label
              className="block text-orange-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Mot de passe{" "}
              <Info className="inline-block w-4 h-4 text-orange-700" />
            </label>
            <input
              className="shadow border-1 border-orange-400 appearance-none rounded-lg w-[14rem] sm:w-[26rem] py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:border-orange-700"
              id="password"
              type="password"
              placeholder="******************"
              required
            />
          </div>
          <div className=" mx-4 ">
            <label
              className="block text-orange-700 text-sm font-bold mb-2"
              htmlFor="confirm-password"
            >
              Confirmation du mot de passe{" "}
              <span className="inline-block w-4 h-4 text-orange-700">*</span>
            </label>
            <input
              className="shadow border-1 border-orange-400 appearance-none rounded-lg w-[14rem] sm:w-[26rem] py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:border-orange-700"
              id="confirm-password"
              type="password"
              placeholder="******************"
              required
            />
          </div>
          <div className="flex justify-left mb-4 px-4">
            <input
              id="terms"
              type="checkbox"
              className="mr-2 leading-tight"
              required
            />
            <label htmlFor="terms" className="text-sm text-orange-700">
              J'accepte les termes et conditions {" "} <span className="text-orange-600">*</span>
            </label>
          </div>
          <p className="text-orange-700 text-xs mb-4 px-4">
            * Informations requises
          </p>
          <div className="flex flex-col items-center justify-center mb-4">
            <button
              className="bg-orange-700 border-none w- hover:bg-orange-800 text-white font-bold py-2 px-4 rounded "
              type="button"
            >
              S'inscrire
            </button>
            <p className="text-orange-700 pt-2"> Pas encore de compte ? </p>
            <Link
              className="no-underline font-bold text-sm text-orange-700 hover:underline cursor-pointer"
              to="/register"
            >
              Créer un compte
            </Link>
          </div>
          <div className="text-center">
            <Link
              className=" font-semibold text-xs text-gray-600 hover:text-orange-800"
              to="/forgot-password"
            >
              Mot de passe oublié ?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
