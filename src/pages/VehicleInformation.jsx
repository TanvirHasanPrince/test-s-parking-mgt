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
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Vehicle Information</h2>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2">Owner Name</th>
            <th className="py-2">Vehicle Type</th>
            <th className="py-2">License No</th>
            <th className="py-2">Entry Time</th>
            <th className="py-2">Exit Time</th>
            <th className="py-2">Status</th>
            <th className="py-2">Edit</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle, index) => (
            <tr key={index}>
              <td className="py-2">{vehicle.ownerName}</td>
              <td className="py-2">{vehicle.vehicleType}</td>
              <td className="py-2">{vehicle.licenseNumber}</td>
              <td className="py-2">
                {new Date(vehicle.entryTime).toLocaleString()}
              </td>
              <td className="py-2">
                {new Date(vehicle.exitTime).toLocaleString()}
              </td>
              <td className="py-2">{vehicle.status}</td>
              <td className="py-2">
                {vehicle.status === "in" && (
                  <button
                    onClick={() => handleEdit(vehicle)}
                    className="bg-blue-500 text-white font-bold py-1 px-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
