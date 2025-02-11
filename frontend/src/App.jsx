import Layout from "./layout/Layout";
import DashboardPage from "./pages/DashboardPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";


function App() {
    return (
        
        <Layout>
               <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/login" element={<LoginPage />} />
                  </Routes>
                </BrowserRouter>
        </Layout>
    );
};


export default App;