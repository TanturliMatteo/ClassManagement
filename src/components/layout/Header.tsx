import { NavLink } from "react-router";
import logo from "../../assets/react.svg";

const Header = () => {
  return (
    <header className="header">
      <img src={logo} alt="Logo" className="logo" />

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
    </header>
  );
};

export default Header;
