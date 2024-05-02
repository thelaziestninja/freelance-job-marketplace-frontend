import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { BrowserRouter as Router } from "react-router-dom";

const App: React.FC = () => {
  console.log("App component rendered");
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;
