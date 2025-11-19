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
import { useState } from "react";
import type { User } from "./types/todoApi";
import Legal from "./pages/Legal";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => !!localStorage.getItem("authToken")
  );
  const [user, setUser] = useState(() => {
    const userStr = localStorage.getItem("currentUser");
    return userStr ? JSON.parse(userStr) : null;
  });

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
          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
        <Footer />
      </main>
    </>
  );
}

export default App;
