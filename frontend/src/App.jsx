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
import PWResetPage from "./pages/PWResetPage";
import LoginPage from "./pages/LoginPage";
import WorkoutTracker from "./pages/WorkoutTracker";
import AIChat from "./components/AIChat";
import NotFoundPage from "./pages/NotFoundPage";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<LoginPage />} />n
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/reset" element={<PWResetPage />} />
          <Route path="*" element={<NotFoundPage />} />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/fitness"
            element={
              <PrivateRoute>
                <FitnessPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/mentalhealth"
            element={
              <PrivateRoute>
                <MentalHealthPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/workout"
            element={
              <PrivateRoute>
                <WorkoutTracker />
              </PrivateRoute>
            }
          />
          <Route
            path="/nutrition"
            element={
              <PrivateRoute>
                <NutritionPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/relaxation"
            element={
              <PrivateRoute>
                <RelaxationPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <SettingsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/chat"
            element={
              <PrivateRoute>
                <AIChat />
              </PrivateRoute>
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
