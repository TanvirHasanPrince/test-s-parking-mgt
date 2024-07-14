import { useState, useEffect } from "react";
import VehicleForm from "../components/forms/VehicleForm";
import Modal from "../components/ui/Modal";

const VehicleInformation = () => {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  useEffect(() => {
    const storedVehicles = localStorage.getItem("vehicles");
    if (storedVehicles) {
      const parsedVehicles = JSON.parse(storedVehicles).map((vehicle) => ({
        ...vehicle,
        entryTime: new Date(vehicle.entryTime).toISOString(),
        exitTime: new Date(vehicle.exitTime).toISOString(),
      }));
      setVehicles(parsedVehicles);
    }
  }, []);

  const handleEdit = (vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const handleUpdate = (updatedVehicle) => {
    const updatedVehicles = vehicles.map((vehicle) =>
      vehicle.licenseNumber === updatedVehicle.licenseNumber
        ? {
            ...updatedVehicle,
            entryTime: new Date(updatedVehicle.entryTime).toISOString(),
            exitTime: new Date(updatedVehicle.exitTime).toISOString(),
          }
        : vehicle
    );
    setVehicles(updatedVehicles);
    localStorage.setItem("vehicles", JSON.stringify(updatedVehicles));
    setSelectedVehicle(null);
  };

  const handleCloseModal = () => {
    setSelectedVehicle(null);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Vehicle Information
      </h2>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Owner Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vehicle Type
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                License No
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Entry Time
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Exit Time
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {vehicles.map((vehicle, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-nowrap">
                  {vehicle.ownerName}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  {vehicle.vehicleType}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  {vehicle.licenseNumber}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  {new Date(vehicle.entryTime).toLocaleString()}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  {new Date(vehicle.exitTime).toLocaleString()}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      vehicle.status === "in"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {vehicle.status}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                  {vehicle.status === "in" && (
                    <button
                      onClick={() => handleEdit(vehicle)}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedVehicle && (
        <Modal onClose={handleCloseModal}>
          <VehicleForm
            selectedVehicle={selectedVehicle}
            onUpdate={handleUpdate}
          />
        </Modal>
      )}
    </div>
  );
};

export default VehicleInformation;
