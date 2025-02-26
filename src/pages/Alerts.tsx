import React, { useState } from "react";
import { AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { Alert } from "../types";

const mockAlerts: Alert[] = [
  { id: "1", type: "groundVibrations", message: "High Ground Vibration Detected", severity: "high", timestamp: new Date(Date.now() - 120000).toISOString(), acknowledged: false },
  { id: "2", type: "soilMoisture", message: "Soil Moisture Below Threshold", severity: "medium", timestamp: new Date(Date.now() - 900000).toISOString(), acknowledged: false },
  { id: "3", type: "voltage", message: "Voltage Fluctuation Detected", severity: "low", timestamp: new Date(Date.now() - 3600000).toISOString(), acknowledged: true },
];

const severityStyles = {
  high: "bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200",
  medium: "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200",
  low: "bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200",
};

function formatTimeAgo(timestamp: string) {
  const seconds = Math.floor((Date.now() - new Date(timestamp).getTime()) / 1000);
  if (seconds < 60) return `${seconds} seconds ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  return `${Math.floor(seconds / 86400)} days ago`;
}

export default function Alerts() {
  const [alerts, setAlerts] = useState(mockAlerts);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);

  const acknowledgeAlert = (id: string) => {
    setAlerts((prevAlerts) => prevAlerts.map((alert) => alert.id === id ? { ...alert, acknowledged: true } : alert));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Alerts & Notifications</h2>
        <div className="flex space-x-2">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200">
            <AlertTriangle className="w-4 h-4 mr-1" />
            {alerts.filter((a) => !a.acknowledged).length} Active
          </span>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {alerts.map((alert) => (
            <div key={alert.id} className={`p-4 transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 ${alert.acknowledged ? "opacity-75" : ""}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${severityStyles[alert.severity]}`}>
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{alert.message}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">{formatTimeAgo(alert.timestamp)}</span>
                    </div>
                  </div>
                </div>
                {alert.acknowledged ? (
                  <span className="flex items-center text-green-600 dark:text-green-400">
                    <CheckCircle className="w-5 h-5 mr-1" />
                    Acknowledged
                  </span>
                ) : (
                  <button onClick={() => acknowledgeAlert(alert.id)} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200">
                    Acknowledge
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Alert Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Email Notifications</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">Receive alerts via email</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={emailNotifications} onChange={() => setEmailNotifications(!emailNotifications)} />
              <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
            </label>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Push Notifications</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">Receive alerts on your device</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={pushNotifications} onChange={() => setPushNotifications(!pushNotifications)} />
              <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
