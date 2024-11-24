import { Vector3 } from 'three';
import { BaseMolecule } from './BaseMolecule';
import { NitrogenAtom } from '../atoms/NitrogenAtom';

/**
 * NitrogenMolecule represents N2 molecule structure and properties
 * 氮气分子(N2)的结构与性质
 */
export class NitrogenMolecule extends BaseMolecule {
    /**
     * N-N triple bond length in Angstroms
     * 氮-氮三重键键长(埃)
     */
    readonly bondLength: number = 1.098;

    /**
     * Boiling point in Celsius
     * 沸点(摄氏度)
     */
    readonly boilingPoint: number = -195.79;

    /**
     * Melting point in Celsius
     * 熔点(摄氏度)
     */
    readonly meltingPoint: number = -210.01;

    /**
     * First nitrogen atom
     * 第一个氮原子
     */
    nitrogenAtom1: NitrogenAtom;

    /**
     * Second nitrogen atom
     * 第二个氮原子
     */
    nitrogenAtom2: NitrogenAtom;

    /**
     * Creates a nitrogen molecule at specified position and rotation
     * 在指定位置和旋转角度创建氮气分子
     * @param position - 3D position vector (三维位置向量)
     * @param rotation - 3D rotation vector (三维旋转向量)
     */
    constructor(position?: Vector3, rotation?: Vector3) {
        super(
            'N2',               // Molecular formula (分子式)
            28.014,            // Molecular mass g/mol (分子量 克/摩尔)
            1.2506,            // Density g/L at 0°C, 1 atm (密度 克/升，在0°C，1个标准大气压下)
            position,
            rotation
        );

        // Initialize atoms (初始化原子)
        this.nitrogenAtom1 = new NitrogenAtom();
        this.nitrogenAtom2 = new NitrogenAtom();

        // Add atoms to the molecule
        this.atoms = [this.nitrogenAtom1, this.nitrogenAtom2];
        
        this.updateAtomicPositions();
    }

    /**
     * Updates positions of all atoms in the nitrogen molecule
     * 更新氮气分子中所有原子的位置
     */
    updateAtomicPositions(): void {
        // Place first nitrogen atom at half bond length before center
        this.nitrogenAtom1.setPosition(new Vector3(
            this.position.x - this.bondLength / 2,
            this.position.y,
            this.position.z
        ));

        // Place second nitrogen atom at half bond length after center
        this.nitrogenAtom2.setPosition(new Vector3(
            this.position.x + this.bondLength / 2,
            this.position.y,
            this.position.z
        ));

        // Apply rotation if needed
        if (this.rotation.length() > 0) {
            // Create rotation matrix around center
            const rotationMatrix = new Vector3().subVectors(
                this.nitrogenAtom2.position,
                this.nitrogenAtom1.position
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
            this.nitrogenAtom1.setPosition(new Vector3(
                this.position.x - rotationMatrix.x / 2,
                this.position.y - rotationMatrix.y / 2,
                this.position.z - rotationMatrix.z / 2
            ));

            this.nitrogenAtom2.setPosition(new Vector3(
                this.position.x + rotationMatrix.x / 2,
                this.position.y + rotationMatrix.y / 2,
                this.position.z + rotationMatrix.z / 2
            ));
        }
    }
}