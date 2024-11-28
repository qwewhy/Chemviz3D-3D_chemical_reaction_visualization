/**
 * @file Controls.jsx
 * @author1 [Hongyuan Wang] <HW8545626@gmail.com>
 * @copyright Copyright (c) 2024 [Hongyuan Wang]
 * @license MIT
 * @description * A React component that provides a comprehensive control interface for the
 * chemical reaction simulation. Features include:
 * - Molecule addition buttons for different chemical species (H2O, NH3, Cl2, etc.)
 * - Temperature and pressure control sliders with real-time updates
 * - Simulation reset functionality
 * - Molecule counter display
 * - Internationalization support for multiple languages
 * - Random positioning system for new molecules
 */

// Controls组件：模拟控制面板
// Controls component: Simulation control panel
import { useTranslation } from "react-i18next";
import { Vector3 } from "three";
import { useCallback, useState, useEffect } from "react";

import { MOLECULE_TYPES } from './moleculeButtonConfig';
import { useSimulationStore } from "../../store/simulationStore";

const Controls = ({
  onReset,
  temperature,
  pressure,
  onTemperatureChange,
  onPressureChange,
  onForceReset,
}) => {
  const { t } = useTranslation();
  const { addMolecule, molecules, clearMolecules } = useSimulationStore(
    (state) => ({
      addMolecule: state.addMolecule,
      molecules: state.molecules,
      clearMolecules: state.clearMolecules,
    })
  );

  // 通用的添加分子方法 / Generic method to add molecules
  const handleAddMolecule = (MoleculeClass) => {
    try {
      const randomX = (Math.random() - 0.5) * 6;
      const molecule = new MoleculeClass(
        new Vector3(randomX, Math.abs(randomX % 3) + 4, randomX)
      );
      addMolecule(molecule);
    } catch (error) {
      console.error(`Error creating ${MoleculeClass.name} molecule:`, error);
    }
  };

  // 生成分子按钮配置 / Generate molecule button configuration
  const moleculeButtons = Object.values(MOLECULE_TYPES).map(({ class: MoleculeClass, bgColor, translationKey }) => ({
    handler: () => handleAddMolecule(MoleculeClass),
    bgColor,
    hoverColor: bgColor.replace('bg-', 'hover:bg-').replace('500', '600'),
    translationKey
  }));

  // 分子信息状态跟踪器 / Molecule information state tracker
  const [moleculeInfo, setMoleculeInfo] = useState(new Map());

  // 处理完全重置
  const handleCompleteReset = useCallback(() => {
    clearMolecules(); // 清除所有分子
    onForceReset(); // 触发场景重新挂载
  }, [clearMolecules, onForceReset]);

  // useEffect更新分子信息
  useEffect(() => {
    const newMoleculeInfo = new Map();
    molecules.forEach((molecule) => {
      const moleculeType = molecule.molecularFormula;
      newMoleculeInfo.set(
        moleculeType,
        (newMoleculeInfo.get(moleculeType) || 0) + 1
      );
    });
    setMoleculeInfo(newMoleculeInfo);
  }, [molecules]);

  // 分子添加按钮组件 / Molecule addition button component
  const MoleculeButton = ({ handler, bgColor, hoverColor, translationKey }) => (
    <button
      onClick={handler}
      className={`w-full ${bgColor} ${hoverColor} text-white py-2 rounded-lg transition-colors mb-4`}
    >
      {t(translationKey)}
    </button>
  );

  return (
    <div className="space-y-4">
      {/* 分子添加按钮列表 / Molecule addition button list */}
      {moleculeButtons.map((buttonProps, index) => (
        <MoleculeButton key={index} {...buttonProps} />
      ))}

      {/* 重置按钮 / Reset button */}
      <div className="flex gap-2">
        <button
          onClick={handleCompleteReset}
          className="btn bg-gray-500 hover:bg-gray-600 text-white w-full"
        >
          {t("simulator.controls.reset")}
        </button>
      </div>

      {/* 分子计数器 / Molecule counter */}
      <div className="mt-4 p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-base font-semibold text-gray-800 mb-3">
          {t("simulator.controls.moleculeCount")}
        </h3>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          {Array.from(moleculeInfo).map(([type, count]) => (
            <div
              key={type}
              className="flex justify-between items-center py-1 px-2 rounded hover:bg-gray-100"
            >
              <span className="text-sm font-medium text-gray-700">{type}</span>
              <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                {count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Controls;
