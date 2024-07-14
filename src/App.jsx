import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/shared/Navbar";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-gray-200">
      <Navbar />
      <div className="container mx-auto p-4">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
