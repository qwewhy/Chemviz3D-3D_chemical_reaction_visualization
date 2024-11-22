import { useState, useEffect } from 'react';
import { createMoleculeGeometry } from '../utils/moleculeHelpers';
import useSimulationStore from '../store/simulationStore';

export const useMolecule = (moleculeData) => {
  const [geometry, setGeometry] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (moleculeData) {
      const moleculeGeometry = createMoleculeGeometry(
        moleculeData.atoms,
        moleculeData.bonds
      );
      setGeometry(moleculeGeometry);
      setIsLoading(false);
    }
  }, [moleculeData]);

  return { geometry, isLoading };
}; 