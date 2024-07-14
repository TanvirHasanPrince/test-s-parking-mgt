import { useState, useEffect } from "react";
import { parseISO, differenceInHours, format, isValid } from "date-fns";
import { capitalizeWords } from "../utils/helperFunction";

const Dashboard = () => {
  const [vehicles, setVehicles] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [stats, setStats] = useState({
    totalParked: 0,
    totalEmpty: 0,
    vehicleTypeInfo: {},
    longParkedVehicles: [],
  });

  useEffect(() => {
    const storedVehicles = localStorage.getItem("vehicles");
    if (storedVehicles) {
      setVehicles(JSON.parse(storedVehicles));
    }
  }, []);

  useEffect(() => {
    calculateStats();
  }, [vehicles, selectedDate]);

  const calculateStats = () => {
    const totalSlots = 100;
    const filteredVehicles = vehicles.filter((vehicle) => {
      const vehicleDate = parseISO(vehicle.entryTime);
      return (
        isValid(vehicleDate) &&
        format(vehicleDate, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
      );
    });

    const totalParked = filteredVehicles.length;
    const totalEmpty = totalSlots - totalParked;

    const vehicleTypeInfo = filteredVehicles.reduce((acc, vehicle) => {
      acc[vehicle.vehicleType] = (acc[vehicle.vehicleType] || 0) + 1;
      return acc;
    }, {});

    const longParkedVehicles = filteredVehicles.filter((vehicle) => {
      const entryTime = parseISO(vehicle.entryTime);
      const exitTime = vehicle.exitTime
        ? parseISO(vehicle.exitTime)
        : new Date();
      return differenceInHours(exitTime, entryTime) > 2;
    });

    setStats({
      totalParked,
      totalEmpty,
      vehicleTypeInfo,
      longParkedVehicles,
    });
  };

  const handleDateChange = (event) => {
    setSelectedDate(new Date(event.target.value));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Select Date:</label>
        <input
          type="date"
          value={format(selectedDate, "yyyy-MM-dd")}
          onChange={handleDateChange}
          className="mt-2 p-2 border rounded"
        />
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="p-4 bg-blue-100 rounded-lg shadow">
          <h3 className="text-lg font-bold">Total Vehicles Parked</h3>
          <p className="text-2xl">{stats.totalParked}</p>
        </div>
        <div className="p-4 bg-green-100 rounded-lg shadow">
          <h3 className="text-lg font-bold">Total Empty Slots</h3>
          <p className="text-2xl">{stats.totalEmpty}</p>
        </div>
      </div>
      <div className="mb-4 p-4 bg-yellow-100 rounded-lg shadow">
        <h3 className="text-lg font-bold mb-2">Number of Each Vehicle Type</h3>
        <ul>
          {Object.entries(stats.vehicleTypeInfo).map(([type, count]) => (
            <li key={type}>
              {capitalizeWords(type)}: {count}
            </li>
          ))}
        </ul>
      </div>
      <div className="p-4 bg-red-100 rounded-lg shadow">
        <h3 className="text-lg font-bold mb-2">
          Vehicles Parked for More Than 2 Hours
        </h3>
        <ul>
          {stats.longParkedVehicles.map((vehicle, index) => (
            <li key={index}>
              {vehicle.licenseNumber} - {vehicle.ownerName} -{" "}
              {vehicle.vehicleType}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
