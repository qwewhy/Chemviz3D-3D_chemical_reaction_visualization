/**
 * @file OrganicReaction.tsx
 * @description 有机化学反应可视化组件，用于展示和控制化学反应动画
 * Organic chemistry reaction visualization component for displaying and controlling chemical reaction animations
 */

import React, { useEffect, useRef, useState, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useTranslation } from "react-i18next";
import { Text } from '@react-three/drei';

import { AnimationEngine } from "../organic/animation/AnimationEngine";
import { FileHandler } from "../organic/utils/FileHandler";
import {
  ChemxFile,
  BondState,
  AtomState,
  BondType,
} from "../organic/types/ChemxTypes";
import { BaseAtom } from "../models/atoms/BaseAtom";
// 导入默认示例数据 / Import default example data
import { DEFAULT_REACTION } from "../organic/examples/carbonic-acid";

// 添加原子颜色映射
const ATOM_COLORS: { [key: string]: string } = {
  // 第一周期
  H: '#FFFFFF',  // 氢 - 白色
  
  // 第二周期
  B: '#FFB5B5',  // 硼 - 浅粉色
  C: '#808080',  // 碳 - 灰色
  N: '#0000FF',  // 氮 - 蓝色
  O: '#FF0000',  // 氧 - 红色
  F: '#90E050',  // 氟 - 浅绿色
  
  // 第三周期
  Na: '#AB5CF2', // 钠 - 紫色
  Mg: '#8AFF00', // 镁 - 亮绿色
  Al: '#BFA6A6', // 铝 - 银灰色
  Si: '#F0C8A0', // 硅 - 米色
  P: '#FF8000',  // 磷 - 橙色
  S: '#FFFF30',  // 硫 - 黄色
  Cl: '#1FF01F', // 氯 - 绿色
  
  // 第四周期
  K: '#8F40D4',  // 钾 - 深紫色
  Ca: '#808090', // 钙 - 深灰色
  As: '#BD80E3', // 砷 - 紫红色
  Se: '#FFA100', // 硒 - 深橙色
  Br: '#A62929', // 溴 - 棕红色
  
  // 第五周期
  I: '#940094',  // 碘 - 紫色
  Pb: '#575961', // 铅 - 铅灰色
  
  // 常见过渡金属
  Fe: '#FFA500', // 铁 - 橙色
  Cu: '#C88033', // 铜 - 铜色
  Zn: '#7D80B0', // 锌 - 蓝灰色
  Hg: '#D4B454', // 汞 - 黄色
};

// 添加原子半径映射
const ATOM_RADIUS: { [key: string]: number } = {
  // 第一周期
  H: 0.25,  // 氢
  
  // 第二周期
  B: 0.85,  // 硼
  C: 0.70,  // 碳
  N: 0.65,  // 氮
  O: 0.60,  // 氧
  F: 0.50,  // 氟
  
  // 第三周期
  Na: 1.80,  // 钠
  Mg: 1.50,  // 镁
  Al: 1.25,  // 铝
  Si: 1.10,  // 硅
  P: 1.00,   // 磷
  S: 1.00,   // 硫
  Cl: 0.75,  // 氯
  
  // 第四周期
  K: 2.20,   // 钾
  Ca: 1.95,  // 钙
  As: 1.15,  // 砷
  Se: 1.15,  // 硒
  Br: 0.85,  // 溴
  
  // 第五周期
  I: 0.98,   // 碘
  Pb: 1.75,  // 铅
  
  // 常见过渡金属
  Fe: 1.40,  // 铁
  Cu: 1.35,  // 铜
  Zn: 1.35,  // 锌
  Hg: 1.35,  // 汞
};

// 定义不同类型化学键的样式
const BOND_STYLES: Record<BondType, BondStyle> = {
  [BondType.IONIC]: {
    color: "#FF0000",
    radius: 0.08,
    dashed: true,
    dashSize: 0.2,
    gapSize: 0.1,
  },
  [BondType.METALLIC]: {
    color: "#FFFFFF",
    radius: 0.1,
    dashed: false,
  },
  [BondType.COVALENT]: {
    color: "#00FF00",
    radius: 0.12,
    dashed: false,
  },
};

// 化学键类型
interface BondStyle {
  color: string;
  radius: number;
  dashed: boolean;
  dashSize?: number; // 可选属性
  gapSize?: number; // 可选属性
}

/**
 * 原子渲染组件
 * 负责渲染单个原子的3D球体表示
 * Atom Rendering Component
 * Responsible for rendering 3D sphere representation of a single atom
 */
