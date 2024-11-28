/**
 * @file CO2.ts
 * @description This module implements the CO2 (Carbon dioxide) molecule class, providing
 * atomic structure, bond properties and 3D positioning calculations.
 */

import { Vector3 } from 'three';
import { BaseMolecule } from './BaseMolecule';
import { C } from '../atoms/C';
import { O } from '../atoms/O';

/**
 * CO2 represents CO2 molecule structure and properties
 * 二氧化碳分子(CO2)的结构与性质
 */
export class CO2 extends BaseMolecule {
    /**
     * C-O bond length in Angstroms
     * 碳-氧键长(埃)
     */
    readonly coBondLength: number = 1.16;

    /**
     * O-C-O bond angle in degrees (180 for linear molecule)
     * 氧-碳-氧键角(度)（线性分子为180度）
     */
    readonly bondAngle: number = 180;

    /**
     * The carbon atom
     * 碳原子
     */
    carbonAtom: C;

    /**
     * The two oxygen atoms
     * 两个氧原子
     */
    oxygenAtoms: O[];

    constructor(position?: Vector3, rotation?: Vector3) {
        super(
            'CO2',              // Molecular formula (分子式)
            44.009,            // Molecular mass g/mol (分子量 克/摩尔)
            1.977,             // Density g/cm³ at 20°C (密度 克/立方厘米，在20°C时)
            position,
            rotation
        );

        // Initialize atoms (初始化原子)
        this.carbonAtom = new C();
        this.oxygenAtoms = [
            new O(),
            new O()
        ];

        // Add atoms to the molecule
        this.atoms = [this.carbonAtom, ...this.oxygenAtoms];
        
        this.updateAtomicPositions();
    }

    updateAtomicPositions(): void {
        // Place carbon at molecule center
        this.carbonAtom.setPosition(this.position.clone());
    
        // Position oxygen atoms on either side of carbon along the x-axis
        this.oxygenAtoms[0].setPosition(new Vector3(
            this.position.x + this.coBondLength,
            this.position.y,
            this.position.z
        ));
    
        this.oxygenAtoms[1].setPosition(new Vector3(
            this.position.x - this.coBondLength,
            this.position.y,
            this.position.z
        ));

        // Apply rotation if needed
        if (this.rotation.length() > 0) {
            const rotatePoint = (point: Vector3, center: Vector3): Vector3 => {
                const translated = point.clone().sub(center);
                
                // Rotate around x-axis
                if (this.rotation.x !== 0) {
                    const cosa = Math.cos(this.rotation.x);
                    const sina = Math.sin(this.rotation.x);
                    const y = translated.y * cosa - translated.z * sina;
                    const z = translated.y * sina + translated.z * cosa;
                    translated.y = y;
                    translated.z = z;
                }

                // Rotate around y-axis
                if (this.rotation.y !== 0) {
                    const cosa = Math.cos(this.rotation.y);
                    const sina = Math.sin(this.rotation.y);
                    const x = translated.x * cosa + translated.z * sina;
                    const z = -translated.x * sina + translated.z * cosa;
                    translated.x = x;
                    translated.z = z;
                }

                // Rotate around z-axis
                if (this.rotation.z !== 0) {
                    const cosa = Math.cos(this.rotation.z);
                    const sina = Math.sin(this.rotation.z);
                    const x = translated.x * cosa - translated.y * sina;
                    const y = translated.x * sina + translated.y * cosa;
                    translated.x = x;
                    translated.y = y;
                }

                return translated.add(center);
            };

            // Apply rotation to all atoms
            const centerPos = this.position.clone();
            this.oxygenAtoms[0].setPosition(rotatePoint(this.oxygenAtoms[0].position, centerPos));
            this.oxygenAtoms[1].setPosition(rotatePoint(this.oxygenAtoms[1].position, centerPos));
        }
    }
}