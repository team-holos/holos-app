import Layout from "./layout/Layout";
import DashboardPage from "./pages/DashboardPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";


function App() {
    return (
        
        <Layout>
               <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    
                  </Routes>
                </BrowserRouter>
        </Layout>
    );
};


export default App;