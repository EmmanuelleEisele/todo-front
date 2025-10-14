import "./App.css";
import "./reset.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import NavBar from "./components/NavBar";
import RegisterPage from "./pages/registerPage";

function App() {
  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-orange-50 via-orange-100 to-amber-100">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} /> 
          {/* <Route path="/tasks" element={<TasksPage />} /> */}
          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
      <Footer />
      </main>
    </>
  );
}

export default App;
