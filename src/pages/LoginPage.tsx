import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="flex flex-col font-sans items-center justify-center min-h-screen bg-gradient-to-b from-orange-100 to-orange-300">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-orange-800">
          Se connecter
        </h2>
        <form>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Mot de passe{" "}
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            <button
              className="bg-orange-700 hover:bg-orange-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Se connecter
            </button>
            <Link
              className="inline-block align-baseline font-bold text-sm text-orange-700 hover:text-orange-800"
              to="/register"
            >
              S'inscrire
            </Link>
          </div>
          <div className="text-center">
            <Link
              className="inline-block align-baseline font-bold text-xs text-gray-600 hover:text-orange-800"
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
