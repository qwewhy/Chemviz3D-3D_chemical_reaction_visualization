import { create } from 'zustand';
import { WaterMolecule } from '../models/molecules/WaterMolecule';
import { Vector3 } from 'three';

export const useSimulationStore = create((set) => ({
  molecules: [],
  selectedMolecule: null,
  reactionProgress: 0,
  isSimulating: false,
  
  setMolecules: (molecules) => set({ molecules }),
  addMolecule: (molecule) => set((state) => ({
    molecules: [...state.molecules, molecule]
  })),
  selectMolecule: (molecule) => set({ selectedMolecule: molecule }),
  updateReactionProgress: (progress) => set({ reactionProgress: progress }),
  toggleSimulation: () => set((state) => ({ isSimulating: !state.isSimulating })),
  
  // 添加清除所有分子的方法
  clearMolecules: () => set({ molecules: [] }),
}));

export default useSimulationStore; 