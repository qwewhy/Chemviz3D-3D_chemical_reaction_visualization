/**
 * @file N.ts
 * @author [Hongyuan Wang] <HW8545626@gmail.com>
 * @copyright Copyright (c) 2024 [Hongyuan Wang]
 * @license MIT
 * @description This module implements the N (Nitrogen) atom class, providing
 * atomic properties and 3D positioning calculations.
 */

import { BaseAtom } from './BaseAtom';
import { Vector3 } from 'three';

export class N extends BaseAtom {
  constructor(position?: Vector3) {
    super(
      7,                   // 原子序数 atomicNumber
      14.007,              // 原子质量 atomicMass
      'N',                 // 元素符号 symbol
      7,                   // 质子数 protons
      7,                   // 中子数 neutrons
      7,                   // 电子数 electrons
      14.534,              // 第一电离能 ionizationEnergy (eV)
      70,                  // 原子半径 atomicRadius (pm)
      '#3050F8',           // 显示颜色 color - 蓝色
      3,                   // 最大成键数 maxBonds
      position,            // 位置 position
      0                    // 电荷 charge
    );
  }
} 