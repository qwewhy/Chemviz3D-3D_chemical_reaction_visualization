/**
 * @file AnimationEngine.ts
 * @description 化学反应动画引擎，负责处理原子和分子的动画插值计算
 * Chemical reaction animation engine, responsible for handling animation interpolation of atoms and molecules
 */

import { Vector3 } from 'three';
import { ChemxFile, Keyframe, AtomState, BondState } from '../types/ChemxTypes';
import { BaseAtom } from '../../models/atoms/BaseAtom';

/**
 * 创建原子实例
 * Creates an atom instance
 * @param data 原子数据 Atom data
 * @returns 原子实例 Atom instance
 */
const createAtom = (data: AtomState): BaseAtom => {
  return new (class extends BaseAtom {
    constructor() {
      super(
        data.atomicNumber,
        data.atomicMass,
        data.symbol,
        data.protons,
        data.neutrons,
        data.electrons,
        data.ionizationEnergy,
        data.atomicRadius,
        data.color,
        data.maxBonds,
        data.position,
        data.charge
      );
    }
  })();
};

/**
 * 获取原子半径的辅助函数
 * Helper function to get atomic radius
 * @param symbol 元素符号 Element symbol
 * @returns 原子半径 Atomic radius
 */
const getAtomicRadius = (symbol: string): number => {
  const radiusMap: Record<string, number> = {
    'H': 25,  // 氢原子 Hydrogen
    'C': 70,  // 碳原子 Carbon
    'O': 60,  // 氧原子 Oxygen
    'N': 65,  // 氮原子 Nitrogen
  };
  return radiusMap[symbol] || 50; // 默认值 Default value
};

/**
 * 获取原子颜色的辅助函数
 * Helper function to get atom color
 * @param symbol 元素符号 Element symbol
 * @returns 原子颜色 Atom color
 */
const getAtomColor = (symbol: string): string => {
  const colorMap: Record<string, string> = {
    'H': '#FFFFFF',  // 氢 - 白色 Hydrogen - White
    'C': '#808080',  // 碳 - 灰色 Carbon - Gray
    'O': '#FF0000',  // 氧 - 红色 Oxygen - Red
    'N': '#0000FF',  // 氮 - 蓝色 Nitrogen - Blue
  };
  return colorMap[symbol] || '#CCCCCC'; // 默认颜色 Default color
};

export class AnimationEngine {
  /**
   * 动画数据对象，包含关键帧和元数据信息
   * Animation data object containing keyframes and metadata
   */
  private animationData: ChemxFile;

  /**
   * 当前动画时间(毫秒)
   * Current animation time in milliseconds
   */
  private currentTime: number = 0;

  /**
   * 动画是否正在播放
   * Whether the animation is currently playing
   */
  private isPlaying: boolean = false;

  /**
   * 上一帧的时间戳，用于计算时间增量
   * Timestamp of the last frame, used to calculate time delta
   */
  private lastFrameTime: number = 0;

  /**
   * 帧更新回调函数，当动画帧更新时触发
   * Frame update callback, triggered when animation frame updates
   */
  private frameUpdateCallback: ((atoms: Record<string, BaseAtom>, bonds: BondState[]) => void) | null = null;

  /**
   * 播放状态变化回调函数，当播放状态变化时触发
   * Play state change callback, triggered when play state changes
   */
  private playStateCallback: ((playing: boolean) => void) | null = null;

  /**
   * 动画帧更新请求的ID，用于取消动画帧更新请求
   * Animation frame request ID, used to cancel animation frame update requests
   */
  private animationFrameId: number | null = null;

  /**
   * 构造函数
   * @param data ChemX文件数据
   * Constructor
   * @param data ChemX file data
   */
  constructor(data: ChemxFile) {
    this.animationData = this.preprocessAnimationData(data);
  }

  /**
   * 预处理动画数据，确保所有原子都有正确的属性
   * Preprocess animation data to ensure all atoms have correct properties
   * @param data 原始动画数据 Raw animation data
   * @returns 处理后的动画数据 Processed animation data
   */
  private preprocessAnimationData(data: ChemxFile): ChemxFile {
    return {
      ...data,
      keyframes: data.keyframes.map(keyframe => ({
        ...keyframe,
        atoms: Object.fromEntries(
          Object.entries(keyframe.atoms).map(([id, atom]) => [id, createAtom(atom as AtomState)])
        )
      }))
    };
  }

  /**
   * 设置帧更新回调函数
   * @param callback 回调函数，接收当前帧的原子和键数据
   * Set frame update callback
   * @param callback Callback function receiving current frame's atoms and bonds data
   */
  public setFrameUpdateCallback(callback: (atoms: Record<string, BaseAtom>, bonds: BondState[]) => void) {
    this.frameUpdateCallback = callback;
  }

