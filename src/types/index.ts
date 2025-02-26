export interface SensorData {
  voltage: number;
  current: number;
  earthContinuity: number;
  soilTemperature: number;
  airQuality: number;
  soilMoisture: number;
  groundVibrations: number;
  timestamp: string;
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'user';
}

export interface Alert {
  id: string;
  type: keyof SensorData;
  message: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: string;
  acknowledged: boolean;
}

export interface SensorInfo {
  title: string;
  unit: string;
  normalRange: string;
  criticalThreshold: string;
  description: string;
  color: string;
  significance: string;
  potentialIssues: string[];
  recommendations: string[];
  safetyGuidelines: string[];
}