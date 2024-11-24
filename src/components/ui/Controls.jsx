// Controls组件：模拟控制面板
// Controls component: Simulation control panel
import { useTranslation } from 'react-i18next';
import { useSimulationStore } from '../../store/simulationStore';
import { WaterMolecule } from '../../models/molecules/WaterMolecule';
import { AmmoniaHydrate } from '../../models/molecules/AmmoniaHydrate';
import { AmmoniaMolecule } from '../../models/molecules/AmmoniaMolecule';
import { HypochlorousAcid } from '../../models/molecules/HypochlorousAcid';
import { ChlorineMolecule } from '../../models/molecules/ChlorineMolecule';
import { HydrochloricAcid } from '../../models/molecules/HydrochloricAcid';
import { NitrogenMolecule } from '../../models/molecules/NitrogenMolecule';
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

  // adds water molecule / 添加水分子
  const handleAddWaterMolecule = () => {
    console.log('Button clicked'); // 添加按钮点击日志
    
    try {
      // Random position at the top of the beaker
      const randomX = (Math.random() - 0.5) * 6;
      const waterMolecule = new WaterMolecule(
        new Vector3(randomX, 8, randomX)
      );
    
      addMolecule(waterMolecule);
    } catch (error) {
      console.error('Error creating molecule:', error); // 捕获可能的错误
    }
  };

  // adds ammonia hydrate molecule / 添加一水合氨分子
  const handleAddAmmoniaHydrateMolecule = () => {
     try {
      const randomX = (Math.random() - 0.5) * 6;
      const ammoniaHydrateMolecule = new AmmoniaHydrate(
        new Vector3(randomX, 8, randomX)
      );
      addMolecule(ammoniaHydrateMolecule);
     } catch (error) {
      console.error('Error creating molecule:', error); // 捕获可能的错误
     }
  };

  // adds ammonia molecule / 添加氨分子
  const handleAddAmmoniaMolecule = () => {
    try {
      const randomX = (Math.random() - 0.5) * 6;
      const ammoniaMolecule = new AmmoniaMolecule(
        new Vector3(randomX, 8, randomX)
      );
      addMolecule(ammoniaMolecule);
    } catch (error) {
      console.error('Error creating molecule:', error); // 捕获可能的错误
    }
  };

  //adds chlorine molecule / 添加氯分子
  const handleAddChlorineMolecule = () => {
    try {
      const randomX = (Math.random() - 0.5) * 6;
      const chlorineMolecule = new ChlorineMolecule(
        new Vector3(randomX, 8, randomX)
      );
      addMolecule(chlorineMolecule);
    } catch (error) {
      console.error('Error creating molecule:', error); // 捕获可能的错误
    }
  };

  //add hypochlorous acid molecule / 添加次氯酸分子
  const handleAddHypochlorousAcidMolecule = () => {
    try {
      const randomX = (Math.random() - 0.5) * 6;
      const hypochlorousAcidMolecule = new HypochlorousAcid(
        new Vector3(randomX, 8, randomX)
      );
      addMolecule(hypochlorousAcidMolecule);
    } catch (error) {
      console.error('Error creating molecule:', error); // 捕获可能的错误
    }
  };

  //add hydrochloric acid molecule / 添加氯化氢分子
  const handleAddHydrochloricAcidMolecule = () => {
    try {
      const randomX = (Math.random() - 0.5) * 6;
      const hydrochloricAcidMolecule = new HydrochloricAcid(
        new Vector3(randomX, 8, randomX)
      );
      addMolecule(hydrochloricAcidMolecule);
    } catch (error) {
      console.error('Error creating molecule:', error); // 捕获可能的错误
    }
  };

  //add nitrogen molecule / 添加氮分子
  const handleAddNitrogenMolecule = () => {
    try {
      const randomX = (Math.random() - 0.5) * 6;
      const nitrogenMolecule = new NitrogenMolecule(
        new Vector3(randomX, 8, randomX)
      );
      addMolecule(nitrogenMolecule);
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

      {/* 添加氨分子按钮 / Add Ammonia Molecule Button */}
      <button
        onClick={handleAddAmmoniaMolecule}
        className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg
          transition-colors mb-4"
      >
        {t('simulator.controls.addAmmonia')} ({molecules.length})
      </button>

      {/* 添加一水合氨分子按钮 / Add Ammonia Hydrate Molecule Button */}
      <button
        onClick={handleAddAmmoniaHydrateMolecule}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg
          transition-colors mb-4"
      >
        {t('simulator.controls.addAmmoniaHydrate')} ({molecules.length})
      </button>

      {/* 添加氯分子按钮 / Add Chlorine Molecule Button */}
      <button
        onClick={handleAddChlorineMolecule}
        className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg
          transition-colors mb-4"
      >
        {t('simulator.controls.addChlorine')} ({molecules.length})
      </button>

      {/* 添加次氯酸分子按钮 / Add Hypochlorous Acid Molecule Button */}
      <button
        onClick={handleAddHypochlorousAcidMolecule}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg
          transition-colors mb-4"
      >
        {t('simulator.controls.addHypochlorousAcid')} ({molecules.length})
      </button>

      {/* 添加氯化氢分子按钮 / Add Hydrochloric Acid Molecule Button */}
      <button
        onClick={handleAddHydrochloricAcidMolecule}
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg
          transition-colors mb-4"
      >
        {t('simulator.controls.addHydrochloricAcid')} ({molecules.length})
      </button>

      {/* 添加氮分子按钮 / Add Nitrogen Molecule Button */}
      <button
        onClick={handleAddNitrogenMolecule}
        className="w-full bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg  
          transition-colors mb-4"
      >
        {t('simulator.controls.addNitrogen')} ({molecules.length})
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