/**
 * @file NH3.ts
 * @author [Hongyuan Wang] <HW8545626@gmail.com>
 * @copyright Copyright (c) 2024 [Hongyuan Wang]
 * @license MIT
 * @description This module implements the NH3 (Ammonia) molecule class, providing
 * atomic structure, bond properties and 3D positioning calculations.
 */

import { Vector3 } from 'three';
import { BaseMolecule } from './BaseMolecule';
import { H } from '../atoms/H';
import { N } from '../atoms/N';

/**
 * NH3 represents NH3 molecule structure and properties
 * 氨气分子(NH3)的结构与性质
 */
export class NH3 extends BaseMolecule {
    /**
     * H-N-H bond angle in degrees
     * 氢-氮-氢键角(度)
     */
    readonly bondAngle: number = 107.8;

    /**
     * N-H bond length in Angstroms (1Å = 100pm = 0.1nm)
     * 氮-氢键长，单位为埃(1埃 = 100皮米 = 0.1纳米)
     */
    readonly bondLength: number = 1.017;

    /**
     * Boiling point in Celsius
     * 沸点(摄氏度)
     */
    readonly boilingPoint: number = -33.34;

    /**
     * Melting point in Celsius
     * 熔点(摄氏度)
     */
    readonly meltingPoint: number = -77.73;

    /**
     * Center nitrogen atom
     * 中心氮原子
     */
    nitrogenAtom: N;

    /**
     * Three hydrogen atoms
     * 三个氢原子
     */
    hydrogenAtoms: H[];

    constructor(position?: Vector3, rotation?: Vector3) {
        super(
            'NH3',              // Molecular formula (分子式)
            17.031,            // Molecular mass g/mol (分子量 克/摩尔)
            0.769,             // Density g/cm³ at -33.34°C (密度 克/立方厘米，在-33.34°C时)
            position,
            rotation
        );

        // Initialize atoms (初始化原子)
        this.nitrogenAtom = new N();
        this.hydrogenAtoms = [
            new H(),
            new H(),
            new H()
        ];

        this.atoms = [this.nitrogenAtom, ...this.hydrogenAtoms];
        this.updateAtomicPositions();
    }

    updateAtomicPositions(): void {
        // Place nitrogen at molecule center (将氮原子置于分子中心)
        this.nitrogenAtom.setPosition(this.position.clone());

        // Convert bond angle to radians (将键角转换为弧度)
        const angleRad = (this.bondAngle * Math.PI) / 180;
        
        // Calculate positions for three hydrogen atoms in trigonal pyramidal geometry
        // 计算三角锥形构型中三个氢原子的位置
        const height = this.bondLength * Math.cos(angleRad / 2);
        const radius = this.bondLength * Math.sin(angleRad / 2);

        // Place hydrogens in an equilateral triangle formation
        // 将氢原子放置在等边三角形的顶点上
        for (let i = 0; i < 3; i++) {
            const angle = (i * 2 * Math.PI) / 3;
            this.hydrogenAtoms[i].setPosition(new Vector3(
                this.position.x + radius * Math.cos(angle),
                this.position.y + height,
                this.position.z + radius * Math.sin(angle)
            ));
        }
    }
} 