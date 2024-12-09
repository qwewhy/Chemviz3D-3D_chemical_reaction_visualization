/**
 * @file H2O2.ts
 * @author1 [Hongyuan Wang] <HW8545626@gmail.com>
 * @copyright Copyright (c) 2024 [Hongyuan Wang]
 * @license MIT
 * @description This module implements the H2O2 (Hydrogen peroxide) molecule class, providing
 * atomic structure, bond properties and 3D positioning calculations.
 */

import { Vector3 } from 'three';
import { BaseMolecule } from './BaseMolecule';
import { H } from '../atoms/H';
import { O } from '../atoms/O';

/**
 * H2O2 represents H2O2 molecule structure and properties
 * 过氧化氢分子(H2O2)的结构与性质
 */
export class H2O2 extends BaseMolecule {
    /**
     * H-O-O bond angle in degrees
     * 氢-氧-氧键角(度)
     */
    readonly hooAngle: number = 94.8;

    /**
     * O-O bond length in Angstroms
     * 氧-氧键长(埃)
     */
    readonly ooBondLength: number = 1.47;

    /**
     * O-H bond length in Angstroms
     * 氧-氢键长(埃)
     */
    readonly ohBondLength: number = 0.97;

    /**
     * Oxygen atoms
     * 氧原子
     */
    oxygenAtoms: O[];

    /**
     * Hydrogen atoms
     * 氢原子
     */
    hydrogenAtoms: H[];

    constructor(position?: Vector3, rotation?: Vector3) {
        super(
            'H2O2',             // Molecular formula (分子式)
            34.015,            // Molecular mass g/mol (分子量 克/摩尔)
            1.45,              // Density g/cm³ at 20°C (密度 克/立方厘米，在20°C时)
            position,
            rotation
        );

        // Initialize atoms (初始化原子)
        this.oxygenAtoms = [new O(), new O()];
        this.hydrogenAtoms = [new H(), new H()];

        // Add atoms to the molecule
        this.atoms = [...this.oxygenAtoms, ...this.hydrogenAtoms];
        
        this.updateAtomicPositions();
    }

    updateAtomicPositions(): void {
        // O-O键长设为1.47埃
        const halfOO = this.ooBondLength / 2;
        
        this.oxygenAtoms[0].setPosition(new Vector3(
            this.position.x - halfOO,
            this.position.y,
            this.position.z
        ));
    
        this.oxygenAtoms[1].setPosition(new Vector3(
            this.position.x + halfOO,
            this.position.y,
            this.position.z
        ));
    
        // H-O-O角度94.8°
        const angleRad = (this.hooAngle * Math.PI) / 180;
        // O-H键长0.97埃
        const dx = this.ohBondLength * Math.cos(angleRad);
        const dy = this.ohBondLength * Math.sin(angleRad);
    
        this.hydrogenAtoms[0].setPosition(new Vector3(
            this.oxygenAtoms[0].position.x - dx,
            this.oxygenAtoms[0].position.y + dy,
            this.oxygenAtoms[0].position.z
        ));
    
        this.hydrogenAtoms[1].setPosition(new Vector3(
            this.oxygenAtoms[1].position.x + dx,
            this.oxygenAtoms[1].position.y - dy, // 注意这里改为减号
            this.oxygenAtoms[1].position.z
        ));
    }
} 