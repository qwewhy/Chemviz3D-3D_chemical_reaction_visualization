/**
 * @file H2O.ts
 * @author [Hongyuan Wang] <HW8545626@gmail.com>
 * @copyright Copyright (c) 2024 [Hongyuan Wang]
 * @license MIT
 * @description This module implements the H2O (Water) molecule class, providing
 * atomic structure, bond properties and 3D positioning calculations.
 */

import { Vector3 } from 'three';
import { BaseMolecule } from './BaseMolecule';
import { H } from '../atoms/H';
import { O } from '../atoms/O';

/**
 * H2O represents H2O molecule structure and properties
 * 水分子(H2O)的结构与性质
 */
export class H2O extends BaseMolecule {
    /**
     * H-O-H bond angle in degrees
     * 氢-氧-氢键角(度)
     */
    readonly bondAngle: number = 104.5;

    /**
     * O-H bond length in Angstroms
     * 氧-氢键长(埃)
     */
    readonly bondLength: number = 0.96;

    /**
     * Oxygen atom at center
     * 中心氧原子
     */
    oxygenAtom: O;

    /**
     * Two hydrogen atoms
     * 两个氢原子
     */
    hydrogenAtoms: H[];

    constructor(position?: Vector3, rotation?: Vector3) {
        super(
            'H2O',              // Molecular formula (分子式)
            18.015,            // Molecular mass g/mol (分子量 克/摩尔)
            1.0,               // Density g/cm³ at 4°C (密度 克/立方厘米，在4°C时)
            position,
            rotation
        );

        // Initialize atoms (初始化原子)
        this.oxygenAtom = new O();
        this.hydrogenAtoms = [
            new H(),
            new H()
        ];

        this.atoms = [this.oxygenAtom, ...this.hydrogenAtoms];
        this.updateAtomicPositions();
    }

    updateAtomicPositions(): void {
        // Place oxygen at molecule center
        this.oxygenAtom.setPosition(this.position.clone());

        // Calculate positions for hydrogen atoms
        const angleRad = (this.bondAngle * Math.PI) / 180;
        const halfAngle = angleRad / 2;

        // Place hydrogens symmetrically around oxygen
        this.hydrogenAtoms[0].setPosition(new Vector3(
            this.position.x + this.bondLength * Math.sin(halfAngle),
            this.position.y + this.bondLength * Math.cos(halfAngle),
            this.position.z
        ));

        this.hydrogenAtoms[1].setPosition(new Vector3(
            this.position.x - this.bondLength * Math.sin(halfAngle),
            this.position.y + this.bondLength * Math.cos(halfAngle),
            this.position.z
        ));
    }
} 