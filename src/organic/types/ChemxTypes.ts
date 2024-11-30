/**
 * @file ChemxTypes.ts
 * @description 定义化学反应动画文件(.chemx)的所有类型接口和数据结构
 * Defines all type interfaces and data structures for chemical reaction animation files (.chemx)
 */

import { Vector3 } from 'three';
import { BaseAtom } from '../../models/atoms/BaseAtom';

/**
 * 化学键类型枚举
 * Chemical Bond Type Enum
 */
export enum BondType {
  IONIC = "ionic", // 离子键 Ionic bond
  METALLIC = "metallic", // 金属键 Metallic bond
  COVALENT = "covalent", // 共价键 Covalent bond
}

/**
 * 原子状态接口
 * 定义了原子在动画中的基本属性，包括类型和位置信息
 * Atom State Interface
 * Defines basic properties of an atom in animation, including type and position information
 */
export interface AtomState {
  atomicNumber: number;
  atomicMass: number;
  symbol: string;
  protons: number;
  neutrons: number;
  electrons: number;
  ionizationEnergy: number;
  atomicRadius: number;
  color: string;
  maxBonds: number;
  position: Vector3;
  charge?: number;
  currentBonds: number;
}

/**
 * 化学键状态接口
 * 定义了化学键的属性，包括连接的原子、键级和键强度
 * Chemical Bond State Interface
 * Defines properties of a chemical bond, including connected atoms, bond order, and strength
 */
export interface BondState {
  /**
   * 化学键的唯一标识符
   * Unique identifier for the chemical bond
   */
  id: string;

  /**
   * 键连接的两个原子的ID
   * IDs of the two atoms connected by this bond
   */
  atomIds: [string, string];

  /**
   * 键级（单键=1，双键=2，三键=3）
   * Bond order (single=1, double=2, triple=3)
   */
  order: number;

  /**
   * 键强度（用于动画效果）
   * Bond strength (used for animation effects)
   */
  strength: number;

  /**
   * 键类型
   * Bond type
   */
  bondType: BondType;
}

/**
 * 动画关键帧接口
 * 定义了动画中每个关键时刻的状态
 * Animation Keyframe Interface
 * Defines the state at each key moment in the animation
 */
export interface Keyframe {
  /**
   * 关键帧的时间戳（毫秒）
   * Timestamp of the keyframe (in milliseconds)
   */
  timestamp: number;

  /**
   * 该时刻所有原子的状态映射表
   * 键为原子ID，值为原子状态
   * Map of all atom states at this moment
   * Key is atom ID, value is atom state
   */
  atoms: Record<string, AtomState>;

  /**
   * 该时刻所有化学键的状态数组
   * Array of all chemical bond states at this moment
   */
  bonds: BondState[];
}

/**
 * .chemx文件结构接口
 * 定义了整个动画文件的完整结构
 * .chemx File Structure Interface
 * Defines the complete structure of the animation file
 */
export interface ChemxFile {
  /**
   * 文件格式版本号
   * File format version number
   */
  version: string;

  /**
   * 文件元数据
   * File metadata
   */
  metadata: {
    /**
     * 动画名称
     * Animation name
     */
    name: string;
    /**
     * 动画描述
     * Animation description
     */
    description: string;
    /**
     * 创建时间戳（Unix时间戳）
     * Creation timestamp (Unix timestamp)
     */
    created: number;
  };

  /**
   * 动画总时长（毫秒）
   * Total animation duration (in milliseconds)
   */
  duration: number;

  /**
   * 动画关键帧数组
   * Array of animation keyframes
   */
  keyframes: Keyframe[];
}

/**
 * 原子映射表接口
 * 用于存储和快速访问原子实例
 * Atom Map Interface
 * Used for storing and quickly accessing atom instances
 */
export interface AtomMap {
  /**
   * 键为原子ID，值为原子实例
   * Key is atom ID, value is atom instance
   */
  [key: string]: BaseAtom;
}

/**
 * Chemx关键帧接口
 * 用于动画引擎内部处理的优化结构
 * Chemx Keyframe Interface
 * Optimized structure for internal processing by animation engine
 */
export interface ChemxKeyframe {
  /**
   * 关键帧时间戳（毫秒）
   * Keyframe timestamp (in milliseconds)
   */
  timestamp: number;

  /**
   * 原子映射表，存储实际的原子实例
   * Atom map storing actual atom instances
   */
  atoms: AtomMap;
} 