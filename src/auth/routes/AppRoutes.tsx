import {
  HomePage,
  RegisterPage,
  LoginPage,
  DashboardPage,
  ProfilePage,
  ApplicationPage,
} from "../../pages";
import ProtectedRoute from "./ProtectedRoute";
import { Route, Routes } from "react-router-dom";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/applications" element={<ApplicationPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
