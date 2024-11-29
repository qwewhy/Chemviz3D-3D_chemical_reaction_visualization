/**
 * @file O.ts
 * @author [Hongyuan Wang] <HW8545626@gmail.com>
 * @copyright Copyright (c) 2024 [Hongyuan Wang]
 * @license MIT
 * @description This module implements the O (Oxygen) atom class, providing
 * atomic properties and 3D positioning calculations.
 */

import { BaseAtom } from './BaseAtom';
import { Vector3 } from 'three';

export class O extends BaseAtom {
  constructor(position?: Vector3) {
    super(
      8,                   // 原子序数 atomicNumber
      15.999,              // 原子质量 atomicMass
      'O',                 // 元素符号 symbol
      8,                   // 质子数 protons
      8,                   // 中子数 neutrons
      8,                   // 电子数 electrons
      13.618,              // 第一电离能 ionizationEnergy (eV)
      48,                  // 原子半径 atomicRadius (pm)
      '#FF0000',           // 显示颜色 color
      2,                   // 最大成键数 maxBonds 
      position,            // 位置 position 
      0                    // 电荷 charge
    );
  }
} 