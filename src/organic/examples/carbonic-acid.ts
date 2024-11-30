import { ChemxFile } from '../types/ChemxTypes';
import { C } from '../../models/atoms/C';
import { O } from '../../models/atoms/O';
import { H } from '../../models/atoms/H';
import { Vector3 } from 'three';
import { BondType } from '../types/ChemxTypes';

export const DEFAULT_REACTION: ChemxFile = {
  version: "1.0",
  metadata: {
    name: "Default raction example",
    description: "H2CO3 -> H2O + CO2",
    created: 12345678
  },
  duration: 5000,
  keyframes: [
    {
      timestamp: 0,
      atoms: {
        C1: new C(new Vector3(0, 0, 0)),
        O1: new O(new Vector3(1.2, 0, 0)),
        O2: new O(new Vector3(-0.6, 1.0, 0)),
        O3: new O(new Vector3(-0.6, -1.0, 0)),
        H1: new H(new Vector3(-1.4, 1.3, 0)),
        H2: new H(new Vector3(-1.4, -1.3, 0))
      },
      bonds: [
        {
          id: "bond_001",
          atomIds: ["C1", "O1"],
          order: 2,
          strength: 1.0,
          bondType: BondType.COVALENT
        },
        {
          id: "bond_002",
          atomIds: ["C1", "O2"],
          order: 1,
          strength: 1.0,
          bondType: BondType.COVALENT
        },
        {
          id: "bond_003",
          atomIds: ["C1", "O3"],
          order: 1,
          strength: 1.0,
          bondType: BondType.COVALENT
        },
        {
          id: "bond_004",
          atomIds: ["O2", "H1"],
          order: 1,
          strength: 1.0,
          bondType: BondType.COVALENT
        },
        {
          id: "bond_005",
          atomIds: ["O3", "H2"],
          order: 1,
          strength: 1.0,
          bondType: BondType.COVALENT
        }
      ]
    },
    {
      timestamp: 2500,
      atoms: {
        C1: new C(new Vector3(0, 0, 0)),
        O1: new O(new Vector3(1.2, 0, 0)),
        O2: new O(new Vector3(-0.3, 1.25, 0)),
        O3: new O(new Vector3(-0.9, -0.5, 0)),
        H1: new H(new Vector3(-0.6, 2.0, 0)),
        H2: new H(new Vector3(-1.1, 1.8, 0))
      },
      bonds: [
        {
          id: "bond_001",
          atomIds: ["C1", "O1"],
          order: 2,
          strength: 1.0,
          bondType: BondType.COVALENT
        },
        {
          id: "bond_002",
          atomIds: ["C1", "O2"],
          order: 1,
          strength: 0.4,
          bondType: BondType.IONIC
        },
        {
          id: "bond_003",
          atomIds: ["C1", "O3"],
          order: 1,
          strength: 0.4,
          bondType: BondType.IONIC
        },
        {
          id: "bond_004",
          atomIds: ["O2", "H1"],
          order: 1,
          strength: 0.8,
          bondType: BondType.METALLIC
        },
        {
          id: "bond_005",
          atomIds: ["O3", "H2"],
          order: 1,
          strength: 0.8,
          bondType: BondType.METALLIC
        }
      ]
    },
    {
      timestamp: 5000,
      atoms: {
        C1: new C(new Vector3(0, 0, 0)),
        O1: new O(new Vector3(1.2, 0, 0)),
        O2: new O(new Vector3(0, 1.5, 0)),
        O3: new O(new Vector3(-1.2, 0, 0)),
        H1: new H(new Vector3(0.8, 2.0, 0)),
        H2: new H(new Vector3(-0.8, 2.0, 0))
      },
      bonds: [
        {
          id: "bond_001",
          atomIds: ["C1", "O1"],
          order: 2,
          strength: 1.0,
          bondType: BondType.COVALENT
        },
        {
          id: "bond_006",
          atomIds: ["C1", "O3"],
          order: 2,
          strength: 1.0,
          bondType: BondType.COVALENT
        },
        {
          id: "bond_007",
          atomIds: ["O2", "H1"],
          order: 1,
          strength: 1.0,
          bondType: BondType.COVALENT
        },
        {
          id: "bond_008",
          atomIds: ["O2", "H2"],
          order: 1,
          strength: 1.0,
          bondType: BondType.COVALENT
        }
      ]
    }
  ]
};