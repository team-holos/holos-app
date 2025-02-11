import Layout from "./layout/Layout";
import DashboardPage from "./pages/DashboardPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FitnessPage from "./pages/FitnessPage";
import MentalHealthPage from "./pages/MentalHealthPage";
import NutritionPage from "./pages/NutritionPage";
import RelaxationPage from "./pages/RelaxationPage";
import SettingsPage from "./pages/SettingsPage";


function App() {
    return (
        
        <Layout>
               <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/fitness" element={<FitnessPage />} />
                    <Route path="/mentalhealth" element={<MentalHealthPage />} />
                    <Route path="/nutrition" element={<NutritionPage />} />
                    <Route path="/relaxation" element={<RelaxationPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                  </Routes>
                </BrowserRouter>
        </Layout>
    );
};


export default App;