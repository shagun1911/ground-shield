import React, { useState, useEffect } from "react";
import { AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { Alert } from "../types";
import { collection, onSnapshot, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

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
  const [alerts, setAlerts] = useState<Alert[]>([]);
  // Remove emailNotifications and pushNotifications toggles since backend handles SMS

  useEffect(() => {
    // Listen to alerts in real time
    const unsub = onSnapshot(collection(db, "alerts"), (snapshot) => {
      setAlerts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Alert));
    });
    return () => unsub();
  }, []);

  const acknowledgeAlert = async (id: string) => {
    await updateDoc(doc(db, "alerts", id), { acknowledged: true });
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
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Mobile Notifications</h3>
        <div className="text-gray-600 dark:text-gray-300">
          You will receive real-time SMS notifications on your registered mobile number whenever a new alert is created.
        </div>
      </div>
    </div>
  );
}
