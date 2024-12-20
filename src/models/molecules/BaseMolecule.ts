/**
 * @file BaseMolecule.ts
 * @author1 [Hongyuan Wang] <HW8545626@gmail.com>
 * @copyright Copyright (c) 2024 [Hongyuan Wang]
 * @license MIT
 * @description This module implements the base class for all molecules, providing
 * atomic structure, bond properties and 3D positioning calculations.
 */

import { Vector3 } from 'three';
import { BaseAtom } from '../atoms/BaseAtom';

export abstract class BaseMolecule {
    readonly molecularFormula: string;
    readonly molecularMass: number;
    readonly density: number;
    position: Vector3;
    rotation: Vector3;
    atoms: BaseAtom[];

    constructor(
        molecularFormula: string,
        molecularMass: number,
        density: number,
        position?: Vector3,
        rotation?: Vector3
    ) {
        this.molecularFormula = molecularFormula;
        this.molecularMass = molecularMass;
        this.density = density;
        this.position = position || new Vector3();
        this.rotation = rotation || new Vector3();
        this.atoms = [];
    }

    abstract updateAtomicPositions(): void;
} 