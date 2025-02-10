import Layout from "./layout/Layout";
import DashboardPage from "./pages/DashboardPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
    return (
        
        <Layout>
               <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<DashboardPage />} />
                  </Routes>
                </BrowserRouter>
        </Layout>
    );
};


export default App;