import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AIChat from "../components/AIChat";

function Layout({ children }) {
  const [showHoli, setShowHoli] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is authenticated
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#FFF2F2] font-sans">
      <Header />
      {children}
      <Footer />

      {/* Show Holi button only if logged in */}
      {isAuthenticated && (
        <>
          <button
            className="fixed bottom-8 right-8 bg-blue-500 text-white p-3 rounded-full shadow-md"
            onClick={() => setShowHoli(!showHoli)}
          >
            💬
          </button>

          {showHoli && <AIChat onClose={() => setShowHoli(false)} />}
        </>
      )}
    </div>
  );
}

export default Layout;

