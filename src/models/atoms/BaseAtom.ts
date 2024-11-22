import { Vector3 } from 'three';

export abstract class BaseAtom {
  // 基础属性
  readonly atomicNumber: number;
  readonly atomicMass: number;
  readonly symbol: string;
  readonly protons: number;
  readonly neutrons: number;
  electrons: number;
  readonly ionizationEnergy: number;
  readonly atomicRadius: number;
  position: Vector3;
  readonly color: string;
  readonly maxBonds: number;
  currentBonds: number = 0;

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
  }

  setPosition(position: Vector3): void {
    this.position = position;
  }
} 