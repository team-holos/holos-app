import Navigation from "./Navigation";

function Header() {
  return (
    <header className="bg-[#7886C7] flex w-full items-center justify-between rounded">
      <h1 className="text-[#FFF2F2] py-4 mx-4">Holos App</h1>
      <div className="pr-4">
        <Navigation />
      </div>
    </header>
  );
}

export default Header;
