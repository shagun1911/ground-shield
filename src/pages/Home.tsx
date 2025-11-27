import React, { useEffect, useState } from "react";
import {
  Battery,
  Zap,
  ThermometerSun,
  Wind,
  Droplets,
  Activity,
  ShieldCheck,
} from "lucide-react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import SensorCard from "../components/SensorCard";
import { SensorData } from "../types";

export default function Home() {
  const [sensorData, setSensorData] = useState<SensorData>({
    voltage: 0,
    current: 0,
    earthContinuity: 0,
    soilTemperature: 0,
    airQuality: 0,
    soilMoisture: 0,
    groundVibrations: 0,
    timestamp: new Date().toISOString(),
  });

  useEffect(() => {
    // Listen to the latest sensor data in real time
    const unsub = onSnapshot(collection(db, "sensors"), (snapshot) => {
      // Assuming only one document for latest data
      const docs = snapshot.docs.map(doc => doc.data());
      if (docs.length > 0) setSensorData(docs[0] as SensorData);
    });
    return () => unsub();
  }, []);

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
          value={sensorData.voltage}
          unit="V"
          icon={Battery}
          color="bg-blue-500"
          type="voltage"
        />
        <SensorCard
          title="Current"
          value={sensorData.current}
          unit="A"
          icon={Zap}
          color="bg-yellow-500"
          type="current"
        />
        <SensorCard
          title="Earth Continuity"
          value={sensorData.earthContinuity}
          unit="Ω"
          icon={Activity}
          color="bg-green-500"
          type="earthContinuity"
        />
        <SensorCard
          title="Soil Temperature"
          value={sensorData.soilTemperature}
          unit="°C"
          icon={ThermometerSun}
          color="bg-red-500"
          type="soilTemperature"
        />
        <SensorCard
          title="Air Quality"
          value={sensorData.airQuality}
          unit="AQI"
          icon={Wind}
          color="bg-purple-500"
          type="airQuality"
        />
        <SensorCard
          title="Soil Moisture"
          value={sensorData.soilMoisture}
          unit="%"
          icon={Droplets}
          color="bg-cyan-500"
          type="soilMoisture"
        />
        <SensorCard
          title="Ground Vibrations"
          value={sensorData.groundVibrations}
          unit="g"
          icon={Activity}
          color="bg-orange-500"
          type="groundVibrations"
        />
      </div>
    </div>
  );
}
