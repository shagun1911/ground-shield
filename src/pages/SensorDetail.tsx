import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';
import { AlertTriangle, ThumbsUp, Info, ArrowLeft, Activity, AlertCircle } from 'lucide-react';
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { sensorInfo } from '../data/sensorInfo';

export default function SensorDetail() {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const info = type ? sensorInfo[type] : null;
  const [historicalData, setHistoricalData] = useState<any[]>([]);

  useEffect(() => {
    if (!type) return;
    // Listen to historical sensor data for this type
    const q = query(collection(db, `sensorHistory_${type}`), orderBy("timestamp", "desc"), limit(24));
    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => doc.data());
      setHistoricalData(data.reverse()); // reverse for chronological order
    });
    return () => unsub();
  }, [type]);

  if (!info) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Sensor Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">The requested sensor information is not available.</p>
        <button
          onClick={() => navigate('/')}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate('/')}
          className="mr-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        </button>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{info.title}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Info className="w-5 h-5 text-blue-500" />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Significance</h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300">{info.significance}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <ThumbsUp className="w-5 h-5 text-green-500" />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Normal Range</h3>
          </div>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">{info.normalRange}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Optimal operating conditions</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Critical Threshold</h3>
          </div>
          <p className="text-2xl font-bold text-red-600 dark:text-red-400">{info.criticalThreshold}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Requires immediate attention</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Real-time Monitoring</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={historicalData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={`rgb(59, 130, 246)`} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={`rgb(59, 130, 246)`} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#3b82f6" 
                fillOpacity={1} 
                fill="url(#colorValue)" 
              />
              <Line 
                type="monotone" 
                dataKey="threshold" 
                stroke="#ef4444" 
                strokeDasharray="5 5" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Potential Issues</h3>
          <div className="space-y-3">
            {info.potentialIssues.map((issue, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  <AlertTriangle className="w-5 h-5 text-yellow-500" />
                </div>
                <p className="text-gray-600 dark:text-gray-300">{issue}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Recommendations</h3>
          <div className="space-y-3">
            {info.recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  <Activity className="w-5 h-5 text-blue-500" />
                </div>
                <p className="text-gray-600 dark:text-gray-300">{recommendation}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Safety Guidelines</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {info.safetyGuidelines.map((guideline, index) => (
            <div
              key={index}
              className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div className="flex-shrink-0 mr-3">
                <Info className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-gray-700 dark:text-gray-300">{guideline}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}