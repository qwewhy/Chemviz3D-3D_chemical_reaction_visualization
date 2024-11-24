import { Vector3 } from 'three';
import { BaseMolecule } from './BaseMolecule';
import { HydrogenAtom } from '../atoms/HydrogenAtom';
import { ChlorineAtom } from '../atoms/ChlorineAtom';

/**
 * HydrochloricAcid represents HCl molecule structure and properties
 * 氯化氢分子(HCl)的结构与性质
 */
export class HydrochloricAcid extends BaseMolecule {
    /**
     * H-Cl bond length in Angstroms
     * 氢-氯键长(埃)
     */
    readonly bondLength: number = 1.27;

    /**
     * Boiling point in Celsius
     * 沸点(摄氏度)
     */
    readonly boilingPoint: number = -85.05;

    /**
     * Melting point in Celsius
     * 熔点(摄氏度)
     */
    readonly meltingPoint: number = -114.22;

    /**
     * The hydrogen atom
     * 氢原子
     */
    hydrogenAtom: HydrogenAtom;

    /**
     * The chlorine atom
     * 氯原子
     */
    chlorineAtom: ChlorineAtom;

    /**
     * Creates a hydrochloric acid molecule at specified position and rotation
     * 在指定位置和旋转角度创建氯化氢分子
     * @param position - 3D position vector (三维位置向量)
     * @param rotation - 3D rotation vector (三维旋转向量)
     */
    constructor(position?: Vector3, rotation?: Vector3) {
        super(
            'HCl',             // Molecular formula (分子式)
            36.46,            // Molecular mass g/mol (分子量 克/摩尔)
            1.49,             // Density g/cm³ at -85.05°C (密度 克/立方厘米，在-85.05°C时)
            position,
            rotation
        );

        // Initialize atoms (初始化原子)
        this.hydrogenAtom = new HydrogenAtom();
        this.chlorineAtom = new ChlorineAtom();

        // Add atoms to the molecule
        this.atoms = [this.hydrogenAtom, this.chlorineAtom];
        
        this.updateAtomicPositions();
    }

    /**
     * Updates positions of all atoms in the hydrochloric acid molecule
     * 更新氯化氢分子中所有原子的位置
     */
    updateAtomicPositions(): void {
        // Place hydrogen atom at half bond length before center
        this.hydrogenAtom.setPosition(new Vector3(
            this.position.x - this.bondLength / 2,
            this.position.y,
            this.position.z
        ));

        // Place chlorine atom at half bond length after center
        this.chlorineAtom.setPosition(new Vector3(
            this.position.x + this.bondLength / 2,
            this.position.y,
            this.position.z
        ));

        // Apply rotation if needed
        if (this.rotation.length() > 0) {
            // Create rotation matrix around center
            const rotationMatrix = new Vector3().subVectors(
                this.chlorineAtom.position,
                this.hydrogenAtom.position
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
            this.hydrogenAtom.setPosition(new Vector3(
                this.position.x - rotationMatrix.x / 2,
                this.position.y - rotationMatrix.y / 2,
                this.position.z - rotationMatrix.z / 2
            ));

            this.chlorineAtom.setPosition(new Vector3(
                this.position.x + rotationMatrix.x / 2,
                this.position.y + rotationMatrix.y / 2,
                this.position.z + rotationMatrix.z / 2
            ));
        }
    }
}