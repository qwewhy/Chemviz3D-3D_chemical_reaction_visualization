import { useState, useEffect } from 'react';
// Import the utility function for creating molecule geometry
// 导入创建分子几何体的工具函数
import { createMoleculeGeometry } from '../utils/moleculeHelpers';
// Import the simulation state management store
// 导入模拟状态管理存储
import useSimulationStore from '../store/simulationStore';

export const useMolecule = (moleculeData) => {
  // State for storing the molecule's geometry data
  // 存储分子的几何体数据的状态
  const [geometry, setGeometry] = useState(null);
  // Flag for controlling the loading state
  // 控制加载状态的标志
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