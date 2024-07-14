import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-500 to-green-500 p-4 text-white flex items-center justify-between">
      <div className="flex items-center">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7Rj5nyCUp5HJezkq4Ih0FhEkPnXygBYQKYQ&s"
          alt="Logo"
          className="h-8 w-8 mr-2 rounded-full"
        />
        <Link to="/" className="font-semibold text-xl">
          Parking Management System
        </Link>
      </div>
      <ul className="flex space-x-4 items-center">
        <li className="transition-transform transform hover:scale-105 hover:text-black">
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li className="transition-transform transform hover:scale-105 hover:text-black">
          <Link to="/vehicle-information">Vehicle Information</Link>
        </li>
        <li className="transition-transform transform hover:scale-105 hover:text-black">
          <Link
            to="/add-vehicle"
            className="bg-white text-blue-500 px-4 py-2 rounded ml-4"
          >
            Add Vehicle
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
