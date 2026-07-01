import { NavLink } from "react-router";
import { supabase } from "../../services/supabase";

const Header = () => {
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Errore durante il logout:", error.message);
    }
  };

  return (
    <header className="header">
      <NavLink to="/" end className="nav-link">
        Home
      </NavLink>

      <NavLink to="/students" className="nav-link">
        Students
      </NavLink>
      <NavLink to="/classes" className="nav-link">
        Classes
      </NavLink>
      <NavLink to="/lessons" className="nav-link">
        Lessons
      </NavLink>
      <NavLink to="/teachers" className="nav-link">
        Teachers
      </NavLink>
      <div>
        <button type="button" onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
