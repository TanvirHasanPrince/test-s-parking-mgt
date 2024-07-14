/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

const VehicleForm = ({ selectedVehicle, onUpdate }) => {
  const [formData, setFormData] = useState({
    licenseNumber: "",
    vehicleType: "",
    ownerName: "",
    ownerPhone: "",
    status: "in",
    ownerAddress: "",
    entryTime: "",
    exitTime: "",
    parkingCharge: 0,
  });

  useEffect(() => {
    if (selectedVehicle) {
      setFormData({
        ...selectedVehicle,
        entryTime: selectedVehicle.entryTime.slice(0, 16),
        exitTime: selectedVehicle.exitTime.slice(0, 16),
      });
    }
  }, [selectedVehicle]);

  const [errors, setErrors] = useState({});

  const vehicleCharges = {
    microbus: 10,
    car: 5,
    truck: 15,
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let updatedFormData = {
      ...formData,
      [name]: value,
    };
    if (name === "vehicleType") {
      updatedFormData.parkingCharge = vehicleCharges[value] || 0;
    }
    setFormData(updatedFormData);
  };

  const validate = () => {
    let errors = {};
    if (!formData.licenseNumber)
      errors.licenseNumber = "License Number is required";
    if (!formData.vehicleType) errors.vehicleType = "Vehicle Type is required";
    if (!formData.ownerName) errors.ownerName = "Owner Name is required";
    if (!formData.ownerAddress)
      errors.ownerAddress = "Owner Address is required";
    if (!formData.ownerPhone)
      errors.ownerPhone = "Owner Phone number is required";
    if (!formData.entryTime) errors.entryTime = "Entry Time is required";
    if (!formData.exitTime) errors.exitTime = "Exit Time is required";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    console.log("Form Data:", formData);
    let vehicles = JSON.parse(localStorage.getItem("vehicles")) || [];
    if (selectedVehicle) {
      vehicles = vehicles.map((vehicle) =>
        vehicle.licenseNumber === selectedVehicle.licenseNumber
          ? formData
          : vehicle
      );
    } else {
      vehicles.push(formData);
    }
    localStorage.setItem("vehicles", JSON.stringify(vehicles));
    if (onUpdate) {
      onUpdate(formData);
    }
    setFormData({
      licenseNumber: "",
      vehicleType: "",
      ownerName: "",
      ownerPhone: "",
      status: "in",
      ownerAddress: "",
      entryTime: "",
      exitTime: "",
      parkingCharge: 0,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 grid grid-cols-2 gap-4"
    >
      <div className="col-span-1 mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Vehicle License Number:
        </label>
        <input
          type="text"
          name="licenseNumber"
          value={formData.licenseNumber}
          onChange={handleInputChange}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.licenseNumber ? "border-red-500" : ""
          }`}
        />
        {errors.licenseNumber && (
          <p className="text-red-500 text-xs italic">{errors.licenseNumber}</p>
        )}
      </div>

      <div className="col-span-1 mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Vehicle Type:
        </label>
        <select
          name="vehicleType"
          value={formData.vehicleType}
          onChange={handleInputChange}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.vehicleType ? "border-red-500" : ""
          }`}
        >
          <option value="">Select Vehicle Type</option>
          <option value="microbus">Microbus</option>
          <option value="car">Car</option>
          <option value="truck">Truck</option>
        </select>
        {errors.vehicleType && (
          <p className="text-red-500 text-xs italic">{errors.vehicleType}</p>
        )}
      </div>

      <div className="col-span-1 mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Vehicle Owner Name:
        </label>
        <input
          type="text"
          name="ownerName"
          value={formData.ownerName}
          onChange={handleInputChange}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.ownerName ? "border-red-500" : ""
          }`}
        />
        {errors.ownerName && (
          <p className="text-red-500 text-xs italic">{errors.ownerName}</p>
        )}
      </div>
      <div className="col-span-1 mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
           Phone number:
        </label>
        <input
          type="text"
          name="ownerPhone"
          value={formData.ownerPhone}
          onChange={handleInputChange}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.ownerPhone ? "border-red-500" : ""
          }`}
        />
        {errors.ownerPhone && (
          <p className="text-red-500 text-xs italic">{errors.ownerPhone}</p>
        )}
      </div>

      <div className="col-span-1 mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Status:
        </label>
        <select
          name="status"
          value={formData.status}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="in">In</option>
          <option value="out">Out</option>
        </select>
      </div>

      <div className="col-span-2 mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Car Owner Address:
        </label>
        <textarea
          name="ownerAddress"
          value={formData.ownerAddress}
          onChange={handleInputChange}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.ownerAddress ? "border-red-500" : ""
          }`}
          rows="3"
        />
        {errors.ownerAddress && (
          <p className="text-red-500 text-xs italic">{errors.ownerAddress}</p>
        )}
      </div>

      <div className="col-span-1 mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Time and Date of Car Entry:
        </label>
        <input
          type="datetime-local"
          name="entryTime"
          value={formData.entryTime}
          onChange={handleInputChange}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.entryTime ? "border-red-500" : ""
          }`}
        />
        {errors.entryTime && (
          <p className="text-red-500 text-xs italic">{errors.entryTime}</p>
        )}
      </div>

      <div className="col-span-1 mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Time and Date of Car Exit:
        </label>
        <input
          type="datetime-local"
          name="exitTime"
          value={formData.exitTime}
          onChange={handleInputChange}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.exitTime ? "border-red-500" : ""
          }`}
        />
        {errors.exitTime && (
          <p className="text-red-500 text-xs italic">{errors.exitTime}</p>
        )}
      </div>

      <div className="col-span-2 mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Parking Charge:
        </label>
        <input
          type="number"
          name="parkingCharge"
          value={formData.parkingCharge}
          readOnly
          className="w-full px-3 py-2 border rounded-lg bg-gray-100"
        />
      </div>

      <button
        type="submit"
        className="col-span-2 bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Submit
      </button>
    </form>
  );
};

export default VehicleForm;
