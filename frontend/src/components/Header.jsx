import Navigation from "./Navigation";


function Header() {
  return (
    <header className="bg-[#A9B5DF] flex items-center justify-between m-4 py-4 rounded text-[#FFF2F2]">
      <h1>Holos App</h1>
      <Navigation />  
    </header>
  );
}

export default Header;
