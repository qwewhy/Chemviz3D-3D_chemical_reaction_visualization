import { ChemxFile } from '../types/ChemxTypes';
import { C } from '../../models/atoms/C';
import { O } from '../../models/atoms/O';
import { H } from '../../models/atoms/H';
import { Vector3 } from 'three';

export const DEFAULT_REACTION: ChemxFile = {
  version: "1.0",
  metadata: {
    name: "碳酸分解",
    description: "H2CO3 -> H2O + CO2",
    created: 1710669600000
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
          id: "B1",
          atomIds: ["C1", "O1"],
          order: 2,
          strength: 1.0
        },
        {
          id: "B2",
          atomIds: ["C1", "O2"],
          order: 1,
          strength: 1.0
        },
        {
          id: "B3",
          atomIds: ["C1", "O3"],
          order: 1,
          strength: 1.0
        },
        {
          id: "B4",
          atomIds: ["O2", "H1"],
          order: 1,
          strength: 1.0
        },
        {
          id: "B5",
          atomIds: ["O3", "H2"],
          order: 1,
          strength: 1.0
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
          id: "B1",
          atomIds: ["C1", "O1"],
          order: 2,
          strength: 1.0
        },
        {
          id: "B2",
          atomIds: ["C1", "O3"],
          order: 2,
          strength: 1.0
        },
        {
          id: "B3",
          atomIds: ["O2", "H1"],
          order: 1,
          strength: 1.0
        },
        {
          id: "B4",
          atomIds: ["O2", "H2"],
          order: 1,
          strength: 1.0
        }
      ]
    }
  ]
}; 