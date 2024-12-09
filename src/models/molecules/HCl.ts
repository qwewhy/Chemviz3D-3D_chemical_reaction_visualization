/**
 * @file HCl.ts
 * @author1 [Hongyuan Wang] <HW8545626@gmail.com>
 * @copyright Copyright (c) 2024 [Hongyuan Wang]
 * @license MIT
 * @description This module implements the HCl (Hydrogen chloride) molecule class, providing
 * atomic structure, bond properties and 3D positioning calculations.
 */

import { Vector3 } from 'three';
import { BaseMolecule } from './BaseMolecule';
import { H } from '../atoms/H';
import { Cl } from '../atoms/Cl';

/**
 * HCl represents HCl molecule structure and properties
 * 氯化氢分子(HCl)的结构与性质
 */
export class HCl extends BaseMolecule {
    /**
     * H-Cl bond length in Angstroms
     * 氢-氯键长(埃)
     */
    readonly bondLength: number = 1.27;

    /**
     * Boiling point in Celsius
     * 沸点(摄氏度)
     */
    readonly boilingPoint: number = -85.05;

    /**
     * Melting point in Celsius
     * 熔点(摄氏度)
     */
    readonly meltingPoint: number = -114.22;

    /**
     * The hydrogen atom
     * 氢原子
     */
    hydrogenAtom: H;

    /**
     * The chlorine atom
     * 氯原子
     */
    chlorineAtom: Cl;

    constructor(position?: Vector3, rotation?: Vector3) {
        super(
            'HCl',             // Molecular formula (分子式)
            36.458,            // Molecular mass g/mol (分子量 克/摩尔)
            1.49,             // Density g/cm³ at -85.05°C (密度 克/立方厘米，在-85.05°C时)
            position,
            rotation
        );

        // Initialize atoms (初始化原子)
        this.hydrogenAtom = new H();
        this.chlorineAtom = new Cl();

        // Add atoms to the molecule
        this.atoms = [this.hydrogenAtom, this.chlorineAtom];
        
        this.updateAtomicPositions();
    }

    updateAtomicPositions(): void {
        // Place hydrogen atom at half bond length before center
        this.hydrogenAtom.setPosition(new Vector3(
            this.position.x - this.bondLength / 2,
            this.position.y,
            this.position.z
        ));

        // Place chlorine atom at half bond length after center
        this.chlorineAtom.setPosition(new Vector3(
            this.position.x + this.bondLength / 2,
            this.position.y,
            this.position.z
        ));

        // Apply rotation if needed
        if (this.rotation.length() > 0) {
            // Create rotation matrix around center
            const rotationMatrix = new Vector3().subVectors(
                this.chlorineAtom.position,
                this.hydrogenAtom.position
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
            this.hydrogenAtom.setPosition(new Vector3(
                this.position.x - rotationMatrix.x / 2,
                this.position.y - rotationMatrix.y / 2,
                this.position.z - rotationMatrix.z / 2
            ));

            this.chlorineAtom.setPosition(new Vector3(
                this.position.x + rotationMatrix.x / 2,
                this.position.y + rotationMatrix.y / 2,
                this.position.z + rotationMatrix.z / 2
            ));
        }
    }
} 