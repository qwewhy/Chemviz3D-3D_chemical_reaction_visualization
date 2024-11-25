import { BaseAtom } from './BaseAtom';
import { Vector3 } from 'three';

export class Cl extends BaseAtom {
  constructor(position?: Vector3) {
    super(
      17,                   // 原子序数 atomicNumber
      35.45,               // 原子质量 atomicMass
      'Cl',                // 元素符号 symbol
      17,                  // 质子数 protons
      18,                  // 中子数 neutrons (最常见同位素35Cl)
      17,                  // 电子数 electrons
      12.967,              // 第一电离能 ionizationEnergy (eV)
      100,                 // 原子半径 atomicRadius (pm)
      '#90E050',           // 显示颜色 color - 标准浅绿色
      1,                   // 最大成键数 maxBonds (通常形成单键)
      position             // 位置 position
    );
  }
} 