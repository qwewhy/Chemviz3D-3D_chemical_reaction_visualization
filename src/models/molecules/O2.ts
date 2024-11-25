import { Vector3 } from 'three';
import { BaseMolecule } from './BaseMolecule';
import { O } from '../atoms/O';

/**
 * O2 represents O2 molecule structure and properties
 * 氧气分子(O2)的结构与性质
 */
export class O2 extends BaseMolecule {
    /**
     * O-O double bond length in Angstroms
     * 氧-氧双键键长(埃)
     */
    readonly bondLength: number = 1.21;

    /**
     * First oxygen atom
     * 第一个氧原子
     */
    oxygenAtom1: O;

    /**
     * Second oxygen atom
     * 第二个氧原子
     */
    oxygenAtom2: O;

    constructor(position?: Vector3, rotation?: Vector3) {
        super(
            'O2',               // Molecular formula (分子式)
            31.998,            // Molecular mass g/mol (分子量 克/摩尔)
            1.429,             // Density g/L at 0°C, 1 atm (密度 克/升，在0°C，1个标准大气压下)
            position,
            rotation
        );

        // Initialize atoms (初始化原子)
        this.oxygenAtom1 = new O();
        this.oxygenAtom2 = new O();

        this.atoms = [this.oxygenAtom1, this.oxygenAtom2];
        this.updateAtomicPositions();
    }

    updateAtomicPositions(): void {
        // Place atoms on either side of center
        this.oxygenAtom1.setPosition(new Vector3(
            this.position.x - this.bondLength / 2,
            this.position.y,
            this.position.z
        ));

        this.oxygenAtom2.setPosition(new Vector3(
            this.position.x + this.bondLength / 2,
            this.position.y,
            this.position.z
        ));
    }
} 