  /**
   * 设置播放状态变化回调函数
   * @param callback 回调函数，接收当前播放状态
   * Set play state change callback
   * @param callback Callback function receiving current play state
   */
  public setPlayStateCallback(callback: (playing: boolean) => void) {
    this.playStateCallback = callback;
  }

  /**
   * 开始播放动画
   * Start playing animation
   */
  public play() {
    if (!this.isPlaying) {
      this.isPlaying = true;
      this.lastFrameTime = performance.now();
      this.playStateCallback?.(true);
      this.animate();
    }
  }

  /**
   * 暂停动画
   * Pause animation
   */
  public pause() {
    this.isPlaying = false;
    this.playStateCallback?.(false);
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  /**
   * 重置动画到初始状态
   * Reset animation to initial state
   */
  public reset() {
    this.currentTime = 0;
    this.frameUpdateCallback?.(
      this.animationData.keyframes[0].atoms,
      this.animationData.keyframes[0].bonds
    );
  }

  /**
   * 销毁动画引擎
   * Dispose animation engine
   */
  public dispose() {
    this.pause();
    this.frameUpdateCallback = null;
    this.playStateCallback = null;
  }

  /**
   * 在两个关键帧之间进行插值计算
   * @param frame1 第一个关键帧
   * @param frame2 第二个关键帧
   * @param t 插值系数(0-1)
   * Interpolate between two keyframes
   * @param frame1 First keyframe
   * @param frame2 Second keyframe
   * @param t Interpolation factor(0-1)
   */
  private interpolateFrames(frame1: Keyframe, frame2: Keyframe, t: number) {
    const interpolatedAtoms: Record<string, BaseAtom> = {};
    
    Object.entries(frame1.atoms).forEach(([atomId, atom1]) => {
      const atom2 = frame2.atoms[atomId];
      if (!atom2) return;
  
      const newPosition = new Vector3().lerpVectors(
        atom1.position,
        atom2.position,
        t
      );
  
      // Create a new atom instance with interpolated values
      const interpolatedAtom = new (class extends BaseAtom {
        constructor() {
          super(
            atom1.atomicNumber,
            atom1.atomicMass,
            atom1.symbol,
            atom1.protons,
            atom1.neutrons,
            atom1.electrons,
            atom1.ionizationEnergy,
            atom1.atomicRadius,
            atom1.color,
            atom1.maxBonds,
            newPosition,
            atom1.charge + (atom2.charge - atom1.charge) * t
          );
        }
      })();
  
      interpolatedAtom.currentBonds = Math.round(
        atom1.currentBonds + (atom2.currentBonds - atom1.currentBonds) * t
      );
      
      interpolatedAtoms[atomId] = interpolatedAtom;
    });
  
    // Calculate bond interpolation
    const interpolatedBonds = frame1.bonds.map(bond => {
      const bond2 = frame2.bonds.find(b => b.id === bond.id);
      if (!bond2) return bond;
  
      return {
        ...bond,
        strength: bond.strength + (bond2.strength - bond.strength) * t
      };
    });
  
    return {
      atoms: interpolatedAtoms,
      bonds: interpolatedBonds
    };
  }

  /**
   * 动画循环函数
   * Animation loop function
   */
  private animate = () => {
    if (!this.isPlaying) return;

    const currentTime = performance.now();
    const deltaTime = currentTime - this.lastFrameTime;
    this.lastFrameTime = currentTime;

    this.currentTime += deltaTime;
    if (this.currentTime >= this.animationData.duration) {
      this.currentTime = 0;
    }

    this.updateFrame();
    this.animationFrameId = requestAnimationFrame(this.animate);
  };

  /**
   * 更新当前帧
   * Update current frame
   */
  private updateFrame() {
    const { keyframes } = this.animationData;
    if (keyframes.length === 0) return;
    
    // 找到当前时间所在的关键帧索引
    // Find keyframe index for current time
    let frameIndex = 0;
    while (frameIndex < keyframes.length - 1 && 
           keyframes[frameIndex + 1].timestamp < this.currentTime) {
      frameIndex++;
    }

    if (frameIndex < keyframes.length - 1) {
      const frame1 = keyframes[frameIndex];
      const frame2 = keyframes[frameIndex + 1];
      const t = (this.currentTime - frame1.timestamp) / 
                (frame2.timestamp - frame1.timestamp);
      
      const interpolated = this.interpolateFrames(frame1, frame2, t);
      this.frameUpdateCallback?.(interpolated.atoms, interpolated.bonds);
    } else {
      const lastFrame = keyframes[frameIndex];
      this.frameUpdateCallback?.(lastFrame.atoms, lastFrame.bonds);
    }
  }
}