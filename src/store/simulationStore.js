/**
 * @file simulationStore.js - Global State Management for Chemistry Simulation
 * @author1 Hongyuan Wang <HW8545626@gmail.com>
 * @copyright Copyright (c) 2024 Hongyuan Wang
 * @license MIT
 * @description
 * Zustand store implementation for managing the global state of the chemistry
 * simulation application. Manages:
 * - Molecule collection and manipulation (add, delete, clear)
 * - Molecule selection state
 * - Reaction progress tracking
 * - Simulation running state
 * 
 * Provides a centralized state management solution with atomic updates
 * and real-time synchronization across components.
 */

import { create } from 'zustand';
import { H2O } from '../models/molecules/H2O';
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
  deleteMolecule: (molecule) => set((state) => ({
    molecules: state.molecules.filter((m) => m !== molecule)
  })),
  selectMolecule: (molecule) => set({ selectedMolecule: molecule }),
  updateReactionProgress: (progress) => set({ reactionProgress: progress }),
  toggleSimulation: () => set((state) => ({ isSimulating: !state.isSimulating })),
  
  // 清除所有分子的方法
  clearMolecules: () => set({ molecules: [] }),
}));

export default useSimulationStore; 