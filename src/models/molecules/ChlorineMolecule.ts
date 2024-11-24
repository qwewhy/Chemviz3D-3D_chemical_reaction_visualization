import { Vector3 } from 'three';
import { BaseMolecule } from './BaseMolecule';
import { ChlorineAtom } from '../atoms/ChlorineAtom';

/**
 * ChlorineMolecule represents Cl2 molecule structure and properties
 * 氯气分子(Cl2)的结构与性质
 */
export class ChlorineMolecule extends BaseMolecule {
    /**
     * Cl-Cl bond length in Angstroms
     * 氯-氯键长(埃)
     */
    readonly bondLength: number = 1.99;

    /**
     * Boiling point in Celsius
     * 沸点(摄氏度)
     */
    readonly boilingPoint: number = -34.04;

    /**
     * Melting point in Celsius
     * 熔点(摄氏度)
     */
    readonly meltingPoint: number = -101.5;

    /**
     * First chlorine atom
     * 第一个氯原子
     */
    chlorineAtom1: ChlorineAtom;

    /**
     * Second chlorine atom
     * 第二个氯原子
     */
    chlorineAtom2: ChlorineAtom;

    /**
     * Creates a chlorine molecule at specified position and rotation
     * 在指定位置和旋转角度创建氯气分子
     * @param position - 3D position vector (三维位置向量)
     * @param rotation - 3D rotation vector (三维旋转向量)
     */
    constructor(position?: Vector3, rotation?: Vector3) {
        super(
            'Cl2',              // Molecular formula (分子式)
            70.90,             // Molecular mass g/mol (分子量 克/摩尔)
            3.214,             // Density g/cm³ at -34.04°C (密度 克/立方厘米，在-34.04°C时)
            position,
            rotation
        );

        // Initialize atoms (初始化原子)
        this.chlorineAtom1 = new ChlorineAtom();
        this.chlorineAtom2 = new ChlorineAtom();

        // Add atoms to the molecule
        this.atoms = [this.chlorineAtom1, this.chlorineAtom2];
        
        this.updateAtomicPositions();
    }

    /**
     * Updates positions of all atoms in the chlorine molecule
     * 更新氯气分子中所有原子的位置
     */
    updateAtomicPositions(): void {
        // Place first chlorine atom at half bond length before center
        this.chlorineAtom1.setPosition(new Vector3(
            this.position.x - this.bondLength / 2,
            this.position.y,
            this.position.z
        ));

        // Place second chlorine atom at half bond length after center
        this.chlorineAtom2.setPosition(new Vector3(
            this.position.x + this.bondLength / 2,
            this.position.y,
            this.position.z
        ));

        // Apply rotation if needed
        if (this.rotation.length() > 0) {
            // Create rotation matrix around center
            const rotationMatrix = new Vector3().subVectors(
                this.chlorineAtom2.position,
                this.chlorineAtom1.position
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
            this.chlorineAtom1.setPosition(new Vector3(
                this.position.x - rotationMatrix.x / 2,
                this.position.y - rotationMatrix.y / 2,
                this.position.z - rotationMatrix.z / 2
            ));

            this.chlorineAtom2.setPosition(new Vector3(
                this.position.x + rotationMatrix.x / 2,
                this.position.y + rotationMatrix.y / 2,
                this.position.z + rotationMatrix.z / 2
            ));
        }
    }
}