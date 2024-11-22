import { BaseAtom } from './BaseAtom';
import { Vector3 } from 'three';

export class HydrogenAtom extends BaseAtom {
  constructor(position?: Vector3) {
    super(
      1,                    // 原子序数
      1.008,               // 原子质量
      'H',                 // 元素符号
      1,                   // 质子数
      0,                   // 中子数
      1,                   // 电子数
      13.6,                // 第一电离能(eV)
      53,                  // 原子半径(pm)
      '#FFFFFF',           // 显示颜色
      1,                   // 最大成键数
      position
    );
  }
} 