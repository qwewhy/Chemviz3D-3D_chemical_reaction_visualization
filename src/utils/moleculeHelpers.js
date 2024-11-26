/**
 * @file moleculeHelpers.js
 * @author [Hongyuan Wang] <HW8545626@gmail.com>
 * @copyright Copyright (c) 2024 [Hongyuan Wang]
 * @license MIT
 * @description  * A collection of utility functions for molecular visualization and calculations.
 * Provides helper methods for:
 * - Atomic color mapping based on element type
 * - Atomic radius calculations
 * - Chemical bond position computations
 * - Molecule geometry generation
 * 
 * These utilities support the accurate representation of molecular structures
 * in 3D space, ensuring consistent visualization across the application.
 */

import { ELEMENT_COLORS, ATOMIC_RADIUS } from './constants';

export const getElementColor = (element) => {
  return ELEMENT_COLORS[element] || '#808080';
};

export const getAtomRadius = (element) => {
  return ATOMIC_RADIUS[element] || 0.5;
};

export const calculateBondPosition = (atom1, atom2) => {
  return {
    start: atom1.position,
    end: atom2.position,
  };
};

export const createMoleculeGeometry = (atoms, bonds) => {
  // 分子几何体创建逻辑
  return {
    atoms: atoms.map(atom => ({
      ...atom,
      radius: getAtomRadius(atom.element),
      color: getElementColor(atom.element),
    })),
    bonds,
  };
}; 