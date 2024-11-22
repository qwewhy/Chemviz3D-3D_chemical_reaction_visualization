import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Scene from '../components/three/Scene';
import { useSimulation } from '../context/SimulationContext';
import Panel from '../components/ui/Panel';
import Controls from '../components/ui/Controls';
import { useSimulationStore } from '../store/simulationStore';

const Simulator = () => {
  const { t } = useTranslation();
  const { simulationState, setSimulationState } = useSimulation();
  const toggleSimulation = useSimulationStore((state) => state.toggleSimulation);
  const isSimulating = useSimulationStore((state) => state.isSimulating);

  // 处理开始模拟
  const handleStart = () => {
    toggleSimulation();
    setSimulationState(prev => ({
      ...prev,
      isRunning: !prev.isRunning
    }));
  };

  // 处理重置
  const handleReset = () => {
    if (isSimulating) {
      toggleSimulation();
    }
    setSimulationState({
      isRunning: false,
      speed: 1,
      temperature: 298,
      pressure: 1,
    });
  };

  return (
    <div className="flex h-screen">
      {/* 3D场景 */}
      <div className="flex-grow relative">
        <Scene />
      </div>

      {/* 控制面板 */}
      <div className="w-80 bg-white shadow-lg p-4">
        <Panel title={t('simulator.title')}>
          <Controls
            onStart={handleStart}
            onReset={handleReset}
            temperature={simulationState.temperature}
            pressure={simulationState.pressure}
            onTemperatureChange={(temp) => 
              setSimulationState(prev => ({ ...prev, temperature: temp }))
            }
            onPressureChange={(press) => 
              setSimulationState(prev => ({ ...prev, pressure: press }))
            }
            isSimulating={isSimulating}
          />
        </Panel>
      </div>
    </div>
  );
};

export default Simulator; 