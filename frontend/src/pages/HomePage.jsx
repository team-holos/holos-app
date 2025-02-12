import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import Users from "../components/Users";
import useAuthStore from "../components/store/authstore";

function HomePage() {
  const { isLoggedIn } = useAuthStore();
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="border p-4 w-xl">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            Willkommen bei Holos
          </h1>
        </div>
        <div className="flex gap-4 justify-between">
          {isLoggedIn() ? <Users /> : <LoginPage />}
          <RegisterPage />
        </div>
      </div>
    </div>
  );
}

export default HomePage;