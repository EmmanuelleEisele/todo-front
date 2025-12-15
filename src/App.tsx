import "./App.css";
import "./reset.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import NavBar from "./components/NavBar";
import RegisterPage from "./pages/RegisterPage";
import TasksPage from "./pages/TasksPage";
import Dashboard from "./pages/Dashboard";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { checkTokenValid } from "./types/authApi";
import type { User } from "./types/todoApi";
import Legal from "./pages/Legal";
import NotFoundPage from "./pages/NotFoundPage";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const location = useLocation();

  // Vérifie la validité du token au chargement, sauf sur /login
  useEffect(() => {
    if (location.pathname === "/login") return;
    async function verify() {
      const validUser = await checkTokenValid();
      if (validUser) {
        setIsAuthenticated(true);
        setUser(validUser);
      } else {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem("authToken");
        localStorage.removeItem("currentUser");
      }
    }
    verify();
  }, [location.pathname]);

  const handleLogin = (
    userData: User,
    token: string,
    refreshToken?: string
  ) => {
    localStorage.setItem("authToken", token);
    if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
    
    // Si le pseudo n'est pas dans userData, essayer de le récupérer du localStorage
    if (!userData.pseudo) {
      const savedPseudo = localStorage.getItem("userPseudo");
      if (savedPseudo) {
        userData.pseudo = savedPseudo;
      }
    }
    
    localStorage.setItem("currentUser", JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("currentUser");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-orange-50 via-orange-100 to-amber-100">
        <NavBar
          isAuthenticated={isAuthenticated}
          onLogout={handleLogout}
         
        />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route
            path="/register"
            element={<RegisterPage onLogin={handleLogin} />}
          />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/dashboard" element={<Dashboard user={user} />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </main>
    </>
  );
}

export default App;
