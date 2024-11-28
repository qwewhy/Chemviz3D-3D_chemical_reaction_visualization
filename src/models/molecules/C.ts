/**
 * @file C.ts
 * @description This module implements the C (Carbon) element class as a "molecule",
 * following the existing molecular structure pattern while representing a single carbon atom.
 */

import { Vector3 } from 'three';
import { BaseMolecule } from './BaseMolecule';
import { C as CarbonAtom } from '../atoms/C';

/**
 * Due to the strictness of the code, the carbon atom is treated as a "molecule" structure  
 * 由于代码严谨性，将碳原子作为"分子"的结构
 */
export class C extends BaseMolecule {
    /**
     * The carbon atom
     * 碳原子
     */
    carbonAtom: CarbonAtom;

    constructor(position?: Vector3, rotation?: Vector3) {
        super(
            'C',                // Molecular formula (分子式)
            12.011,            // Atomic mass g/mol (原子量 克/摩尔)
            2.267,             // Density g/cm³ at 20°C (密度 克/立方厘米，在20°C时)
            position,
            rotation
        );

        // Initialize carbon atom
        this.carbonAtom = new CarbonAtom();
        
        // Add atom to the molecule
        this.atoms = [this.carbonAtom];
        
        this.updateAtomicPositions();
    }

    updateAtomicPositions(): void {
        // Simply place the carbon atom at the molecule's position
        this.carbonAtom.setPosition(this.position.clone());

        // Apply rotation if needed (though for a single atom, rotation has no visible effect)
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

            // Apply rotation to the atom
            const centerPos = this.position.clone();
            this.carbonAtom.setPosition(rotatePoint(this.carbonAtom.position, centerPos));
        }
    }
}