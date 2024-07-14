import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import VehicleInformation from "./pages/VehicleInformation";
import VehicleForm from "./components/forms/VehicleForm";
import Dashboard from "./pages/Dashboard";
import HeroSection from "./components/pageComponent/HeroSection";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "add-vehicle",
        element: <VehicleForm />,
      },
      {
        path: "vehicle-information",
        element: <VehicleInformation />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "/",
        element: <HeroSection />,
      },
    ],
  },
]);

export default router;
