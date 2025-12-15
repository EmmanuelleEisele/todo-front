import { useState } from "react";
import { Flame } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import type { User } from "../types/todoApi";
import  apiClient  from "../types/todoApi";

interface LoginPageProps {
  onLogin: (userData: User, token: string, refreshToken?: string) => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    if (!email || !password) {
      setError("Veuillez remplir tous les champs");
      setLoading(false);
      return;
    }

    try {
      const response = await apiClient.post("/auth/login", { email, password });
      localStorage.setItem("refreshToken", response.data.refreshToken);
      // Appelle la prop onLogin pour mettre à jour l'état d'App.tsx
      onLogin(response.data.user, response.data.token, response.data.refreshToken);
      // Redirection vers la page d'accueil après connexion réussie
      navigate("/tasks");
    } catch (error: unknown) {
      let errorMessage = "Email ou mot de passe incorrect";

      // Type guard for axios-like errors
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as {
          response?: { data?: { message?: string; error?: string } };
        };
        errorMessage =
          axiosError.response?.data?.message ||
          axiosError.response?.data?.error ||
          errorMessage;
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col font-sans items-center justify-center min-h-[calc(100vh-116px)] bg-gradient-to-b from-orange-100 to-orange-300">
      <div className="flex flex-col bg-white py-8  rounded-lg shadow-lg w-fit my-2">
        <div className="flex flex-row justify-center gap-2">
          <Flame className="w-8 h-8 text-orange-600 mb-4" />
          <h2 className="text-2xl font-bold mb-6 text-center text-orange-700">
            Connexion
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
              className="block text-orange-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
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
          <div className="mb-6 mx-4">
            <label
              className="block text-orange-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Mot de passe
            </label>
            <input
              className="shadow border-1 border-orange-400 appearance-none rounded-lg w-[14rem] sm:w-[26rem] py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:border-orange-700"
              id="password"
              type="password"
              placeholder="******************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col items-center justify-center mb-4">
            <button
              className="bg-orange-700 border-none hover:bg-orange-800 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
              type="submit"
              disabled={loading}
            >
              {loading ? "Connexion..." : "Se connecter"}
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
