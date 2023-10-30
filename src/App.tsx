import "./App.css";
// import Header from "./components/UI/Header";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./auth/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";
import { NotificationProvider } from "./context/NotificationProvider";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Router>
          {/* <Header /> */}
          <AppRoutes />
          {/* <Footer /> */}
        </Router>
      </NotificationProvider>
    </AuthProvider>
  );
};

export default App;
