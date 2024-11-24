import { Vector3 } from 'three';
import { BaseMolecule } from './BaseMolecule';
import { HydrogenAtom } from '../atoms/HydrogenAtom';
import { NitrogenAtom } from '../atoms/NitrogenAtom';

/**
 * AmmoniaMolecule represents NH3 molecule structure and properties
 * 氨气分子(NH3)的结构与性质
 */
export class AmmoniaMolecule extends BaseMolecule {
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
    nitrogenAtom: NitrogenAtom;

    /**
     * Three hydrogen atoms
     * 三个氢原子
     */
    hydrogenAtoms: HydrogenAtom[];

    /**
     * Creates an ammonia molecule at specified position and rotation
     * 在指定位置和旋转角度创建氨气分子
     * @param position - 3D position vector (三维位置向量)
     * @param rotation - 3D rotation vector (三维旋转向量)
     */
    constructor(position?: Vector3, rotation?: Vector3) {
        super(
            'NH3',              // Molecular formula (分子式)
            17.031,            // Molecular mass g/mol (分子量 克/摩尔)
            0.769,             // Density g/cm³ at -33.34°C (密度 克/立方厘米，在-33.34°C时)
            position,
            rotation
        );

        // Initialize atoms (初始化原子)
        this.nitrogenAtom = new NitrogenAtom();
        this.hydrogenAtoms = [
            new HydrogenAtom(),
            new HydrogenAtom(),
            new HydrogenAtom()
        ];

        this.atoms = [this.nitrogenAtom, ...this.hydrogenAtoms];
        this.updateAtomicPositions();
    }

    /**
     * Updates positions of all atoms in the ammonia molecule
     * 更新氨气分子中所有原子的位置
     */
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