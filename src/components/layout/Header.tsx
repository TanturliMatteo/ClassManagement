import { useState } from "react";
import { NavLink } from "react-router";
import { supabase } from "../../services/supabase";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Errore durante il logout:", error.message);
    }
  };

  return (
    <header className="header">
      <div className="header-mobile-bar">
        <button
          type="button"
          className="hamburger-btn"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      <nav
        className={`nav-menu ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(false)}
      >
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
      </nav>
    </header>
  );
};

export default Header;
