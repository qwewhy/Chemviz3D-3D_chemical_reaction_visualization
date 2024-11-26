/**
 * @file N2.ts
 * @author [Hongyuan Wang] <HW8545626@gmail.com>
 * @copyright Copyright (c) 2024 [Hongyuan Wang]
 * @license MIT
 * @description This module implements the N2 (Nitrogen) molecule class, providing
 * atomic structure, bond properties and 3D positioning calculations.
 */

import { Vector3 } from 'three';
import { BaseMolecule } from './BaseMolecule';
import { N } from '../atoms/N';

/**
 * N2 represents N2 molecule structure and properties
 * 氮气分子(N2)的结构与性质
 */
export class N2 extends BaseMolecule {
    /**
     * N-N triple bond length in Angstroms
     * 氮-氮三重键键长(埃)
     */
    readonly bondLength: number = 1.098;

    /**
     * Boiling point in Celsius
     * 沸点(摄氏度)
     */
    readonly boilingPoint: number = -195.79;

    /**
     * Melting point in Celsius
     * 熔点(摄氏度)
     */
    readonly meltingPoint: number = -210.01;

    /**
     * Nitrogen atoms
     * 氮原子
     */
    nitrogenAtoms: N[];

    constructor(position?: Vector3, rotation?: Vector3) {
        super(
            'N2',               // Molecular formula (分子式)
            28.014,            // Molecular mass g/mol (分子量 克/摩尔)
            1.2506,            // Density g/L at 0°C, 1 atm (密度 克/升，在0°C，1个标准大气压下)
            position,
            rotation
        );

        // Initialize atoms (初始化原子)
        this.nitrogenAtoms = [new N(), new N()];

        // Add atoms to the molecule
        this.atoms = this.nitrogenAtoms;
        
        this.updateAtomicPositions();
    }

    updateAtomicPositions(): void {
        // Place first nitrogen atom at half bond length before center
        this.nitrogenAtoms[0].setPosition(new Vector3(
            this.position.x - this.bondLength / 2,
            this.position.y,
            this.position.z
        ));

        // Place second nitrogen atom at half bond length after center
        this.nitrogenAtoms[1].setPosition(new Vector3(
            this.position.x + this.bondLength / 2,
            this.position.y,
            this.position.z
        ));

        // Apply rotation if needed
        if (this.rotation.length() > 0) {
            // Create rotation matrix around center
            const rotationMatrix = new Vector3().subVectors(
                this.nitrogenAtoms[1].position,
                this.nitrogenAtoms[0].position
            );
            
            // Rotate around x-axis
            if (this.rotation.x !== 0) {
                const cosa = Math.cos(this.rotation.x);
                const sina = Math.sin(this.rotation.x);
                const y = rotationMatrix.y * cosa - rotationMatrix.z * sina;
                const z = rotationMatrix.y * sina + rotationMatrix.z * cosa;
                rotationMatrix.y = y;
                rotationMatrix.z = z;
            }

            // Rotate around y-axis
            if (this.rotation.y !== 0) {
                const cosa = Math.cos(this.rotation.y);
                const sina = Math.sin(this.rotation.y);
                const x = rotationMatrix.x * cosa + rotationMatrix.z * sina;
                const z = -rotationMatrix.x * sina + rotationMatrix.z * cosa;
                rotationMatrix.x = x;
                rotationMatrix.z = z;
            }

            // Rotate around z-axis
            if (this.rotation.z !== 0) {
                const cosa = Math.cos(this.rotation.z);
                const sina = Math.sin(this.rotation.z);
                const x = rotationMatrix.x * cosa - rotationMatrix.y * sina;
                const y = rotationMatrix.x * sina + rotationMatrix.y * cosa;
                rotationMatrix.x = x;
                rotationMatrix.y = y;
            }

            // Apply rotated positions
            this.nitrogenAtoms[0].setPosition(new Vector3(
                this.position.x - rotationMatrix.x / 2,
                this.position.y - rotationMatrix.y / 2,
                this.position.z - rotationMatrix.z / 2
            ));

            this.nitrogenAtoms[1].setPosition(new Vector3(
                this.position.x + rotationMatrix.x / 2,
                this.position.y + rotationMatrix.y / 2,
                this.position.z + rotationMatrix.z / 2
            ));
        }
    }
} 