const Atom = ({ atom }: { atom: BaseAtom }) => {
  const radius = ATOM_RADIUS[atom.symbol] || 0.5;
  const color = ATOM_COLORS[atom.symbol] || "#CCCCCC";

  return (
    <mesh position={[atom.position.x, atom.position.y, atom.position.z]}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

/**
 * 化学键渲染组件
 * Uses different rendering methods for different bond types
 */
interface BondProps {
  start: THREE.Vector3;
  end: THREE.Vector3;
  bondType: BondType;
}

const Bond: React.FC<BondProps> = ({
  start,
  end,
  bondType = BondType.COVALENT,
}) => {
  // 获取键类型对应的样式，如果未找到则使用默认样式 
  // Get the style corresponding to the bond type, if not found, use the default style
  const style = BOND_STYLES[bondType] || BOND_STYLES[BondType.COVALENT];

  if (style.dashed) {
    // 创建虚线效果
    const points = useMemo(() => [start, end], [start, end]);
    const lineGeometry = useMemo(
      () => new THREE.BufferGeometry().setFromPoints(points),
      [points]
    );

    return (
      <group>
        <primitive object={lineGeometry} />
        <lineSegments geometry={lineGeometry}>
          <lineDashedMaterial
            color={style.color}
            dashSize={style.dashSize || 0.2}
            gapSize={style.gapSize || 0.1}
            scale={1}
            linewidth={2}
          />
        </lineSegments>
      </group>
    );
  }

  // 实线使用圆柱体表示
  const direction = new THREE.Vector3().subVectors(end, start);
  const center = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
  const length = direction.length();
  const quaternion = new THREE.Quaternion();
  quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    direction.normalize()
  );

  return (
    <mesh position={center} quaternion={quaternion}>
      <cylinderGeometry args={[style.radius, style.radius, length, 16]} />
      <meshStandardMaterial
        color={style.color}
        metalness={0.5}
        roughness={0.5}
      />
    </mesh>
  );
};

// 添加类型定义
interface CurrentFrame {
  atoms: { [key: string]: AtomState };
  bonds: BondState[];
}

// 修改坐标轴组件 / Modify Axes component
const Axes: React.FC<{ size?: number }> = ({ size = 2 }) => {
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (groupRef.current) {
      // 创建坐标轴 / Create axes helper
      const axesHelper = new THREE.AxesHelper(size);
      
      // 创建箭头 - 箭头大小为轴长的2% / Create arrows - arrow size is 2% of axis length
      const arrowSize = size * 0.02; 
      // 创建圆锥体几何体作为箭头 / Create cone geometries as arrows
      const xArrow = new THREE.ConeGeometry(arrowSize, arrowSize * 2, 8);
      const yArrow = new THREE.ConeGeometry(arrowSize, arrowSize * 2, 8);
      const zArrow = new THREE.ConeGeometry(arrowSize, arrowSize * 2, 8);

      // 创建材质 - 使用与轴相同的颜色 / Create materials - use same colors as axes
      const xMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // 红色 / Red
      const yMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // 绿色 / Green
      const zMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff }); // 蓝色 / Blue

      // 创建箭头网格 / Create arrow meshes
      const xArrowMesh = new THREE.Mesh(xArrow, xMaterial);
      const yArrowMesh = new THREE.Mesh(yArrow, yMaterial);
      const zArrowMesh = new THREE.Mesh(zArrow, zMaterial);

      // 设置箭头位置 - 放置在轴的末端 / Set arrow positions - place at the end of axes
      xArrowMesh.position.set(size, 0, 0);
      yArrowMesh.position.set(0, size, 0);
      zArrowMesh.position.set(0, 0, size);

      // 设置箭头旋转 - 使箭头指向正确方向 / Set arrow rotations - make arrows point in correct directions
      xArrowMesh.rotation.z = -Math.PI / 2;
      zArrowMesh.rotation.x = Math.PI / 2;

      // 将所有元素添加到组中 / Add all elements to the group
      groupRef.current.add(axesHelper);
      groupRef.current.add(xArrowMesh);
      groupRef.current.add(yArrowMesh);
      groupRef.current.add(zArrowMesh);
    }
  }, [size]);

  // 添加轴标签 / Add axis labels
  return (
    <group ref={groupRef}>
      <Text
        position={[size + 0.2, 0, 0]}
        fontSize={0.2}
        color="red"
      >
        X
      </Text>
      <Text
        position={[0, size + 0.2, 0]}
        fontSize={0.2}
        color="green"
      >
        Y
      </Text>
      <Text
        position={[0, 0, size + 0.2]}
        fontSize={0.2}
        color="blue"
      >
        Z
      </Text>
    </group>
  );
};

