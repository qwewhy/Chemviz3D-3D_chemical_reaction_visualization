/**
 * @file carbonic-acid.ts
 * @author [Hongyuan Wang] <HW8545626@gmail.com>
 * @copyright Copyright (c) 2024 [Hongyuan Wang]
 * @license MIT
 */

import { ChemxFile } from '../types/ChemxTypes';
import { C } from '../../models/atoms/C';
import { O } from '../../models/atoms/O';
import { H } from '../../models/atoms/H';
import { N } from '../../models/atoms/N';

import { Vector3 } from 'three';
import { BondType } from '../types/ChemxTypes';

export const DEFAULT_REACTION: ChemxFile = {
  version: "1.0",
  metadata: {
    name: "Default raction example - Protein dehydration condensation",
    description: "CH2NH2COOH + CH2NH2COOH → CH2NH2CO-NH-CH2COOH + H2O",
    created: 1733008696630,
  },
  duration: 6000,
  keyframes: [
    {
      timestamp: 0,
      atoms: {
        atom_9839: new C(new Vector3(-3.462050920279271, -1, 6.3730321963449486)),
        atom_3871: new H(new Vector3(-4.044684184409024, 1, 7.50081894437143)),
        atom_4480: new H(new Vector3(-5.513443614159361, -1, 7.371466183413117)),
        atom_1135: new N(new Vector3(-1.2389528777552672, 1, 6.384133280634699)),
        atom_4046: new H(new Vector3(0.15171439038261064, 0, 7.723840437505821)),
        atom_4647: new H(new Vector3(0.3259001483183345, 2, 5.981483337692893)),
        atom_9131: new C(new Vector3(-3.6035040821701703, 0, 4.189461282510921)),
        atom_3459: new O(new Vector3(-5.406331665288482, 1, 4.308348851219371)),
        atom_4689: new O(new Vector3(-2.5628578769308596, -1, 2.272336537399185)),
        atom_7024: new H(new Vector3(-3.477778390582905, 0, 0.7726059208243374)),
        atom_4000: new N(new Vector3(-2.9818240495545414, 0, -3.106404803173334)),
        atom_7108: new H(new Vector3(-4.8025477868176765, -1, -1.91447410185879)),
        atom_8238: new H(new Vector3(-3.1615824414786893, 1, -1.5497331231617104)),
        atom_4116: new C(new Vector3(-3.060534487994493, 1, -5.339674719539514)),
        atom_7910: new H(new Vector3(-4.885583772289303, 2, -5.130355990257773)),
        atom_8928: new H(new Vector3(-1.5243255238715168, 0, -5.260317544753986)),
        atom_4905: new C(new Vector3(-3.2157828393879577, -1, -7.533448107443063)),
        atom_9425: new O(new Vector3(-5.08307443425627, 0, -7.4734387931167205)),
        atom_0508: new O(new Vector3(-1.4121659929942594, 0, -7.519674772685373)),
        atom_3023: new H(new Vector3(0.0021353468412437238, -1, -7.429444334905202)),
      },
      bonds: [
        {
          id: "bond_001",
          atomIds: ["atom_3871", "atom_9839"],
          order: 1,
          strength: 1,
          bondType: BondType.COVALENT
        },
        {
          id: "bond_002",
          atomIds: ["atom_4480", "atom_9839"],
          order: 1,
          strength: 1,
          bondType: BondType.COVALENT
        },
        {
          id: "bond_003",
          atomIds: ["atom_4046", "atom_1135"],
          order: 1,
          strength: 1,
          bondType: BondType.COVALENT
        },
        {
          id: "bond_004",
          atomIds: ["atom_4647", "atom_1135"],
          order: 1,
          strength: 1,
          bondType: BondType.COVALENT
        },
        {
          id: "bond_005",
          atomIds: ["atom_1135", "atom_9839"],
          order: 1,
          strength: 1,
          bondType: BondType.COVALENT
        },
        {
          id: "bond_006",
          atomIds: ["atom_9839", "atom_9131"],
          order: 1,
          strength: 1,
          bondType: BondType.COVALENT
        },
        {
          id: "bond_007",
          atomIds: ["atom_9131", "atom_3459"],
          order: 1,
          strength: 1,
          bondType: BondType.COVALENT
        },
        {
          id: "bond_008",
          atomIds: ["atom_9131", "atom_4689"],
          order: 1,
          strength: 1,
          bondType: BondType.COVALENT
        },
        {
          id: "bond_009",
          atomIds: ["atom_4689", "atom_7024"],
          order: 1,
          strength: 1,
          bondType: BondType.COVALENT
        },
        {
          id: "bond_010",
          atomIds: ["atom_8238", "atom_4000"],
          order: 1,
          strength: 1,
          bondType: BondType.COVALENT
        },
        {
          id: "bond_011",
          atomIds: ["atom_7108", "atom_4000"],
          order: 1,
          strength: 1,
          bondType: BondType.COVALENT
        },
        {
          id: "bond_012",
          atomIds: ["atom_7910", "atom_4116"],
          order: 1,
          strength: 1,
          bondType: BondType.COVALENT
        },
        {
          id: "bond_013",
          atomIds: ["atom_4116", "atom_8928"],
          order: 1,
          strength: 1,
          bondType: BondType.COVALENT
        },
        {
          id: "bond_014",
          atomIds: ["atom_4116", "atom_4000"],
          order: 1,
          strength: 1,
          bondType: BondType.COVALENT
        },
        {
          id: "bond_015",
          atomIds: ["atom_9425", "atom_4905"],
          order: 1,
          strength: 1,
          bondType: BondType.COVALENT
        },
        {
          id: "bond_016",
          atomIds: ["atom_4905", "atom_0508"],
          order: 1,
          strength: 1,
          bondType: BondType.COVALENT
        },
        {
          id: "bond_017",
          atomIds: ["atom_0508", "atom_3023"],
          order: 1,
          strength: 1,
          bondType: BondType.COVALENT
        },
        {
          id: "bond_018",
          atomIds: ["atom_4905", "atom_4116"],
          order: 1,
          strength: 1,
          bondType: BondType.COVALENT
        },
      ]
    },
    {
      timestamp: 2000,
      atoms: {
        atom_9839: new C(new Vector3(-3.462050920279271, -1, 6.3730321963449486)),
        atom_3871: new H(new Vector3(-4.044684184409024, 1, 7.50081894437143)),
        atom_4480: new H(new Vector3(-5.513443614159361, -1, 7.371466183413117)),
        atom_1135: new N(new Vector3(-1.2389528777552672, 1, 6.384133280634699)),
        atom_4046: new H(new Vector3(0.15171439038261064, 0, 7.723840437505821)),
        atom_4647: new H(new Vector3(0.3259001483183345, 2, 5.981483337692893)),
        atom_9131: new C(new Vector3(-3.6035040821701703, 0, 4.189461282510921)),
        atom_3459: new O(new Vector3(-5.406331665288482, 1, 4.308348851219371)),
        atom_4689: new O(new Vector3(-2.5628578769308596, -1, -0.7276634626008152)),
        atom_7024: new H(new Vector3(-2.477778390582905, 0, 0.7726059208243374)),
        atom_4000: new N(new Vector3(-2.9818240495545414, 0, -3.106404803173334)),
        atom_7108: new H(new Vector3(-4.8025477868176765, -1, -1.91447410185879)),
        atom_8238: new H(new Vector3(-3.1615824414786893, 0, -1.5497331231617104)),
        atom_4116: new C(new Vector3(-3.060534487994493, 1, -5.339674719539514)),
        atom_7910: new H(new Vector3(-4.885583772289303, 2, -5.130355990257773)),
        atom_8928: new H(new Vector3(-1.5243255238715168, 0, -5.260317544753986)),
        atom_4905: new C(new Vector3(-3.2157828393879577, -1, -7.533448107443063)),
        atom_9425: new O(new Vector3(-5.08307443425627, 0, -7.4734387931167205)),
        atom_0508: new O(new Vector3(-1.4121659929942594, 0, -7.519674772685373)),
        atom_3023: new H(new Vector3(0.0021353468412437238, -1, -7.429444334905202)),
      },
      bonds: [
        {
          id: "bond_001",
          atomIds: ["atom_3871", "atom_9839"],
          order: 1,
          strength: 1,
          bondType: BondType.COVALENT
        },
        {
          id: "bond_002",
          atomIds: ["atom_4480", "atom_9839"],
          order: 1,
          strength: 1,
          bondType: BondType.COVALENT
        },
        {
          id: "bond_003",
          atomIds: ["atom_4046", "atom_1135"],
          order: 1,
          strength: 1,
          bondType: BondType.COVALENT
        },
        {
          id: "bond_004",
          atomIds: ["atom_4647", "atom_1135"],
          order: 1,
          strength: 1,
          bondType: BondType.COVALENT
        },
        {
          id: "bond_005",
          atomIds: ["atom_1135", "atom_9839"],
          order: 1,
          strength: 1,
          bondType: BondType.COVALENT
        },
        {
          id: "bond_006",
          atomIds: ["atom_9839", "atom_9131"],
          order: 1,
          strength: 1,
          bondType: BondType.COVALENT
        },
        {
          id: "bond_007",
          atomIds: ["atom_9131", "atom_3459"],
          order: 1,
          strength: 1,
          bondType: BondType.COVALENT
        },
        {
          id: "bond_008",
          atomIds: ["atom_4689", "atom_7024"],
          order: 1,
          strength: 1,
          bondType: BondType.COVALENT
        },
        {
          id: "bond_009",
          atomIds: ["atom_7108", "atom_4000"],
          order: 1,
          strength: 1,
          bondType: BondType.COVALENT
        },
        {
          id: "bond_010",
          atomIds: ["atom_7910", "atom_4116"],
          order: 1,
          strength: 1,
          bondType: BondType.COVALENT
        },
        {
          id: "bond_011",
          atomIds: ["atom_4116", "atom_8928"],
          order: 1,
          strength: 1,
          bondType: BondType.COVALENT
        },
        {
          id: "bond_012",
          atomIds: ["atom_4116", "atom_4000"],
          order: 1,
          strength: 1,
          bondType: BondType.COVALENT
        },
        {
          id: "bond_013",
          atomIds: ["atom_9425", "atom_4905"],
          order: 1,
          strength: 1,
          bondType: BondType.COVALENT
        },
        {
          id: "bond_014",
          atomIds: ["atom_4905", "atom_0508"],
          order: 1,
          strength: 1,
          bondType: BondType.COVALENT
        },
        {
          id: "bond_015",
          atomIds: ["atom_0508", "atom_3023"],
          order: 1,
          strength: 1,
          bondType: BondType.COVALENT
        },
        {
          id: "bond_016",
          atomIds: ["atom_4905", "atom_4116"],
          order: 1,
          strength: 1,
          bondType: BondType.COVALENT
        },
        {
          id: "bond_017",
          atomIds: ["atom_8238", "atom_4689"],
          order: 1,
          strength: 1,
          bondType: BondType.COVALENT
        },
      ]
    },
    {
      timestamp: 4000,
      atoms: {
        atom_9839: new C(new Vector3(-3.462050920279271, -1, 3.3730321963449486)),
        atom_3871: new H(new Vector3(-4.044684184409024, 1, 4.50081894437143)),
        atom_4480: new H(new Vector3(-5.513443614159361, -1, 4.371466183413117)),
        atom_1135: new N(new Vector3(-1.2389528777552672, 1, 3.384133280634699)),
        atom_4046: new H(new Vector3(0.15171439038261064, 0, 4.723840437505821)),
        atom_4647: new H(new Vector3(0.3259001483183345, 2, 2.981483337692893)),
        atom_9131: new C(new Vector3(-3.6035040821701703, 0, 1.189461282510921)),
        atom_3459: new O(new Vector3(-5.406331665288482, 1, 1.308348851219371)),
        atom_4689: new O(new Vector3(1.4371421230691404, -1, -0.7276634626008152)),
        atom_7024: new H(new Vector3(1.522221609417095, 0, 0.7726059208243374)),
        atom_4000: new N(new Vector3(-2.9818240495545414, 0, -1.106404803173334)),
        atom_7108: new H(new Vector3(-4.8025477868176765, -1, 0.08552589814120992)),
        atom_8238: new H(new Vector3(0.8384175585213107, 0, -1.5497331231617104)),
        atom_4116: new C(new Vector3(-3.060534487994493, 1, -3.339674719539514)),
        atom_7910: new H(new Vector3(-4.885583772289303, 2, -3.1303559902577733)),
        atom_8928: new H(new Vector3(-1.5243255238715168, 0, -3.2603175447539856)),
        atom_4905: new C(new Vector3(-3.2157828393879577, -1, -5.533448107443063)),
        atom_9425: new O(new Vector3(-5.08307443425627, 0, -5.4734387931167205)),
        atom_0508: new O(new Vector3(-1.4121659929942594, 0, -5.519674772685373)),
        atom_3023: new H(new Vector3(0.0021353468412437238, -1, -4.429444334905202)),
      },
      bonds: [
        {
          id: "bond_001",
          atomIds: ["atom_3871", "atom_9839"],
          order: 1,
          strength: 1,
          bondType: BondType.COVALENT
        },
        {
          id: "bond_002",
          atomIds: ["atom_4480", "atom_9839"],
          order: 1,
          strength: 1,
          bondType: BondType.COVALENT
        },
        {
          id: "bond_003",
          atomIds: ["atom_4046", "atom_1135"],
          order: 1,
          strength: 1,
          bondType: BondType.COVALENT
        },
        {
          id: "bond_004",
          atomIds: ["atom_4647", "atom_1135"],
          order: 1,
          strength: 1,
          bondType: BondType.COVALENT
        },
        {
          id: "bond_005",
          atomIds: ["atom_1135", "atom_9839"],
          order: 1,
          strength: 1,
          bondType: BondType.COVALENT
        },
        {
          id: "bond_006",
          atomIds: ["atom_9839", "atom_9131"],
          order: 1,
          strength: 1,
          bondType: BondType.COVALENT
        },
        {
          id: "bond_007",
          atomIds: ["atom_9131", "atom_3459"],
          order: 1,
          strength: 1,
          bondType: BondType.COVALENT
        },
        {
          id: "bond_008",
          atomIds: ["atom_4689", "atom_7024"],
          order: 1,
          strength: 1,
          bondType: BondType.COVALENT
        },
        {
          id: "bond_009",
          atomIds: ["atom_7108", "atom_4000"],
          order: 1,
          strength: 1,
          bondType: BondType.COVALENT
        },
        {
          id: "bond_010",
          atomIds: ["atom_7910", "atom_4116"],
          order: 1,
          strength: 1,
          bondType: BondType.COVALENT
        },
        {
          id: "bond_011",
          atomIds: ["atom_4116", "atom_8928"],
          order: 1,
          strength: 1,
          bondType: BondType.COVALENT
        },
        {
          id: "bond_012",
          atomIds: ["atom_4116", "atom_4000"],
          order: 1,
          strength: 1,
          bondType: BondType.COVALENT
        },
        {
          id: "bond_013",
          atomIds: ["atom_9425", "atom_4905"],
          order: 1,
          strength: 1,
          bondType: BondType.COVALENT
        },
        {
          id: "bond_014",
          atomIds: ["atom_4905", "atom_0508"],
          order: 1,
          strength: 1,
          bondType: BondType.COVALENT
        },
        {
          id: "bond_015",
          atomIds: ["atom_0508", "atom_3023"],
          order: 1,
          strength: 1,
          bondType: BondType.COVALENT
        },
        {
          id: "bond_016",
          atomIds: ["atom_4905", "atom_4116"],
          order: 1,
          strength: 1,
          bondType: BondType.COVALENT
        },
        {
          id: "bond_017",
          atomIds: ["atom_8238", "atom_4689"],
          order: 1,
          strength: 1,
          bondType: BondType.COVALENT
        },
        {
          id: "bond_018",
          atomIds: ["atom_9131", "atom_4000"],
          order: 1,
          strength: 1,
          bondType: BondType.COVALENT
        },
      ]
    },
    {
      timestamp: 6000,
      atoms: {
        atom_9839: new C(new Vector3(-3.462050920279271, -1, 3.3730321963449486)),
        atom_3871: new H(new Vector3(-4.044684184409024, 1, 4.50081894437143)),
        atom_4480: new H(new Vector3(-5.513443614159361, -1, 4.371466183413117)),
        atom_1135: new N(new Vector3(-1.2389528777552672, 1, 3.384133280634699)),
        atom_4046: new H(new Vector3(0.15171439038261064, 0, 4.723840437505821)),
        atom_4647: new H(new Vector3(0.3259001483183345, 2, 2.981483337692893)),
        atom_9131: new C(new Vector3(-3.6035040821701703, 0, 1.189461282510921)),
        atom_3459: new O(new Vector3(-5.406331665288482, 1, 1.308348851219371)),
        atom_4689: new O(new Vector3(1.4371421230691404, -1, -0.7276634626008152)),
        atom_7024: new H(new Vector3(1.522221609417095, 0, 0.7726059208243374)),
        atom_4000: new N(new Vector3(-2.9818240495545414, 0, -1.106404803173334)),
        atom_7108: new H(new Vector3(-4.8025477868176765, -1, 0.08552589814120992)),
        atom_8238: new H(new Vector3(0.8384175585213107, 0, -1.5497331231617104)),
        atom_4116: new C(new Vector3(-3.060534487994493, 1, -3.339674719539514)),
        atom_7910: new H(new Vector3(-4.885583772289303, 2, -3.1303559902577733)),
        atom_8928: new H(new Vector3(-1.5243255238715168, 0, -3.2603175447539856)),
        atom_4905: new C(new Vector3(-3.2157828393879577, -1, -5.533448107443063)),
        atom_9425: new O(new Vector3(-5.08307443425627, 0, -5.4734387931167205)),
        atom_0508: new O(new Vector3(-1.4121659929942594, 0, -5.519674772685373)),
        atom_3023: new H(new Vector3(0.0021353468412437238, -1, -4.429444334905202)),
      },
      bonds: [
        {
          id: "bond_001",
          atomIds: ["atom_3871", "atom_9839"],
          order: 1,
          strength: 1,
          bondType: BondType.COVALENT
        },
        {
          id: "bond_002",
          atomIds: ["atom_4480", "atom_9839"],
          order: 1,
          strength: 1,
          bondType: BondType.COVALENT
        },
        {
          id: "bond_003",
          atomIds: ["atom_4046", "atom_1135"],
          order: 1,
          strength: 1,
          bondType: BondType.COVALENT
        },
        {
          id: "bond_004",
          atomIds: ["atom_4647", "atom_1135"],
          order: 1,
          strength: 1,
          bondType: BondType.COVALENT
        },
        {
          id: "bond_005",
          atomIds: ["atom_1135", "atom_9839"],
          order: 1,
          strength: 1,
          bondType: BondType.COVALENT
        },
        {
          id: "bond_006",
          atomIds: ["atom_9839", "atom_9131"],
          order: 1,
          strength: 1,
          bondType: BondType.COVALENT
        },
        {
          id: "bond_007",
          atomIds: ["atom_9131", "atom_3459"],
          order: 1,
          strength: 1,
          bondType: BondType.COVALENT
        },
        {
          id: "bond_008",
          atomIds: ["atom_4689", "atom_7024"],
          order: 1,
          strength: 1,
          bondType: BondType.COVALENT
        },
        {
          id: "bond_009",
          atomIds: ["atom_7108", "atom_4000"],
          order: 1,
          strength: 1,
          bondType: BondType.COVALENT
        },
        {
          id: "bond_010",
          atomIds: ["atom_7910", "atom_4116"],
          order: 1,
          strength: 1,
          bondType: BondType.COVALENT
        },
        {
          id: "bond_011",
          atomIds: ["atom_4116", "atom_8928"],
          order: 1,
          strength: 1,
          bondType: BondType.COVALENT
        },
        {
          id: "bond_012",
          atomIds: ["atom_4116", "atom_4000"],
          order: 1,
          strength: 1,
          bondType: BondType.COVALENT
        },
        {
          id: "bond_013",
          atomIds: ["atom_9425", "atom_4905"],
          order: 1,
          strength: 1,
          bondType: BondType.COVALENT
        },
        {
          id: "bond_014",
          atomIds: ["atom_4905", "atom_0508"],
          order: 1,
          strength: 1,
          bondType: BondType.COVALENT
        },
        {
          id: "bond_015",
          atomIds: ["atom_0508", "atom_3023"],
          order: 1,
          strength: 1,
          bondType: BondType.COVALENT
        },
        {
          id: "bond_016",
          atomIds: ["atom_4905", "atom_4116"],
          order: 1,
          strength: 1,
          bondType: BondType.COVALENT
        },
        {
          id: "bond_017",
          atomIds: ["atom_8238", "atom_4689"],
          order: 1,
          strength: 1,
          bondType: BondType.COVALENT
        },
        {
          id: "bond_018",
          atomIds: ["atom_9131", "atom_4000"],
          order: 1,
          strength: 1,
          bondType: BondType.COVALENT
        },
      ]
    },
  ]
};