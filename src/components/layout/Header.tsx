import { Link } from "react-router";
import logo from "../../assets/react.svg";

const Header = () => {
  return (
    <header className="header">
      <img src={logo} alt="Logo" className="logo" />
      <Link to="/">Home</Link>
      <Link to="/students">Students</Link>
      <Link to="/classes">Classes</Link>
      <Link to="/lessons">Lessons</Link>
      <Link to="/teachers">Teachers</Link>
    </header>
  );
};

export default Header;
