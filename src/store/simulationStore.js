import { create } from 'zustand';

// 创建模拟状态存储
// Create simulation state store
export const useSimulationStore = create((set) => ({
  molecules: [],
  selectedMolecule: null,
  reactionProgress: 0,
  isSimulating: false,
  
  setMolecules: (molecules) => set({ molecules }),
  selectMolecule: (molecule) => set({ selectedMolecule: molecule }),
  updateReactionProgress: (progress) => set({ reactionProgress: progress }),
  toggleSimulation: () => set((state) => ({ isSimulating: !state.isSimulating })),
}));

export default useSimulationStore; 