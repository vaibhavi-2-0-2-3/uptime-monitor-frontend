import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between">
      <Link to="/" className="font-bold text-xl text-indigo-600">
        UptimeMonitor
      </Link>
      <div className="space-x-4">
        <Link to="/login" className="text-gray-600 hover:text-indigo-600">
          Login
        </Link>
        <Link to="/register" className="text-gray-600 hover:text-indigo-600">
          Register
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;