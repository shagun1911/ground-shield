import { SensorInfo } from '../types';

export const sensorInfo: Record<string, SensorInfo> = {
  voltage: {
    title: 'Voltage Monitoring',
    unit: 'V',
    normalRange: '210V - 230V',
    criticalThreshold: '< 200V or > 240V',
    description: 'Monitors the electrical potential difference in the system.',
    color: 'blue',
    significance: 'Voltage monitoring is crucial for ensuring electrical safety and equipment protection. Stable voltage levels indicate proper power supply and system health.',
    potentialIssues: [
      'Power supply fluctuations',
      'Equipment malfunction',
      'Grid instability',
      'Overloading'
    ],
    recommendations: [
      'Check power source stability',
      'Inspect electrical connections',
      'Review load distribution',
      'Consider voltage stabilization'
    ],
    safetyGuidelines: [
      'Monitor voltage regularly',
      'Keep within specified range',
      'Report unusual fluctuations',
      'Follow electrical safety protocols'
    ]
  },
  current: {
    title: 'Current Monitoring',
    unit: 'A',
    normalRange: '5A - 15A',
    criticalThreshold: '> 20A',
    description: 'Tracks the flow of electrical current through the system.',
    color: 'yellow',
    significance: 'Current monitoring helps detect electrical leakage and prevent overload conditions. It\'s essential for system safety and efficiency.',
    potentialIssues: [
      'Current leakage',
      'Circuit overload',
      'Short circuits',
      'Equipment failure'
    ],
    recommendations: [
      'Regular circuit inspection',
      'Load balancing',
      'Equipment maintenance',
      'Update safety devices'
    ],
    safetyGuidelines: [
      'Check insulation regularly',
      'Monitor current draw',
      'Maintain circuit breakers',
      'Follow electrical codes'
    ]
  },
  earthContinuity: {
    title: 'Earth Continuity',
    unit: 'Ω',
    normalRange: '0.5Ω - 1Ω',
    criticalThreshold: '> 2Ω',
    description: 'Measures the effectiveness of the earthing system.',
    color: 'green',
    significance: 'Earth continuity ensures proper grounding and protection against electrical faults. It\'s critical for safety and equipment protection.',
    potentialIssues: [
      'Poor ground connection',
      'Corrosion',
      'Loose connections',
      'Ground path interruption'
    ],
    recommendations: [
      'Regular earth testing',
      'Maintain connections',
      'Check for corrosion',
      'Upgrade grounding system'
    ],
    safetyGuidelines: [
      'Test earth resistance regularly',
      'Maintain earth connections',
      'Document earth tests',
      'Follow grounding standards'
    ]
  },
  soilTemperature: {
    title: 'Soil Temperature',
    unit: '°C',
    normalRange: '15°C - 30°C',
    criticalThreshold: '< 10°C or > 35°C',
    description: 'Measures the temperature of the soil at various depths.',
    color: 'red',
    significance: 'Soil temperature affects crop growth, microbial activity, and overall soil health. It\'s crucial for agricultural productivity.',
    potentialIssues: [
      'Extreme temperatures',
      'Poor soil conditions',
      'Heat stress',
      'Cold damage'
    ],
    recommendations: [
      'Adjust irrigation timing',
      'Use mulching',
      'Monitor depth profiles',
      'Implement temperature control'
    ],
    safetyGuidelines: [
      'Regular monitoring',
      'Temperature trend analysis',
      'Seasonal adjustments',
      'Document changes'
    ]
  },
  airQuality: {
    title: 'Air Quality',
    unit: 'AQI',
    normalRange: '0 - 50',
    criticalThreshold: '> 100',
    description: 'Monitors air pollution levels and quality index.',
    color: 'purple',
    significance: 'Air quality monitoring is essential for environmental health and safety. It helps identify pollution sources and protect public health.',
    potentialIssues: [
      'High pollution levels',
      'Poor ventilation',
      'Chemical contamination',
      'Particulate matter'
    ],
    recommendations: [
      'Improve ventilation',
      'Reduce emissions',
      'Install air filters',
      'Regular maintenance'
    ],
    safetyGuidelines: [
      'Monitor AQI regularly',
      'Follow health advisories',
      'Maintain ventilation',
      'Use protective equipment'
    ]
  },
  soilMoisture: {
    title: 'Soil Moisture',
    unit: '%',
    normalRange: '40% - 60%',
    criticalThreshold: '< 30% or > 70%',
    description: 'Tracks moisture content in the soil.',
    color: 'cyan',
    significance: 'Soil moisture affects plant growth, soil stability, and agricultural productivity. It\'s crucial for irrigation management.',
    potentialIssues: [
      'Drought conditions',
      'Over-saturation',
      'Poor drainage',
      'Water stress'
    ],
    recommendations: [
      'Adjust irrigation',
      'Improve drainage',
      'Soil amendments',
      'Moisture monitoring'
    ],
    safetyGuidelines: [
      'Regular moisture checks',
      'Maintain optimal levels',
      'Monitor weather impact',
      'Document changes'
    ]
  },
  groundVibrations: {
    title: 'Ground Vibrations',
    unit: 'g',
    normalRange: '0.1g - 0.3g',
    criticalThreshold: '> 0.5g',
    description: 'Monitors seismic activity and ground movement.',
    color: 'orange',
    significance: 'Ground vibration monitoring is crucial for structural safety and early warning of potential geological hazards.',
    potentialIssues: [
      'Seismic activity',
      'Construction impact',
      'Structural stress',
      'Equipment vibration'
    ],
    recommendations: [
      'Regular monitoring',
      'Structural assessment',
      'Vibration isolation',
      'Safety protocols'
    ],
    safetyGuidelines: [
      'Monitor continuously',
      'Follow safety thresholds',
      'Regular calibration',
      'Emergency procedures'
    ]
  }
};