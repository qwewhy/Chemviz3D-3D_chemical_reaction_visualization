import { Vector3 } from 'three';
import { BaseMolecule } from './BaseMolecule';
import { HydrogenAtom } from '../atoms/HydrogenAtom';
import { OxygenAtom } from '../atoms/OxygenAtom';

/**
 * WaterMolecule represents H2O molecule structure and properties
 * 水分子(H2O)的结构与性质
 */
export class WaterMolecule extends BaseMolecule {
    /**
     * H-O-H bond angle in degrees
     * 氢-氧-氢键角(度)
     */
    readonly bondAngle: number = 104.5;
    /**
     * O-H bond length in Angstroms (1Å = 100pm = 0.1nm)
     * 氧-氢键长，单位为埃(1埃 = 100皮米 = 0.1纳米)
     * Should be ~0.96Å for realistic visualization,
     * 真实可视化应约为0.96埃,分子以1埃为单位
     */
    readonly bondLength: number = 0.96;
    /**
     * Boiling point in Celsius
     * 沸点(摄氏度)
     */
    readonly boilingPoint: number = 100;
    /**
     * Melting point in Celsius
     * 熔点(摄氏度)
     */
    readonly meltingPoint: number = 0;
    /**
     * Center oxygen atom
     * 中心氧原子
     */
    oxygenAtom: OxygenAtom;
    /**
     * Two hydrogen atoms
     * 两个氢原子
     */
    hydrogenAtoms: HydrogenAtom[];
    /**
     * Creates a water molecule at specified position and rotation
     * 在指定位置和旋转角度创建水分子
     * @param position - 3D position vector (三维位置向量)
     * @param rotation - 3D rotation vector (三维旋转向量)
     */

    constructor(position?: Vector3, rotation?: Vector3) {
        super(
            'H2O',              // Molecular formula (分子式)
            18.015,            // Molecular mass g/mol (分子量 克/摩尔)
            1.0,               // Density g/cm³ (密度 克/立方厘米)
            position,
            rotation
        );

        // Initialize atoms (初始化原子)
        this.oxygenAtom = new OxygenAtom();
        this.hydrogenAtoms = [
            new HydrogenAtom(),
            new HydrogenAtom()
        ];

        this.atoms = [this.oxygenAtom, ...this.hydrogenAtoms];
        this.updateAtomicPositions();
    }

    /**
     * Updates positions of all atoms in the water molecule
     * 更新水分子中所有原子的位置
     */
    updateAtomicPositions(): void {
        // Place oxygen at molecule center (将氧原子置于分子中心)
        this.oxygenAtom.setPosition(this.position.clone());

        // Convert bond angle to radians (将键角转换为弧度)
        const angleRad = (this.bondAngle * Math.PI) / 180;
        const halfAngle = angleRad / 2;

        // Calculate first hydrogen position using trigonometry
        // 使用三角函数计算第一个氢原子位置
        this.hydrogenAtoms[0].setPosition(new Vector3(
            this.position.x + this.bondLength * Math.sin(halfAngle),
            this.position.y + this.bondLength * Math.cos(halfAngle),
            this.position.z
        ));

        // Calculate second hydrogen position symmetrically
        // 对称计算第二个氢原子位置
        this.hydrogenAtoms[1].setPosition(new Vector3(
            this.position.x - this.bondLength * Math.sin(halfAngle),
            this.position.y + this.bondLength * Math.cos(halfAngle),
            this.position.z
        ));
    }
}