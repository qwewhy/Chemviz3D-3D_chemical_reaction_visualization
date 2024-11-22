import { createContext, useContext, useState } from 'react';

const SimulationContext = createContext(null);

export const SimulationProvider = ({ children }) => {
  const [simulationState, setSimulationState] = useState({
    isRunning: false,
    speed: 1,
    temperature: 298,
    pressure: 1,
  });

  const value = {
    simulationState,
    setSimulationState,
  };

  return (
    <SimulationContext.Provider value={value}>
      {children}
    </SimulationContext.Provider>
  );
};

export const useSimulation = () => {
  const context = useContext(SimulationContext);
  if (!context) {
    throw new Error('useSimulation must be used within a SimulationProvider');
  }
  return context;
}; 