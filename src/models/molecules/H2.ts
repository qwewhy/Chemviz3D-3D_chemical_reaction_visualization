/**
 * @file H2.ts
 * @author1 [Hongyuan Wang] <HW8545626@gmail.com>
 * @copyright Copyright (c) 2024 [Hongyuan Wang]
 * @license MIT
 * @description This module implements the H2 (Hydrogen) molecule class, providing
 * atomic structure, bond properties and 3D positioning calculations.
 */

import { Vector3 } from 'three';
import { BaseMolecule } from './BaseMolecule';
import { H } from '../atoms/H';

/**
 * H2 represents H2 molecule structure and properties
 * 氢气分子(H2)的结构与性质
 */
export class H2 extends BaseMolecule {
    /**
     * H-H bond length in Angstroms
     * 氢-氢键长(埃)
     */
    readonly bondLength: number = 0.74;

    /**
     * First hydrogen atom
     * 第一个氢原子
     */
    hydrogenAtom1: H;

    /**
     * Second hydrogen atom
     * 第二个氢原子
     */
    hydrogenAtom2: H;

    constructor(position?: Vector3, rotation?: Vector3) {
        super(
            'H2',               // Molecular formula (分子式)
            2.016,             // Molecular mass g/mol (分子量 克/摩尔)
            0.08988,           // Density g/L at 0°C, 1 atm (密度 克/升，在0°C，1个标准大气压下)
            position,
            rotation
        );

        // Initialize atoms (初始化原子)
        this.hydrogenAtom1 = new H();
        this.hydrogenAtom2 = new H();

        // Add atoms to the molecule
        this.atoms = [this.hydrogenAtom1, this.hydrogenAtom2];
        
        this.updateAtomicPositions();
    }

    updateAtomicPositions(): void {
        // Place first hydrogen atom at half bond length before center
        this.hydrogenAtom1.setPosition(new Vector3(
            this.position.x - this.bondLength / 2,
            this.position.y,
            this.position.z
        ));

        // Place second hydrogen atom at half bond length after center
        this.hydrogenAtom2.setPosition(new Vector3(
            this.position.x + this.bondLength / 2,
            this.position.y,
            this.position.z
        ));

        // Apply rotation if needed
        if (this.rotation.length() > 0) {
            // Create rotation matrix around center
            const rotationMatrix = new Vector3().subVectors(
                this.hydrogenAtom2.position,
                this.hydrogenAtom1.position
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
            this.hydrogenAtom1.setPosition(new Vector3(
                this.position.x - rotationMatrix.x / 2,
                this.position.y - rotationMatrix.y / 2,
                this.position.z - rotationMatrix.z / 2
            ));

            this.hydrogenAtom2.setPosition(new Vector3(
                this.position.x + rotationMatrix.x / 2,
                this.position.y + rotationMatrix.y / 2,
                this.position.z + rotationMatrix.z / 2
            ));
        }
    }
} 