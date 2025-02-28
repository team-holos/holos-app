import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Navigation() {
  const navigate = useNavigate();
  const handleNavigation = (event) => {
    navigate(event.target.value);
  };
  return (
    <div>
      <form className="flex items-center text-[#FFF2F2]">
        <label htmlFor="shortcuts" className="inline-block">
          <Menu />
        </label>
        <select id="uebersicht" name="uebersicht" onChange={handleNavigation} className="bg-[#7886C7]">
          <option value="">Select a page...</option>
          <option value="/dashboard" className="inline-block">
            Dashboard
          </option>
          <option value="/nutrition">Ernährung</option>
          <option value="/fitness">Fitness</option>
          <option value="/mentalhealth">Mentale Gesundheit</option>
          <option value="/relaxation">Entspannung</option>
          <option value="/settings">Einstellungen</option>
        </select>
      </form>
    </div>
  );
}

export default Navigation;
