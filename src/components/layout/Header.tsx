import { Link } from "react-router";

const Header = () => {
  return (
    <header className="header">
      <Link to="/">Home</Link>
      <Link to="/students">Students</Link>
    </header>
  );
};

export default Header;
