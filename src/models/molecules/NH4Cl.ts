/**
 * @author1 [Hongyuan Wang] <HW8545626@gmail.com>
 * @copyright Copyright (c) 2024 [Hongyuan Wang]
 * @license MIT
 * @file NH4Cl.ts
 * @description This module implements the NH4Cl (Ammonium chloride) molecule class, providing
 * atomic structure, bond properties and 3D positioning calculations.
 */
import { Vector3 } from 'three';
import { BaseMolecule } from './BaseMolecule';
import { H } from '../atoms/H';
import { N } from '../atoms/N';
import { Cl } from '../atoms/Cl';

/**
 * NH4Cl represents NH4Cl molecule structure and properties
 * 氯化铵分子(NH4Cl)的结构与性质
 */
export class NH4Cl extends BaseMolecule {
    /**
     * H-N-H bond angle in NH4+ (degrees)
     * 铵根离子中氢-氮-氢键角(度)
     */
    readonly nhBondAngle: number = 109.5;

    /**
     * N-H bond length in Angstroms
     * 氮-氢键长(埃)
     */
    readonly nhBondLength: number = 1.02;

    /**
     * N-Cl ionic bond distance in Angstroms
     * 氮-氯离子键距(埃)
     */
    readonly nClDistance: number = 3.2;

    /**
     * Center nitrogen atom
     * 中心氮原子
     */
    nitrogenAtom: N;

    /**
     * Chlorine atom (Cl-)
     * 氯离子
     */
    chlorineAtom: Cl;

    /**
     * Four hydrogen atoms in tetrahedral arrangement
     * 四面体排列的四个氢原子
     */
    hydrogenAtoms: H[];

    constructor(position?: Vector3, rotation?: Vector3) {
        super(
            'NH4Cl',            // Molecular formula (分子式)
            53.49,             // Molecular mass g/mol (分子量 克/摩尔)
            1.527,             // Density g/cm³ at 20°C (密度 克/立方厘米，在20°C时)
            position,
            rotation
        );

        // Initialize atoms (初始化原子)
        this.nitrogenAtom = new N();
        this.chlorineAtom = new Cl();
        
        // Initialize four hydrogen atoms
        this.hydrogenAtoms = [
            new H(),
            new H(),
            new H(),
            new H()
        ];

        // Combine all atoms into the molecule
        this.atoms = [
            this.nitrogenAtom,
            this.chlorineAtom,
            ...this.hydrogenAtoms
        ];

        this.updateAtomicPositions();
    }

    updateAtomicPositions(): void {
        // Place nitrogen at molecule center
        this.nitrogenAtom.setPosition(this.position.clone());

        // Calculate tetrahedral vertices for NH4+ hydrogens
        const tetrahedralAngle = Math.acos(-1/3); // ~109.47°
        const a = this.nhBondLength;
        
        const vertices = [
            new Vector3(a, a, a),
            new Vector3(-a, -a, a),
            new Vector3(-a, a, -a),
            new Vector3(a, -a, -a)
        ].map(v => v.normalize().multiplyScalar(this.nhBondLength));

        // Position hydrogens at tetrahedral vertices
        for (let i = 0; i < 4; i++) {
            this.hydrogenAtoms[i].setPosition(
                vertices[i].clone().add(this.position)
            );
        }

        // Position chlorine ion relative to NH4+ center
        // Cl- is positioned to form optimal electrostatic interaction with NH4+
        this.chlorineAtom.setPosition(new Vector3(
            this.position.x,
            this.position.y,
            this.position.z + this.nClDistance
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

            const centerPos = this.position.clone();
            this.chlorineAtom.setPosition(rotatePoint(this.chlorineAtom.position, centerPos));
            this.hydrogenAtoms.forEach(h => {
                h.setPosition(rotatePoint(h.position, centerPos));
            });
        }
    }
}