import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout";
import DashboardPage from "./pages/DashboardPage";
import FitnessPage from "./pages/FitnessPage";
import MentalHealthPage from "./pages/MentalHealthPage";
import NutritionPage from "./pages/NutritionPage";
import RelaxationPage from "./pages/RelaxationPage";
import SettingsPage from "./pages/SettingsPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import PWResetPage from "./pages/PWResetPage";
import AIChat from "./components/AIChat";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/fitness" element={<FitnessPage />} />
          <Route path="/mentalhealth" element={<MentalHealthPage />} />
          <Route path="/nutrition" element={<NutritionPage />} />
          <Route path="/relaxation" element={<RelaxationPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/reset" element={<PWResetPage />} />
          <Route path="/chat" element={<AIChat />} />{" "}
          <Route path="*" element={<NotFoundPage />} />{" "}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
