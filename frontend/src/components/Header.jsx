import Navigation from "./Navigation";


function Header() {
  return (
    <header className="bg-[#7886C7] flex items-center justify-between py-4 mx-4 rounded">
      <h1 className="text-[#FFF2F2]">Holos App</h1>
      <Navigation />  
    </header>
  );
}

export default Header;
