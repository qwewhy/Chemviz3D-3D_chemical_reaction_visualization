/**
 * @file NH4HCO3.ts
 * @description This module implements the NH4HCO3 (Ammonium bicarbonate) molecule class, providing
 * atomic structure, bond properties and 3D positioning calculations.
 */

import { Vector3 } from 'three';
import { BaseMolecule } from './BaseMolecule';
import { H } from '../atoms/H';
import { C } from '../atoms/C';
import { O } from '../atoms/O';
import { N } from '../atoms/N';

/**
 * NH4HCO3 represents NH4HCO3 molecule structure and properties
 * 碳酸氢铵分子(NH4HCO3)的结构与性质
 */
export class NH4HCO3 extends BaseMolecule {
    /**
     * H-N-H bond angle in ammonium ion (degrees)
     * 铵离子中的氢-氮-氢键角(度)
     */
    readonly nhBondAngle: number = 109.5;

    /**
     * O-C-O bond angle in bicarbonate ion (degrees)
     * 碳酸氢根离子中的氧-碳-氧键角(度)
     */
    readonly ocoBondAngle: number = 120;

    /**
     * N-H bond length in Angstroms
     * 氮-氢键长(埃)
     */
    readonly nhBondLength: number = 1.02;

    /**
     * C-O bond length in Angstroms (single bond)
     * 碳-氧单键键长(埃)
     */
    readonly coSingleBondLength: number = 1.36;

    /**
     * C=O bond length in Angstroms (double bond)
     * 碳-氧双键键长(埃)
     */
    readonly coDoubleBondLength: number = 1.22;

    /**
     * O-H bond length in Angstroms
     * 氧-氢键长(埃)
     */
    readonly ohBondLength: number = 0.96;

    /**
     * Center nitrogen atom of ammonium ion
     * 铵离子中心的氮原子
     */
    nitrogenAtom: N;

    /**
     * Carbon atom of bicarbonate ion
     * 碳酸氢根离子中的碳原子
     */
    carbonAtom: C;

    /**
     * Oxygen atoms of bicarbonate ion
     * 碳酸氢根离子中的氧原子
     */
    oxygenAtoms: O[];

    /**
     * Hydrogen atoms bonded to nitrogen
     * 与氮原子成键的氢原子
     */
    ammoniumHydrogens: H[];

    /**
     * Hydrogen atom bonded to oxygen
     * 与氧原子成键的氢原子
     */
    bicarbonatHydrogen: H;

    constructor(position?: Vector3, rotation?: Vector3) {
        super(
            'NH4HCO3',         // Molecular formula (分子式)
            79.056,           // Molecular mass g/mol (分子量 克/摩尔)
            1.58,             // Density g/cm³ at 20°C (密度 克/立方厘米，在20°C时)
            position,
            rotation
        );

        // Initialize atoms
        this.nitrogenAtom = new N();
        this.carbonAtom = new C();
        
        // Initialize oxygen atoms
        this.oxygenAtoms = [
            new O(), // Double bonded oxygen
            new O(), // Single bonded oxygen
            new O()  // OH group oxygen
        ];

        // Initialize ammonium hydrogens
        this.ammoniumHydrogens = [
            new H(),
            new H(),
            new H(),
            new H()
        ];

        // Initialize bicarbonate hydrogen
        this.bicarbonatHydrogen = new H();

        // Combine all atoms into the molecule
        this.atoms = [
            this.nitrogenAtom,
            this.carbonAtom,
            ...this.oxygenAtoms,
            ...this.ammoniumHydrogens,
            this.bicarbonatHydrogen
        ];

        this.updateAtomicPositions();
    }

    updateAtomicPositions(): void {
        // Place carbon at molecule center
        this.carbonAtom.setPosition(this.position.clone());

        // Position NH4+ group on one side
        this.nitrogenAtom.setPosition(new Vector3(
            this.position.x - 2.5, // Arbitrary distance for visualization
            this.position.y,
            this.position.z
        ));

        // Position ammonium hydrogens (tetrahedral geometry)
        const nhTetrahedralAngle = (109.5 * Math.PI) / 180;
        for (let i = 0; i < 4; i++) {
            const phi = (i * 2 * Math.PI) / 3;
            const theta = Math.acos(-1/3) + (i % 2 ? Math.PI : 0);
            
            this.ammoniumHydrogens[i].setPosition(new Vector3(
                this.nitrogenAtom.position.x + this.nhBondLength * Math.sin(theta) * Math.cos(phi),
                this.nitrogenAtom.position.y + this.nhBondLength * Math.sin(theta) * Math.sin(phi),
                this.nitrogenAtom.position.z + this.nhBondLength * Math.cos(theta)
            ));
        }

        // Position bicarbonate oxygens
        // Double bonded oxygen
        this.oxygenAtoms[0].setPosition(new Vector3(
            this.position.x,
            this.position.y + this.coDoubleBondLength,
            this.position.z
        ));

        // Single bonded oxygens at 120° angles
        const ocoAngleRad = (this.ocoBondAngle * Math.PI) / 180;
        this.oxygenAtoms[1].setPosition(new Vector3(
            this.position.x + this.coSingleBondLength * Math.cos(ocoAngleRad),
            this.position.y - this.coSingleBondLength * Math.sin(ocoAngleRad),
            this.position.z
        ));

        this.oxygenAtoms[2].setPosition(new Vector3(
            this.position.x - this.coSingleBondLength * Math.cos(ocoAngleRad),
            this.position.y - this.coSingleBondLength * Math.sin(ocoAngleRad),
            this.position.z
        ));

        // Position bicarbonate hydrogen
        this.bicarbonatHydrogen.setPosition(new Vector3(
            this.oxygenAtoms[2].position.x - this.ohBondLength * Math.cos(ocoAngleRad/2),
            this.oxygenAtoms[2].position.y - this.ohBondLength * Math.sin(ocoAngleRad/2),
            this.oxygenAtoms[2].position.z
        ));

        // Apply rotation if specified
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
            this.nitrogenAtom.setPosition(rotatePoint(this.nitrogenAtom.position, centerPos));
            this.oxygenAtoms.forEach(o => o.setPosition(rotatePoint(o.position, centerPos)));
            this.ammoniumHydrogens.forEach(h => h.setPosition(rotatePoint(h.position, centerPos)));
            this.bicarbonatHydrogen.setPosition(rotatePoint(this.bicarbonatHydrogen.position, centerPos));
        }
    }
}