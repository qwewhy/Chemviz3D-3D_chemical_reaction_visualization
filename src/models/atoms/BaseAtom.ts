/**
 * @file BaseAtom.ts
 * @author [Hongyuan Wang] <HW8545626@gmail.com>
 * @copyright Copyright (c) 2024 [Hongyuan Wang]
 * @license MIT
 * @description This module implements the base atom class, providing
 * atomic properties and 3D positioning calculations.
 */

import { Vector3 } from 'three';

export abstract class BaseAtom {
  // 基础属性
  atomicNumber: number;
  atomicMass: number;
  symbol: string;
  protons: number;
  neutrons: number;
  electrons: number;
  ionizationEnergy: number;
  atomicRadius: number;
  position: Vector3;
  color: string;
  maxBonds: number;
  currentBonds: number;
  charge: number;

  constructor(
    atomicNumber: number,
    atomicMass: number,
    symbol: string,
    protons: number,
    neutrons: number,
    electrons: number,
    ionizationEnergy: number,
    atomicRadius: number,
    color: string,
    maxBonds: number,
    position?: Vector3,
    charge: number = 0
  ) {
    this.atomicNumber = atomicNumber;
    this.atomicMass = atomicMass;
    this.symbol = symbol;
    this.protons = protons;
    this.neutrons = neutrons;
    this.electrons = electrons;
    this.ionizationEnergy = ionizationEnergy;
    this.atomicRadius = atomicRadius;
    this.color = color;
    this.maxBonds = maxBonds;
    this.position = position || new Vector3();
    this.charge = charge;
  }

  setPosition(position: Vector3): void {
    this.position = position;
  }
} 