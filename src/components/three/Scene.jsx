/**
 * @file Scene.jsx
 * @author1 [Hongyuan Wang] <HW8545626@gmail.com>
 * @copyright Copyright (c) 2024 [Hongyuan Wang]
 * @license MIT
 * @description  * A React Three Fiber scene component that implements an interactive 3D chemical
 * reaction simulation environment. Features include:
 * - Real-time molecular visualization and physics simulation
 * - Dynamic chemical reaction system with multiple reaction rules
 * - Automated reaction detection and product generation
 * - 3D environment with configurable camera controls
 * - Physical interactions between molecules in a contained environment
 */

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import Molecule from './Molecule';
import Beaker from './Beaker';
import { useSimulationStore } from '../../store/simulationStore';
import { Physics } from '@react-three/cannon';
import { useEffect, useState, useRef } from 'react';

import { H2O } from '../../models/molecules/H2O';
import { O2 } from '../../models/molecules/O2';
import { H2O2 } from '../../models/molecules/H2O2';
import { H2 } from '../../models/molecules/H2';
import { NH3 } from '../../models/molecules/NH3';
import { NH3H2O } from '../../models/molecules/NH3H2O';
import { Cl2 } from '../../models/molecules/Cl2';
import { HCl } from '../../models/molecules/HCl';
import { HClO } from '../../models/molecules/HClO';
import { N2 } from '../../models/molecules/N2';
import { NH4Cl } from '../../models/molecules/NH4Cl';
import { C } from '../../models/molecules/C';
import { H2CO3 } from '../../models/molecules/H2CO3';
import { NH4HCO3 } from '../../models/molecules/NH4HCO3';


import { reactionRules } from '../../data/reactionRules';

// 在文件顶部添加分子类型映射
const moleculeClassMap = {
  'NH3H2O': NH3H2O,
  'H2O': H2O,
  'NH3': NH3,
  'HClO': HClO,
  'HCl': HCl,
  'N2': N2,
  'H2O2': H2O2,
  'H2': H2,
  'O2': O2,
  'Cl2': Cl2,
  'NH4Cl': NH4Cl,
  'C': C,
  'H2CO3': H2CO3,
  'NH4HCO3': NH4HCO3,
};

/**
 * Main 3D scene component for molecular simulation
 * 分子模拟的主3D场景组件
 * 
 * @param {Object} props - Component props 组件属性
 * @param {string} props.mountKey - Key for Canvas remounting Canvas重新挂载的键值
 */
const Scene = ({ mountKey }) => {
  // Get molecules array from global state
  // 从全局状态获取分子数组
  const molecules = useSimulationStore((state) => state.molecules);
  
  // State to track current molecule composition in scene
  // 用于追踪场景中当前分子组成的状态
  const [moleculeInfo, setMoleculeInfo] = useState(new Map());
  
  // Get molecule manipulation methods from store
  // 从store中获取分子操作方法
  const addMolecule = useSimulationStore((state) => state.addMolecule);
  const deleteMolecule = useSimulationStore((state) => state.deleteMolecule);

  // 添加一个标志来防止反应循环
  // Add a flag to prevent reaction loops
  const isReacting = useRef(false);

  /**
   * Check and execute possible chemical reactions
   * 检查并执行可能的化学反应
   */
  const checkReactionPossibility = () => {
    if (isReacting.current) return;

    const currentMolecules = Array.from(moleculeInfo.entries());
    const currentMoleculesMap = new Map(currentMolecules);

    reactionRules.forEach(rule => {
      let canReact = true;
      for (const [reactant, requiredCount] of Object.entries(rule.reactants)) {
        const availableCount = currentMoleculesMap.get(reactant) || 0;
        if (availableCount < requiredCount) {
          canReact = false;
          break;
        }
      }

      if (canReact) {
        isReacting.current = true;
        console.log(`find a reaction: ${rule.name}`);
        
        // 收集所有需要的反应物
        // Collect all required reactants
        const reactantMolecules = {};
        for (const [reactant, requiredCount] of Object.entries(rule.reactants)) {
          // 找到指定数量的反应物分子
          const foundMolecules = molecules.filter(m => 
            m.molecularFormula === reactant
          ).slice(0, requiredCount);
          
          reactantMolecules[reactant] = foundMolecules;
        }

        // 一次性删除所有反应物
        // Delete all reactants at once
        Object.values(reactantMolecules).flat().forEach(molecule => {
          if (molecule) {
            deleteMolecule(molecule);
            console.log(`delete reactant: ${molecule.molecularFormula}`);
          }
        });
        
        // 创建所有生成物
        // Create all products
        const allNewMolecules = [];
        for (const [product, count] of Object.entries(rule.products)) {
          for (let i = 0; i < count; i++) {
            const MoleculeClass = moleculeClassMap[product];
            if (!MoleculeClass) {
              console.warn(`未知的产物类型: ${product}`);
              continue;
            }
            allNewMolecules.push(new MoleculeClass());
          }
        }

        // 批量添加所有生成物
        // Add all products in batch
        allNewMolecules.forEach(molecule => {
          addMolecule(molecule);
          console.log(`add product: ${molecule.molecularFormula}`);
        });

        console.log('reaction finished');
        
        setTimeout(() => {
          isReacting.current = false;
        }, 100);
      }
    });
  };

  /**
   * Effect hook to monitor molecule changes and update molecule info
   * 监控分子变化并更新分子信息的效果钩子
   */
  useEffect(() => {
    // 如果正在反应，跳过更新
    // Skip updates if a reaction is in progress
    if (isReacting.current) return;

    // Update molecule composition information
    // 更新分子组成信息
    const newMoleculeInfo = new Map();
    molecules.forEach(molecule => {
      const moleculeType = molecule.molecularFormula;
      newMoleculeInfo.set(
        moleculeType, 
        (newMoleculeInfo.get(moleculeType) || 0) + 1
      );
    });

    setMoleculeInfo(newMoleculeInfo);
    checkReactionPossibility();
  }, [molecules]);

  return (
    <Canvas key={mountKey} camera={{ position: [0, 10, 30], fov: 50 }}>
      {/* Environment and lighting setup 环境和光照设置 */}
      <Environment preset="studio" />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      {/* Physics world configuration 物理世界配置 */}
      <Physics
        gravity={[0, 0, 0]} // 重力 
        defaultContactMaterial={{ 
          friction: 0.2, // 摩擦力
          restitution: 0.5, // 恢复系数
          contactEquationStiffness: 1e7, // 接触方程刚度
          contactEquationRelaxation: 1, // 接触方程松弛
        }}
        allowSleep={false} // 禁止休眠
        iterations={20} // 迭代次数
      >
        {/* Beaker container 烧杯容器 */}
        <Beaker />
        {/* Render all molecules 渲染所有分子 */}
        {molecules.map((molecule, index) => (
          <Molecule key={`molecule-${index}-${molecule.id}`} molecule={molecule} />
        ))}
      </Physics>

      {/* Camera controls 相机控制 */}
      <OrbitControls 
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={8}
        maxDistance={30}
      />
    </Canvas>
  );
};

export default Scene;