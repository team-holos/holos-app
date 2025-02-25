import Navigation from "./Navigation";
import useAuthStore from "./store/authstore";
import Logout from "./Logout";
function Header() {
  const {isLoggedIn} = useAuthStore();
  return (
    <header className="bg-[#7886C7] flex w-full items-center justify-between rounded">
      <h1 className="text-[#FFF2F2] py-4 mx-4">Holos App</h1>
      
      <div className="flex items-center space-x-4">
        {isLoggedIn && <Navigation />}
        {isLoggedIn && <Logout />}
      </div>
    </header>
  );
}

export default Header;

