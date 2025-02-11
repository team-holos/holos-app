import AIChat from "./components/AIChat";
import Layout from "./layout/Layout";
import DashboardPage from "./pages/DashboardPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/chat" element={<AIChat />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
