import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative  min-h-screen flex items-center justify-center">
      <div className="relative z-10 text-center p-4">
        <h1 className="text-4xl font-bold md:text-6xl bg-gradient-to-r from-pink-700 via-blue-700 to-green-500 inline-block text-transparent bg-clip-text mb-4">
          Welcome to Parking Management
        </h1>
        <p className="text-lg md:text-2xl text-black mb-8">
          Effortlessly manage and track parking spaces with our app.
        </p>
        <div className="flex space-x-4 justify-center">
          <Link to="/add-vehicle">
            {" "}
            <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
              Get Started
            </button>
          </Link>

          <Link to="vehicle-information">
            <button className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700">
              See Vehicle Information
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
