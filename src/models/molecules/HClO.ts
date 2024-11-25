import { Vector3 } from 'three';
import { BaseMolecule } from './BaseMolecule';
import { H } from '../atoms/H';
import { O } from '../atoms/O';
import { Cl } from '../atoms/Cl';

/**
 * HClO represents HClO molecule structure and properties
 * 次氯酸分子(HClO)的结构与性质
 */
export class HClO extends BaseMolecule {
    /**
     * H-O-Cl bond angle in degrees
     * 氢-氧-氯键角(度)
     */
    readonly bondAngle: number = 103;

    /**
     * O-H bond length in Angstroms
     * 氧-氢键长(埃)
     */
    readonly ohBondLength: number = 0.97;

    /**
     * Cl-O bond length in Angstroms
     * 氯-氧键长(埃)
     */
    readonly cloBondLength: number = 1.69;

    /**
     * The hydrogen atom
     * 氢原子
     */
    hydrogenAtom: H;

    /**
     * The oxygen atom
     * 氧原子
     */
    oxygenAtom: O;

    /**
     * The chlorine atom
     * 氯原子
     */
    chlorineAtom: Cl;

    constructor(position?: Vector3, rotation?: Vector3) {
        super(
            'HClO',             // Molecular formula (分子式)
            52.457,             // Molecular mass g/mol (分子量 克/摩尔)
            1.003,             // Density g/cm³ at 20°C (密度 克/立方厘米，在20°C时)
            position,
            rotation
        );

        // Initialize atoms (初始化原子)
        this.hydrogenAtom = new H();
        this.oxygenAtom = new O();
        this.chlorineAtom = new Cl();

        // Add atoms to the molecule
        this.atoms = [this.hydrogenAtom, this.oxygenAtom, this.chlorineAtom];
        
        this.updateAtomicPositions();
    }

    updateAtomicPositions(): void {
        // 氧原子在中心
        this.oxygenAtom.setPosition(this.position.clone());
    
        // 氯原子位置
        this.chlorineAtom.setPosition(new Vector3(
            this.position.x + this.cloBondLength,
            this.position.y,
            this.position.z
        ));
    
        // 氢原子位置(
        const angleRad = (this.bondAngle * Math.PI) / 180;
        this.hydrogenAtom.setPosition(new Vector3(
            this.position.x - this.ohBondLength * Math.cos(angleRad),
            this.position.y + this.ohBondLength * Math.sin(angleRad),
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
            this.chlorineAtom.setPosition(rotatePoint(this.chlorineAtom.position, centerPos));
            this.hydrogenAtom.setPosition(rotatePoint(this.hydrogenAtom.position, centerPos));
        }
    }
} 