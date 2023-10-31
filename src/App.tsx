import "./App.css";
// import Header from "./components/UI/Header";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./auth/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";
import { NotificationProvider } from "./context/notification/NotificationContext";
import { UserProvider } from "./context/user/UserContext";

const App: React.FC = () => {
  return (
    <UserProvider>
      <AuthProvider>
        <NotificationProvider>
          <Router>
            <AppRoutes />
          </Router>
        </NotificationProvider>
      </AuthProvider>
    </UserProvider>
  );
};

export default App;
