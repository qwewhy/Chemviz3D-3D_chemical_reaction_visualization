/**
 * @file H2CO3.ts
 * @description This module implements the H2CO3 (Carbonic acid) molecule class, providing
 * atomic structure, bond properties and 3D positioning calculations.
 */

import { Vector3 } from 'three';
import { BaseMolecule } from './BaseMolecule';
import { C } from '../atoms/C';
import { O } from '../atoms/O';
import { H } from '../atoms/H';

/**
 * H2CO3 represents H2CO3 molecule structure and properties
 * 碳酸分子(H2CO3)的结构与性质
 */
export class H2CO3 extends BaseMolecule {
    /**
     * C-O bond length for single bonds in Angstroms
     * C-O单键键长(埃)
     */
    readonly coSingleBondLength: number = 1.36;

    /**
     * C=O bond length for double bond in Angstroms
     * C=O双键键长(埃)
     */
    readonly coDoubleBondLength: number = 1.21;

    /**
     * O-H bond length in Angstroms
     * O-H键长(埃)
     */
    readonly ohBondLength: number = 0.97;

    /**
     * O-C-O bond angle in degrees (trigonal planar structure)
     * O-C-O键角(度)（三角平面结构）
     */
    readonly ocoBondAngle: number = 120;

    /**
     * C-O-H bond angle in degrees
     * C-O-H键角(度)
     */
    readonly cohBondAngle: number = 105;

    /**
     * The carbon atom
     * 碳原子
     */
    carbonAtom: C;

    /**
     * The oxygen atoms (index 0 for double-bonded O, 1&2 for single-bonded O)
     * 氧原子（索引0为双键氧，1和2为单键氧）
     */
    oxygenAtoms: O[];

    /**
     * The hydrogen atoms
     * 氢原子
     */
    hydrogenAtoms: H[];

    constructor(position?: Vector3, rotation?: Vector3) {
        super(
            'H2CO3',            // Molecular formula (分子式)
            62.025,            // Molecular mass g/mol (分子量 克/摩尔)
            1.668,             // Density g/cm³ at 20°C (密度 克/立方厘米，在20°C时)
            position,
            rotation
        );

        // Initialize atoms (初始化原子)
        this.carbonAtom = new C();
        this.oxygenAtoms = [
            new O(), // Double-bonded oxygen
            new O(), // Single-bonded oxygen with H
            new O()  // Single-bonded oxygen with H
        ];
        this.hydrogenAtoms = [
            new H(),
            new H()
        ];

        // Add atoms to the molecule
        this.atoms = [
            this.carbonAtom,
            ...this.oxygenAtoms,
            ...this.hydrogenAtoms
        ];

        this.updateAtomicPositions();
    }

    updateAtomicPositions(): void {
        // Place carbon at molecule center
        this.carbonAtom.setPosition(this.position.clone());

        // Calculate positions for the three oxygen atoms in trigonal planar arrangement
        // First oxygen (double-bonded) along positive x-axis
        this.oxygenAtoms[0].setPosition(new Vector3(
            this.position.x + this.coDoubleBondLength,
            this.position.y,
            this.position.z
        ));

        // Calculate positions for the other two oxygen atoms
        const angle1 = (this.ocoBondAngle * Math.PI) / 180;
        const angle2 = -(this.ocoBondAngle * Math.PI) / 180;

        this.oxygenAtoms[1].setPosition(new Vector3(
            this.position.x + this.coSingleBondLength * Math.cos(angle1),
            this.position.y + this.coSingleBondLength * Math.sin(angle1),
            this.position.z
        ));

        this.oxygenAtoms[2].setPosition(new Vector3(
            this.position.x + this.coSingleBondLength * Math.cos(angle2),
            this.position.y + this.coSingleBondLength * Math.sin(angle2),
            this.position.z
        ));

        // Calculate positions for hydrogen atoms
        const cohAngleRad = (this.cohBondAngle * Math.PI) / 180;

        // For each hydroxyl group
        for (let i = 0; i < 2; i++) {
            const oxygenPos = this.oxygenAtoms[i + 1].position;
            const carbonPos = this.carbonAtom.position;

            // Calculate the direction vector from carbon to oxygen
            const coVector = oxygenPos.clone().sub(carbonPos).normalize();

            // Calculate the perpendicular vector in the xy plane
            const perpVector = new Vector3(-coVector.y, coVector.x, 0).normalize();

            // Calculate hydrogen position
            const hydrogenPos = oxygenPos.clone()
                .add(coVector.multiplyScalar(-this.ohBondLength * Math.cos(cohAngleRad)))
                .add(perpVector.multiplyScalar(this.ohBondLength * Math.sin(cohAngleRad)));

            this.hydrogenAtoms[i].setPosition(hydrogenPos);
        }

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
            this.oxygenAtoms.forEach(atom => {
                atom.setPosition(rotatePoint(atom.position, centerPos));
            });
            this.hydrogenAtoms.forEach(atom => {
                atom.setPosition(rotatePoint(atom.position, centerPos));
            });
        }
    }
}