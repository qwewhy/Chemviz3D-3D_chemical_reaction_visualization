/**
 * @file NH3H2O.ts
 * @author [Hongyuan Wang] <HW8545626@gmail.com>
 * @copyright Copyright (c) 2024 [Hongyuan Wang]
 * @license MIT
 * @description This module implements the NH3H2O (Ammonia dihydrate) molecule class, providing
 * atomic structure, bond properties and 3D positioning calculations.
 */

import { Vector3 } from 'three';
import { BaseMolecule } from './BaseMolecule';
import { H } from '../atoms/H';
import { O } from '../atoms/O';
import { N } from '../atoms/N';

/**
 * NH3H2O represents NH3·H2O molecule structure and properties
 * 一水合氨分子(NH3·H2O)的结构与性质
 */
export class NH3H2O extends BaseMolecule {
    /**
     * H-N-H bond angle in ammonia part (degrees)
     * 氨部分的氢-氮-氢键角(度)
     */
    readonly nhBondAngle: number = 107.8;

    /**
     * H-O-H bond angle in water part (degrees)
     * 水部分的氢-氧-氢键角(度)
     */
    readonly ohBondAngle: number = 104.5;

    /**
     * N-H bond length in Angstroms
     * 氮-氢键长(埃)
     */
    readonly nhBondLength: number = 1.017;

    /**
     * O-H bond length in Angstroms
     * 氧-氢键长(埃)
     */
    readonly ohBondLength: number = 0.96;

    /**
     * N-O hydrogen bond length in Angstroms
     * 氮-氧氢键长(埃)
     * Reduced from 2.8Å to 1.5Å for better visualization
     * 为了更好的可视化效果，从2.8埃减小到1.5埃
     */
    readonly noBondLength: number = 1.5;

    /**
     * Center nitrogen atom
     * 中心氮原子
     */
    nitrogenAtom: N;

    /**
     * Oxygen atom from water
     * 水分子中的氧原子
     */
    oxygenAtom: O;

    /**
     * Three hydrogen atoms bonded to nitrogen
     * 与氮原子成键的三个氢原子
     */
    nitrogenHydrogens: H[];

    /**
     * Two hydrogen atoms from water
     * 水分子中的两个氢原子
     */
    oxygenHydrogens: H[];

    constructor(position?: Vector3, rotation?: Vector3) {
        super(
            'NH3·H2O',         // Molecular formula (分子式)
            35.046,           // Molecular mass g/mol (分子量 克/摩尔)
            0.947,            // Density g/cm³ at 20°C (密度 克/立方厘米，在20°C时)
            position,
            rotation
        );

        // Initialize atoms (初始化原子)
        this.nitrogenAtom = new N();
        this.oxygenAtom = new O();
        
        // Initialize hydrogen atoms for NH3 part
        this.nitrogenHydrogens = [
            new H(),
            new H(),
            new H()
        ];

        // Initialize hydrogen atoms for H2O part
        this.oxygenHydrogens = [
            new H(),
            new H()
        ];

        // Combine all atoms into the molecule
        this.atoms = [
            this.nitrogenAtom,
            this.oxygenAtom,
            ...this.nitrogenHydrogens,
            ...this.oxygenHydrogens
        ];

        this.updateAtomicPositions();
    }

    updateAtomicPositions(): void {
        // Place nitrogen at molecule center
        this.nitrogenAtom.setPosition(this.position.clone());

        // Position oxygen atom along the z-axis at hydrogen bond distance
        this.oxygenAtom.setPosition(new Vector3(
            this.position.x,
            this.position.y,
            this.position.z + this.noBondLength
        ));

        // Calculate positions for NH3 hydrogens (trigonal pyramidal geometry)
        const nhAngleRad = (this.nhBondAngle * Math.PI) / 180;
        const nhHeight = this.nhBondLength * Math.cos(nhAngleRad / 2);
        const nhRadius = this.nhBondLength * Math.sin(nhAngleRad / 2);

        // Place NH3 hydrogens in equilateral triangle formation
        for (let i = 0; i < 3; i++) {
            const angle = (i * 2 * Math.PI) / 3;
            this.nitrogenHydrogens[i].setPosition(new Vector3(
                this.position.x + nhRadius * Math.cos(angle),
                this.position.y + nhHeight,
                this.position.z + nhRadius * Math.sin(angle)
            ));
        }

        // Calculate positions for H2O hydrogens
        const ohAngleRad = (this.ohBondAngle * Math.PI) / 180;
        const ohHalfAngle = ohAngleRad / 2;

        // Place H2O hydrogens
        this.oxygenHydrogens[0].setPosition(new Vector3(
            this.oxygenAtom.position.x + this.ohBondLength * Math.sin(ohHalfAngle),
            this.oxygenAtom.position.y + this.ohBondLength * Math.cos(ohHalfAngle),
            this.oxygenAtom.position.z
        ));

        this.oxygenHydrogens[1].setPosition(new Vector3(
            this.oxygenAtom.position.x - this.ohBondLength * Math.sin(ohHalfAngle),
            this.oxygenAtom.position.y + this.ohBondLength * Math.cos(ohHalfAngle),
            this.oxygenAtom.position.z
        ));
    }
} 