/**
 * @file C.ts
 * @author [Hongyuan Wang] <HW8545626@gmail.com>
 * @copyright Copyright (c) 2024 [Hongyuan Wang]
 * @license MIT
 */

import { BaseAtom } from './BaseAtom';
import { Vector3 } from 'three';

export class C extends BaseAtom {
    constructor(position?: Vector3) {
        super(
            6,                   // 原子序数 atomicNumber
            12.011,              // 原子质量 atomicMass (以12C为主要同位素)
            'C',                 // 元素符号 symbol
            6,                   // 质子数 protons
            6,                   // 中子数 neutrons (12C同位素)
            6,                   // 电子数 electrons
            11.260,              // 第一电离能 ionizationEnergy (eV)
            70,                  // 原子半径 atomicRadius (pm)
            '#909090',           // 显示颜色 color - 标准灰色
            4,                   // 最大成键数 maxBonds (形成4个共价键)
            position,            // 位置 position
            0                    // 电荷 charge
        );
    }
}