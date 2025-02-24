import Header from "../components/Header";
import Footer from "../components/Footer";
import AIChat from "../components/AIChat";
import { useState } from "react";

function Layout({ children }) {
  const [isHoliOpen, setIsHoliOpen] = useState(false);

  return (
    <div className="w-full min-h-screen bg-[#FFF2F2] font-sans relative">
      <Header />

      <div className="relative">{children}</div>

      <button
        className="fixed bottom-20 right-6 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600 transition"
        onClick={() => setIsHoliOpen(!isHoliOpen)}
      >
        💬 Holi
      </button>

      {isHoliOpen && (
        <div className="fixed bottom-24 right-6 bg-white p-4 rounded-lg shadow-lg w-80 max-h-[80vh] overflow-y-auto border">
          <AIChat />
          <button
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            onClick={() => setIsHoliOpen(false)}
          >
            ✖
          </button>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Layout;
