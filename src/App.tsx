import "./App.css";
// import Header from "./components/UI/Header";
import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import ApplicationPage from "./pages/ApplicationPage";
import { AuthProvider } from "./auth/AuthContext";
import { NotificationProvider } from "./context/NotificationProvider";

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Router>
          {/* <Header /> */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/applications" element={<ApplicationPage />} />
          </Routes>
          {/* <Footer /> */}
        </Router>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
