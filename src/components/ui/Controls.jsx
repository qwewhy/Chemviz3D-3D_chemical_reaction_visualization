// Controls组件：模拟控制面板
// Controls component: Simulation control panel
import { useTranslation } from 'react-i18next';
import { useSimulationStore } from '../../store/simulationStore';
import { WaterMolecule } from '../../models/molecules/WaterMolecule';
import { Vector3 } from 'three';
import { useCallback } from 'react';

const Controls = ({
  onReset,
  temperature,
  pressure,
  onTemperatureChange,
  onPressureChange,
  onForceReset,
}) => {
  const { t } = useTranslation();
  const { addMolecule, molecules, clearMolecules } = useSimulationStore(state => ({
    addMolecule: state.addMolecule,
    molecules: state.molecules,
    clearMolecules: state.clearMolecules
  }));

  /**
   * Adds a new water molecule to the simulation
   * 向模拟中添加新的水分子
   */
  const handleAddWaterMolecule = () => {
    console.log('Button clicked'); // 添加按钮点击日志
    
    try {
      // Random position at the top of the beaker
      const randomX = (Math.random() - 0.5) * 6;
      const waterMolecule = new WaterMolecule(
        new Vector3(randomX, 8, randomX)
      );
      
      console.log('Water molecule created:', waterMolecule); // 记录创建的分子
      addMolecule(waterMolecule);
      console.log('Molecule added, total count:', molecules.length); // 记录添加后的总数
    } catch (error) {
      console.error('Error creating molecule:', error); // 捕获可能的错误
    }
  };

  // 处理完全重置
  const handleCompleteReset = useCallback(() => {
    clearMolecules(); // 清除所有分子
    onForceReset(); // 触发场景重新挂载
  }, [clearMolecules, onForceReset]);

  return (
    <div className="space-y-4">
      {/* 添加分子按钮 / Add Molecule Button */}
      <button
        onClick={handleAddWaterMolecule}
        className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg
          transition-colors mb-4"
      >
        {t('simulator.controls.addWater')} ({molecules.length})
      </button>

      {/* 修改重置按钮的点击处理函数 */}
      <div className="flex gap-2">
        <button
          onClick={handleCompleteReset}
          className="btn bg-gray-500 hover:bg-gray-600 text-white w-full"
        >
          {t('simulator.controls.reset')}
        </button>
      </div>

      {/* 温度控制 / Temperature Control */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          {t('simulator.controls.temperature')} (K)
        </label>
        <input
          type="range"
          min="273"
          max="373"
          value={temperature}
          onChange={(e) => onTemperatureChange(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-sm text-gray-600">
          <span>273K</span>
          <span>{temperature}K</span>
          <span>373K</span>
        </div>
      </div>

      {/* 压力控制 / Pressure Control */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          {t('simulator.controls.pressure')} (atm)
        </label>
        <input
          type="range"
          min="1"
          max="10"
          value={pressure}
          onChange={(e) => onPressureChange(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-sm text-gray-600">
          <span>1 atm</span>
          <span>{pressure} atm</span>
          <span>10 atm</span>
        </div>
      </div>

      {/* 分子计数器 / Molecule Counter */}
      <div className="mt-4 p-3 bg-gray-100 rounded-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-2">
          {t('simulator.controls.moleculeCount')}
        </h3>
        <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
          <div>H₂O: <span>{molecules.length}</span></div>
        </div>
      </div>
    </div>
  );
};

export default Controls; 