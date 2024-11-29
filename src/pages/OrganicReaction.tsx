/**
 * @file OrganicReaction.tsx
 * @description 有机化学反应可视化组件，用于展示和控制化学反应动画
 * Organic chemistry reaction visualization component for displaying and controlling chemical reaction animations
 */

import React, { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

import { AnimationEngine } from '../organic/animation/AnimationEngine';
import { FileHandler } from '../organic/utils/FileHandler';
import { ChemxFile, BondState, AtomState } from '../organic/types/ChemxTypes';
import { BaseAtom } from '../models/atoms/BaseAtom';
// 导入默认示例数据 / Import default example data
import { DEFAULT_REACTION } from '../organic/examples/carbonic-acid';

// 添加原子颜色映射
const ATOM_COLORS: { [key: string]: string } = {
  'H': '#FFFFFF',  // 白色
  'C': '#808080',  // 灰色
  'O': '#FF0000',  // 红色
  'N': '#0000FF',  // 蓝色
};

// 添加原子半径映射
const ATOM_RADIUS: { [key: string]: number } = {
  'H': 0.25,  // 氢原子较小
  'C': 0.7,   // 碳原子
  'O': 0.6,   // 氧原子
  'N': 0.65,  // 氮原子
};

/**
 * 原子渲染组件
 * 负责渲染单个原子的3D球体表示
 * Atom Rendering Component
 * Responsible for rendering 3D sphere representation of a single atom
 * 
 * @param atom 原子实例，包含位置、半径等属性
 * @param atom Atom instance containing position, radius, etc.
 */
const Atom = ({ atom }: { atom: BaseAtom }) => {
  const radius = ATOM_RADIUS[atom.symbol] || 0.5;
  const color = ATOM_COLORS[atom.symbol] || '#CCCCCC';
  
  return (
    <mesh position={[atom.position.x, atom.position.y, atom.position.z]}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

/**
 * 化学键渲染组件
 * 使用圆柱体表示原子间的化学键
 * Chemical Bond Rendering Component
 * Uses cylinder to represent chemical bonds between atoms
 * 
 * @param start 键的起始点坐标 Starting point coordinates of the bond
 * @param end 键的终止点坐标 Ending point coordinates of the bond
 */
const Bond = ({ start, end }: { start: THREE.Vector3; end: THREE.Vector3 }) => {
  const direction = new THREE.Vector3().subVectors(end, start);
  const center = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
  const length = direction.length();
  const quaternion = new THREE.Quaternion();
  quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());

  return (
    <mesh position={center} quaternion={quaternion}>
      <cylinderGeometry args={[0.1, 0.1, length]} />
      <meshStandardMaterial color="#FFFFFF" />
    </mesh>
  );
};

// 添加类型定义
interface CurrentFrame {
  atoms: { [key: string]: AtomState };
  bonds: BondState[];  // 确保已导入 BondState 类型
}

/**
 * 有机反应主组件
 * 管理整个化学反应动画的状态和渲染
 * Organic Reaction Main Component
 * Manages state and rendering of the entire chemical reaction animation
 */
const OrganicReaction = () => {
  // 状态管理
  const [animationData, setAnimationData] = useState<ChemxFile>(DEFAULT_REACTION);
  const [currentFrame, setCurrentFrame] = useState<CurrentFrame>(() => ({
    atoms: {},
    bonds: []
  }));
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 引用管理
  const animationEngineRef = useRef<AnimationEngine | null>(null);
  const fileHandlerRef = useRef<FileHandler | null>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  // 初始化文件处理器
  useEffect(() => {
    if (dropZoneRef.current) {
      const fileHandler = new FileHandler(dropZoneRef.current);
      
      fileHandler.setFileLoadedCallback((data: ChemxFile) => {
        console.log('文件加载完成:', data);
        setAnimationData(data);
        setError(null);
        setIsDragging(false);
        
        // 重置动画状态
        if (animationEngineRef.current) {
          animationEngineRef.current.pause();
          animationEngineRef.current.dispose();
        }
        setIsPlaying(false);
      });

      fileHandler.setErrorCallback((errorMessage: string) => {
        setError(errorMessage);
        setIsDragging(false);
      });

      fileHandlerRef.current = fileHandler;
    }
  }, []);

  // 初始化动画引擎
  useEffect(() => {
    if (animationData) {
      console.log('初始化动画引擎');
      const engine = new AnimationEngine(animationData);
      
      engine.setFrameUpdateCallback((atoms, bonds) => {
        setCurrentFrame({ atoms, bonds });
      });

      engine.setPlayStateCallback((playing) => {
        setIsPlaying(playing);
      });

      // 立即设置第一帧
      setCurrentFrame({
        atoms: animationData.keyframes[0].atoms,
        bonds: animationData.keyframes[0].bonds
      });

      animationEngineRef.current = engine;
    }

    return () => {
      if (animationEngineRef.current) {
        animationEngineRef.current.dispose();
      }
    };
  }, [animationData]);

  // 修改拖放事件处理函数
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    // 确保是最外层容器接收到的拖放
    if (e.target !== dropZoneRef.current && !dropZoneRef.current?.contains(e.target as Node)) {
      return;
    }

    setIsDragging(false);
    setError(null);

    const files = e.dataTransfer?.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    try {
      fileHandlerRef.current?.handleFile(file);
    } catch (error) {
      // 错误已经通过 FileHandler 的 errorCallback 处理
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    // 只在进入最外层容器时设置状态
    if (e.target === dropZoneRef.current) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    // 只在离开最外层容器时设置状态
    if (e.target === dropZoneRef.current) {
      setIsDragging(false);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // 确保鼠标指针显示为可放置状态
    e.dataTransfer.dropEffect = 'copy';
  };

  // 动画控制函数
  const handlePlayPause = () => {
    if (animationEngineRef.current) {
      if (isPlaying) {
        animationEngineRef.current.pause();
      } else {
        animationEngineRef.current.play();
      }
    }
  };

  const handleReset = () => {
    if (animationEngineRef.current) {
      animationEngineRef.current.pause();
      animationEngineRef.current.reset();
      setCurrentFrame({
        atoms: animationData.keyframes[0].atoms,
        bonds: animationData.keyframes[0].bonds
      });
    }
  };

  return (
    <div 
      className={`w-full h-screen flex flex-col relative ${
        isDragging ? 'bg-blue-50' : ''
      }`} 
      ref={dropZoneRef}
      onDrop={handleDrop}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
    >
      {/* 拖拽提示遮罩层 - 移到子元素中 */}
      <div 
        className={`absolute inset-0 pointer-events-none transition-opacity duration-200 ${
          isDragging ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="absolute inset-0 bg-blue-500 bg-opacity-20 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-xl text-blue-600">将 .chemx 或 .json 文件拖放到这里</p>
          </div>
        </div>
      </div>

      {/* 错误提示 */}
      {error && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50">
          <p>{error}</p>
        </div>
      )}

      {/* 控制面板 */}
      <div className="flex justify-between p-4 bg-gray-800 z-10">
        <div>
          <h1 className="text-xl text-white">
            {animationData?.metadata.name || '有机反应动画'}
          </h1>
          <p className="text-sm text-gray-400">
            {animationData?.metadata.description || '拖放 .chemx 文件开���查看动画'}
          </p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={handlePlayPause}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {isPlaying ? '暂停' : '播放'}
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            重置
          </button>
        </div>
      </div>

      {/* 3D场景渲染区域 */}
      <div className="flex-1">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          
          {Object.entries(currentFrame.atoms).map(([id, atom]) => (
            <Atom key={id} atom={atom as BaseAtom} />
          ))}
          
          {currentFrame.bonds.map(bond => {
            const startAtom = currentFrame.atoms[bond.atomIds[0]];
            const endAtom = currentFrame.atoms[bond.atomIds[1]];
            if (!startAtom || !endAtom) return null;
            
            return (
              <Bond
                key={bond.id}
                start={startAtom.position}
                end={endAtom.position}
              />
            );
          })}
          
          <OrbitControls />
        </Canvas>
      </div>
    </div>
  );
};

export default OrganicReaction;