// 修改化学键图例组件
const BondLegend: React.FC = () => {
  const { t } = useTranslation();

  return (  
    <div className="absolute left-4 bottom-4 bg-gray-800/80 p-4 rounded-lg z-10 backdrop-blur-sm">
      <h3 className="text-white text-sm mb-2">{t('bonds.types.title', 'BondTypes')}</h3>
      <div className="space-y-3">
        {Object.entries(BOND_STYLES).map(([type, style]) => {
          const bondType = type.toLowerCase();
          return (
            <div key={type} className="space-y-1">
              <div className="flex items-center gap-2">
                <div
                  className="w-12 h-2 rounded"
                  style={{
                    background: style.color,
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderStyle: style.dashed ? "dashed" : "solid",
                  }}
                />
                <span className="text-white text-xs">
                  {t(`bonds.types.${bondType}.name`)}
                </span>
                <button 
                  className="ml-1 text-gray-400 hover:text-white"
                  title={t(`bonds.types.${bondType}.description`)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              <p className="text-xs text-gray-400 pl-14">
                {t(`bonds.types.${bondType}.description`)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/**
 * 有机反应主组件
 * 管理整个化学反应动画的状态和渲染
 * Organic Reaction Main Component
 * Manages state and rendering of the entire chemical reaction animation
 */
const OrganicReaction = () => {
  // 状态管理
  const [animationData, setAnimationData] =
    useState<ChemxFile>(DEFAULT_REACTION);
  const [currentFrame, setCurrentFrame] = useState<CurrentFrame>(() => ({
    atoms: {},
    bonds: [],
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
        console.log("file loaded finished", data);
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
      console.log("initialize animation engine");
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
        bonds: animationData.keyframes[0].bonds,
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
    if (
      e.target !== dropZoneRef.current &&
      !dropZoneRef.current?.contains(e.target as Node)
    ) {
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
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    // 检查是否真的离开了容器
    const rect = dropZoneRef.current?.getBoundingClientRect();
    if (rect) {
      const { clientX, clientY } = e;
      if (
        clientX <= rect.left ||
        clientX >= rect.right ||
        clientY <= rect.top ||
        clientY >= rect.bottom
      ) {
        setIsDragging(false);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // 确保鼠标指针显示为可放置状态
    e.dataTransfer.dropEffect = "copy";
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
        bonds: animationData.keyframes[0].bonds,
      });
    }
  };

  return (
    <div
      className="w-full h-screen flex flex-col relative"
      ref={dropZoneRef}
      onDrop={handleDrop}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
    >
      {/* 修改遮罩层样式 */}
      <div
        className={`fixed inset-0 z-50 pointer-events-none transition-opacity duration-200 ${
          isDragging ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-blue-500 bg-opacity-20 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white p-8 rounded-xl shadow-2xl transform scale-110">
            <p className="text-2xl text-blue-600 font-semibold">
              .chemx or .json file drag here
            </p>
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
            {animationData?.metadata.name || "Organic Reaction Animation"}
          </h1>
          <p className="text-sm text-gray-400">
            {animationData?.metadata.description ||
              "Drag .chemx or .json file here"}
          </p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={handlePlayPause}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Reset
          </button>
        </div>
      </div>

      {/* 3D场景渲染区域 */}
      <div className="flex-1">
        <Canvas 
          camera={{ position: [5, 5, 5], fov: 50 }}
          gl={{ 
            alpha: false,
            antialias: true 
          }}
        >
          {/* 设置更浅的背景色 */}
          <color attach="background" args={["#808080"]} />
          
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />

          {/* 添加坐标轴并增大尺寸 */}
          <Axes size={5} />

          {Object.entries(currentFrame.atoms).map(([id, atom]) => (
            <Atom key={id} atom={atom as BaseAtom} />
          ))}

          {currentFrame.bonds.map((bond) => {
            const startAtom = currentFrame.atoms[bond.atomIds[0]];
            const endAtom = currentFrame.atoms[bond.atomIds[1]];
            if (!startAtom || !endAtom) return null;

            return (
              <Bond
                key={`bond_${bond.atomIds.join("_")}`}
                start={
                  new THREE.Vector3(
                    startAtom.position.x,
                    startAtom.position.y,
                    startAtom.position.z
                  )
                }
                end={
                  new THREE.Vector3(
                    endAtom.position.x,
                    endAtom.position.y,
                    endAtom.position.z
                  )
                }
                bondType={bond.bondType || BondType.COVALENT}
              />
            );
          })}

          {/* 调整OrbitControls以更好地控制场景 */}
          <OrbitControls 
            makeDefault 
            minDistance={2}
            maxDistance={20}
          />
        </Canvas>
        
        <BondLegend />
      </div>
    </div>
  );
};

export default OrganicReaction;
