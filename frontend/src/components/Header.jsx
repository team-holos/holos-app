import { useLocation } from "react-router-dom";
import Navigation from "./Navigation";
import useAuthStore from "./store/authstore";
import Logout from "./Logout";

function Header() {
  const { isLoggedIn } = useAuthStore();
  const location = useLocation();
  const hideLogout = location.pathname === "/" || location.pathname === "/register" || location.pathname === "/";
  const hideNavigation = location.pathname === "/register" || location.pathname === "/";

  return (
    <header className="bg-[#7886C7] flex w-full items-center justify-between border-l-0 border-r-0">
      <h1 className="text-[#FFF2F2] py-4 mx-4">Holos App</h1>
      <div className="flex items-center space-x-4">
        {isLoggedIn && !hideNavigation && <Navigation />}
        {isLoggedIn && !hideLogout && <Logout />}
      </div>
    </header>
  );
}

export default Header;

