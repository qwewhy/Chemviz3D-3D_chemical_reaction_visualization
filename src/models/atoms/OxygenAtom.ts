import { BaseAtom } from './BaseAtom';
import { Vector3 } from 'three';

export class OxygenAtom extends BaseAtom {
  constructor(position?: Vector3) {
    super(
      8,                    // 原子序数
      15.999,              // 原子质量
      'O',                 // 元素符号
      8,                   // 质子数
      8,                   // 中子数
      8,                   // 电子数
      13.618,              // 第一电离能(eV)
      48,                  // 原子半径(pm)
      '#FF0000',           // 显示颜色
      2,                   // 最大成键数
      position
    );
  }
} 