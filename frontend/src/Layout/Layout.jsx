 import Header from '../components/Header';
 import Footer from '../components/Footer';

function Layout({ children }) {
    return (
        <div className="container min-h-screen bg-[#FFF2F2] font-sans">
            <Header />
            {children}
            <Footer />
        </div>
    );
}

export default Layout;