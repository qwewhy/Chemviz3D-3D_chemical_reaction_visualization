import { BaseAtom } from './BaseAtom';
import { Vector3 } from 'three';

export class H extends BaseAtom {
  constructor(position?: Vector3) {
    super(
      1,                    // 原子序数 atomicNumber
      1.008,               // 原子质量 atomicMass
      'H',                 // 元素符号 symbol
      1,                   // 质子数 protons
      0,                   // 中子数 neutrons
      1,                   // 电子数 electrons
      13.598,              // 第一电离能 ionizationEnergy (eV)
      25,                  // 原子半径 atomicRadius (pm)
      '#FFFFFF',           // 显示颜色 color - 白色
      1,                   // 最大成键数 maxBonds
      position             // 位置 position
    );
  }
} 