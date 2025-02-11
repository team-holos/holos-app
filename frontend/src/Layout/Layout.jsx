import Header from "../components/Header";
import Footer from "../components/Footer";

function Layout({ children }) {
  return (
    <div className="w-full min-h-screen bg-[#FFF2F2] font-sans">
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default Layout;
