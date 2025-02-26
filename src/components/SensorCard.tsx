import React from 'react';
import { Link } from 'react-router-dom';
import { SensorData } from '../types';

interface SensorCardProps {
  title: string;
  value: number;
  unit: string;
  icon: React.ElementType;
  color: string;
  type: keyof SensorData;
}

export default function SensorCard({ title, value, unit, icon: Icon, color, type }: SensorCardProps) {
  return (
    <Link 
      to={`/sensor/${type}`}
      className="group bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-200 hover:shadow-xl hover:scale-105"
    >
      <div className="flex items-center space-x-4">
        <div className={`p-3 rounded-full ${color} transition-transform duration-200 group-hover:scale-110`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">{title}</h3>
          <p className="text-2xl font-semibold text-gray-900 dark:text-white">
            {value} <span className="text-sm text-gray-500 dark:text-gray-400">{unit}</span>
          </p>
        </div>
      </div>
    </Link>
  );
}