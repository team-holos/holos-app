import Layout from "./Layout/Layout";
import DashboardPage from "./pages/DashboardPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FitnessPage from "./pages/FitnessPage";
import MentalHealthPage from "./pages/MentalHealthPage";
import NutritionPage from "./pages/NutritionPage";
import RelaxationPage from "./pages/RelaxationPage";
import SettingsPage from "./pages/SettingsPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import PWResetPage from "./pages/PWResetPage";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/fitness" element={<FitnessPage />} />
          <Route path="/mentalhealth" element={<MentalHealthPage />} />
          <Route path="/nutrion" element={<NutritionPage />} />
          <Route path="/relaxation" element={<RelaxationPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/reset" element={<PWResetPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
