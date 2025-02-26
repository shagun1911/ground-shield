import React from 'react';
import { Battery, Zap, ThermometerSun, Wind, Droplets, Activity, Bell } from 'lucide-react';
import { SensorData } from '../types';

const mockSensorData: SensorData = {
  voltage: 220,
  current: 10,
  earthContinuity: 0.5,
  soilTemperature: 25,
  airQuality: 85,
  soilMoisture: 60,
  groundVibrations: 0.2,
  timestamp: new Date().toISOString()
};

const SensorCard = ({ 
  title, 
  value, 
  unit, 
  icon: Icon,
  color
}: { 
  title: string; 
  value: number; 
  unit: string; 
  icon: React.ElementType;
  color: string;
}) => (
  <div className="bg-white rounded-lg shadow-lg p-6 flex items-center space-x-4">
    <div className={`p-3 rounded-full ${color}`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <div>
      <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
      <p className="text-2xl font-semibold">
        {value} <span className="text-sm text-gray-500">{unit}</span>
      </p>
    </div>
  </div>
);

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Sensor Dashboard</h2>
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
            <Bell className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">Live</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <SensorCard
          title="Voltage"
          value={mockSensorData.voltage}
          unit="V"
          icon={Battery}
          color="bg-blue-500"
        />
        <SensorCard
          title="Current"
          value={mockSensorData.current}
          unit="A"
          icon={Zap}
          color="bg-yellow-500"
        />
        <SensorCard
          title="Earth Continuity"
          value={mockSensorData.earthContinuity}
          unit="Ω"
          icon={Activity}
          color="bg-green-500"
        />
        <SensorCard
          title="Soil Temperature"
          value={mockSensorData.soilTemperature}
          unit="°C"
          icon={ThermometerSun}
          color="bg-red-500"
        />
        <SensorCard
          title="Air Quality"
          value={mockSensorData.airQuality}
          unit="AQI"
          icon={Wind}
          color="bg-purple-500"
        />
        <SensorCard
          title="Soil Moisture"
          value={mockSensorData.soilMoisture}
          unit="%"
          icon={Droplets}
          color="bg-cyan-500"
        />
        <SensorCard
          title="Ground Vibrations"
          value={mockSensorData.groundVibrations}
          unit="g"
          icon={Activity}
          color="bg-orange-500"
        />
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Recent Alerts</h3>
        <div className="space-y-4">
          <div className="flex items-center p-4 bg-red-50 rounded-lg">
            <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
            <div>
              <p className="text-sm font-medium text-red-800">High Ground Vibration Detected</p>
              <p className="text-xs text-red-600">2 minutes ago</p>
            </div>
          </div>
          <div className="flex items-center p-4 bg-yellow-50 rounded-lg">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
            <div>
              <p className="text-sm font-medium text-yellow-800">Soil Moisture Below Threshold</p>
              <p className="text-xs text-yellow-600">15 minutes ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}