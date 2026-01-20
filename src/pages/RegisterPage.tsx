import { useState } from "react";
import { Eye, EyeOff, RotateCw } from "lucide-react";
import { Flame, Info } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import type { User } from "../types/todoApi";
import axios from "axios";

interface RegisterPageProps {
  onLogin: (userData: User, token: string, refreshToken?: string) => void;
}

export default function RegisterPage({ onLogin }: RegisterPageProps) {
  const navigate = useNavigate();
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);
  
  // États pour le formulaire
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fonction de soumission du formulaire
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Vérifications côté client
    if (!pseudo || !email || !password || !confirmPassword) {
      setError("Veuillez remplir tous les champs");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/register`, { pseudo, email, password, passwordConfirm : confirmPassword });
      localStorage.setItem('userPseudo', pseudo);
      onLogin(response.data.user, response.data.token, response.data.refreshToken);
      navigate("/tasks");

    } catch (err: unknown) {
      if (
        typeof err === "object" &&
        err !== null &&
        "response" in err &&
        typeof (err as { response?: { data?: { message?: string } } }).response === "object"
      ) {
        setError(
          (err as { response?: { data?: { message?: string } } }).response?.data?.message ||
            "Erreur lors de l'inscription"
        );
      } else {
        setError("Erreur lors de l'inscription");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col font-sans items-center justify-center min-h-[calc(100vh-116px)] bg-gradient-to-b from-orange-100 to-orange-300">
      <div className="flex flex-col bg-white py-6 rounded-lg shadow-lg w-fit my-2">
        <div className="flex flex-row justify-center gap-2">
          <Flame className="w-8 h-8 text-orange-600 mb-4" />
          <h2 className="text-2xl font-bold mb-6 text-center text-orange-700">
            Inscription
          </h2>
        </div>
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="mx-4 mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              {error}
            </div>
          )}
          <div className="mb-4 mx-4">
            <label
              htmlFor="pseudo"
              className="block text-orange-700 text-sm font-bold mb-2"
            >
              Pseudo{" "}
              <span className="inline-block w-4 h-4 text-orange-600">*</span>
            </label>
            <input
              className="shadow border-1 border-orange-400 appearance-none rounded-lg w-[14rem] sm:w-[26rem] py-2 px-3 text-gray-700 leading-tight focus:border-orange-700 focus:outline-none"
              id="pseudo"
              type="text"
              placeholder="Pseudo"
              value={pseudo}
              onChange={(e) => setPseudo(e.target.value)}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mx-4">
            <label
              className="block text-orange-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Mot de passe{" "}
              <Info 
                className="inline-block w-4 h-4 text-orange-700 cursor-pointer hover:text-orange-900 transition-colors" 
                onClick={() => setShowPasswordRequirements(!showPasswordRequirements)}
              />
            </label>
            
            {/* Exigences du mot de passe - Affichage conditionnel */}
            {showPasswordRequirements && (
              <div className="mb-3 p-3 bg-orange-50 border border-orange-200 rounded-lg text-xs text-orange-800">
                <p className="font-semibold mb-2">Le mot de passe doit contenir :</p>
                <ul className="space-y-1">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-orange-600 rounded-full"></span>
                    Au moins 8 caractères
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-orange-600 rounded-full"></span>
                    Une lettre majuscule (A-Z)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-orange-600 rounded-full"></span>
                    Une lettre minuscule (a-z)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-orange-600 rounded-full"></span>
                    Un chiffre (0-9)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-orange-600 rounded-full"></span>
                    Un caractère spécial (!@#$%^&*)
                  </li>
                </ul>
              </div>
            )}

            <div className="relative">
              <input
                className="shadow border-1 border-orange-400 appearance-none rounded-lg w-[14rem] sm:w-[26rem] py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:border-orange-700 pr-10"
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="******************"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-2 bottom-4 border-none bg-transparent text-orange-700 hover:text-orange-800"
                tabIndex={-1}
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          <div className=" mx-4 ">
            <label
              className="block text-orange-700 text-sm font-bold mb-2"
              htmlFor="confirm-password"
            >
              Confirmation du mot de passe{" "}
              <span className="inline-block w-4 h-4 text-orange-700">*</span>
            </label>
            <div className="relative">
              <input
                className="shadow border-1 border-orange-400 appearance-none rounded-lg w-[14rem] sm:w-[26rem] py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:border-orange-700 pr-10"
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="******************"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-2 bottom-4 border-none bg-transparent text-orange-700 hover:text-orange-800"
                tabIndex={-1}
                onClick={() => setShowConfirmPassword((v) => !v)}
                aria-label={showConfirmPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
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
          <div className="flex flex-col items-center justify-center">
            <button
              className="bg-orange-700 border-none w- hover:bg-orange-800 text-white font-bold py-2 px-4 rounded "
              type="submit"
            >
              {loading ?  (<p className="text-white">Création du compte<RotateCw size={16} className="text-white animate-spin" /></p>) : "Je m'inscris"}
            </button>
            <p className="text-orange-700 pt-4"> Vous avez déjà un compte ?</p>
            <Link
              className="no-underline font-bold text-sm text-orange-700 hover:underline cursor-pointer"
              to="/login"
            >
              Connectez-vous
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
