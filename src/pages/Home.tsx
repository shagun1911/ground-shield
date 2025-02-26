import React from "react";
import {
  Battery,
  Zap,
  ThermometerSun,
  Wind,
  Droplets,
  Activity,
  Bell,
  ShieldCheck,
} from "lucide-react";
import SensorCard from "../components/SensorCard";
import { SensorData } from "../types";

const mockSensorData: SensorData = {
  voltage: 220,
  current: 10,
  earthContinuity: 0.5,
  soilTemperature: 25,
  airQuality: 85,
  soilMoisture: 60,
  groundVibrations: 0.2,
  timestamp: new Date().toISOString(),
};

export default function Home() {
  return (
    <div className="space-y-10 p-6">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-[#064E3B] to-[#14B8A6] p-8 rounded-xl shadow-xl text-white overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-[url('/images/safety-bg.jpg')] bg-cover bg-center opacity-20 blur-sm"></div>

        <div className="relative z-10 flex flex-col items-center text-center space-y-6">
          {/* Title */}
          <h1 className="text-5xl font-extrabold tracking-tight flex items-center justify-center space-x-3">
            <ShieldCheck className="w-10 h-10 text-white drop-shadow-md" />
            <span className="drop-shadow-lg">GroundShield</span>
          </h1>

          {/* Description */}
          <p className="text-lg max-w-3xl mx-auto leading-relaxed">
            A smart earthing safety system designed to monitor electrical
            parameters and environmental conditions in real-time. GroundShield
            ensures electrical safety, fault detection, and optimized grounding
            for a secure infrastructure.
          </p>

          {/* Live Monitoring Indicator */}
          <div className="flex items-center space-x-3 bg-white bg-opacity-20 px-4 py-2 rounded-full shadow-md backdrop-blur-md">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-md font-medium text-white">
              Live Monitoring Active
            </span>
          </div>
        </div>
      </div>

      {/* Sensor Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <SensorCard
          title="Voltage"
          value={mockSensorData.voltage}
          unit="V"
          icon={Battery}
          color="bg-blue-500"
          type="voltage"
        />
        <SensorCard
          title="Current"
          value={mockSensorData.current}
          unit="A"
          icon={Zap}
          color="bg-yellow-500"
          type="current"
        />
        <SensorCard
          title="Earth Continuity"
          value={mockSensorData.earthContinuity}
          unit="Ω"
          icon={Activity}
          color="bg-green-500"
          type="earthContinuity"
        />
        <SensorCard
          title="Soil Temperature"
          value={mockSensorData.soilTemperature}
          unit="°C"
          icon={ThermometerSun}
          color="bg-red-500"
          type="soilTemperature"
        />
        <SensorCard
          title="Air Quality"
          value={mockSensorData.airQuality}
          unit="AQI"
          icon={Wind}
          color="bg-purple-500"
          type="airQuality"
        />
        <SensorCard
          title="Soil Moisture"
          value={mockSensorData.soilMoisture}
          unit="%"
          icon={Droplets}
          color="bg-cyan-500"
          type="soilMoisture"
        />
        <SensorCard
          title="Ground Vibrations"
          value={mockSensorData.groundVibrations}
          unit="g"
          icon={Activity}
          color="bg-orange-500"
          type="groundVibrations"
        />
      </div>
    </div>
  );
}
