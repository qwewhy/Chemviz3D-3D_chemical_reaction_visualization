/**
 * @file Simulator.jsx
 * @author1 [Hongyuan Wang] <HW8545626@gmail.com>
 * @copyright Copyright (c) 2024 [Hongyuan Wang]
 * @license MIT
 * @description This module implements the Simulator page component, providing a simulation Page.
 */

import { useState, useCallback } from 'react';
import Scene from '../components/three/Scene';
import Controls from '../components/ui/Controls';

const Simulator = () => {
  const [mountKey, setMountKey] = useState(0);
  const [temperature, setTemperature] = useState(293);
  const [pressure, setPressure] = useState(1);

  const handleForceReset = useCallback(() => {
    setMountKey(prev => prev + 1);
  }, []);

  return (
    <div className="flex h-[calc(100vh-4rem)] relative">
      <div className="flex-1 relative">
        <div className="absolute inset-0">
          <Scene mountKey={mountKey} />
        </div>
      </div>
      <div className="w-80 min-w-[320px] h-full bg-white shadow-lg p-4 overflow-y-auto">
        <Controls
          temperature={temperature}
          pressure={pressure}
          onTemperatureChange={setTemperature}
          onPressureChange={setPressure}
          onForceReset={handleForceReset}
        />
      </div>
    </div>
  );
};

export default Simulator; 