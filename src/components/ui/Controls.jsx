// Controls组件：模拟控制面板
// Controls component: Simulation control panel
import { useTranslation } from 'react-i18next';
import { useSimulationStore } from '../../store/simulationStore';
import { Vector3 } from 'three';
import { useCallback } from 'react';

import { NH3H2O } from '../../models/molecules/NH3H2O';
import { NH3 } from '../../models/molecules/NH3';
import { Cl2 } from '../../models/molecules/Cl2';
import { HClO } from '../../models/molecules/HClO';
import { HCl } from '../../models/molecules/HCl';
import { N2 } from '../../models/molecules/N2';
import { H2O } from '../../models/molecules/H2O';
import { O2 } from '../../models/molecules/O2';
import { H2O2 } from '../../models/molecules/H2O2';
import { H2 } from '../../models/molecules/H2';


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
  // if src\components\three\Beaker.jsx has changed, the randomX should be changed accordingly
  // 如果src\components\three\Beaker.jsx有改变，则randomX也应该相应改变
  const handleAddWaterMolecule = () => {
    try {
      // Random position at the top of the beaker
      const randomX = (Math.random() - 0.5) * 6;
      const waterMolecule = new H2O(
        new Vector3(randomX, Math.abs(randomX % 3)+4, randomX) // 水分子在容器顶部随机位置 water molecule at random position at the top of the container
      );
    
      addMolecule(waterMolecule);
    } catch (error) {
      console.error('Error creating molecule:', error); // 捕获可能的错误
    }
  };

  //add hydrogen molecule / 添加氢分子
  const handleAddHydrogenMolecule = () => {
    try {
      const randomX = (Math.random() - 0.5) * 6;
      const hydrogenMolecule = new H2(new Vector3(randomX, Math.abs(randomX % 3)+4, randomX));//氢分子在容器顶部随机位置 hydrogen molecule at random position at the top of the container
      addMolecule(hydrogenMolecule);
    } catch (error) {
      console.error('Error creating molecule:', error); // 捕获可能的错误
    }
  };  

  // adds ammonia hydrate molecule / 添加一水合氨分子
  const handleAddAmmoniaHydrateMolecule = () => {
     try {
      const randomX = (Math.random() - 0.5) * 6;
      const ammoniaHydrateMolecule = new NH3H2O(
        new Vector3(randomX, Math.abs(randomX % 3)+4, randomX) // 一水合氨分子在容器顶部随机位置 ammonia hydrate molecule at random position at the top of the container
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
      const ammoniaMolecule = new NH3(
        new Vector3(randomX, Math.abs(randomX % 3)+4, randomX)
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
      const chlorineMolecule = new Cl2(
        new Vector3(randomX, Math.abs(randomX % 3)+4, randomX)
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
      const hypochlorousAcidMolecule = new HClO(
        new Vector3(randomX, Math.abs(randomX % 3)+4, randomX)
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
      const hydrochloricAcidMolecule = new HCl(
        new Vector3(randomX, Math.abs(randomX % 3)+4, randomX)
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
      const nitrogenMolecule = new N2(
        new Vector3(randomX, Math.abs(randomX % 3)+4, randomX)
      );
      addMolecule(nitrogenMolecule);
    } catch (error) {
      console.error('Error creating molecule:', error); // 捕获可能的错误
    }
  };

  //add oxygen molecule / 添加氧气分子
  const handleAddOxygenMolecule = () => {
    try {
      const randomX = (Math.random() - 0.5) * 6;
      const oxygenMolecule = new O2(new Vector3(randomX, Math.abs(randomX % 3)+4, randomX));
      addMolecule(oxygenMolecule);
    } catch (error) {
      console.error('Error creating molecule:', error); // 捕获可能的错误
    }
  };

  //add hydrogen peroxide molecule / 添加过氧化氢分子
  const handleAddHydrogenPeroxideMolecule = () => {
    try {
      const randomX = (Math.random() - 0.5) * 6;
      const hydrogenPeroxideMolecule = new H2O2(new Vector3(randomX, Math.abs(randomX % 3)+4, randomX));
      addMolecule(hydrogenPeroxideMolecule);
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
      {/* 添加水分子按钮 / Add Water Molecule Button */}
      <button
        onClick={handleAddWaterMolecule}
        className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg
          transition-colors mb-4"
      >
        {t('simulator.controls.addWater')} ({molecules.length})
      </button>

      {/* 添加氢气分子按钮 / Add Hydrogen Molecule Button */  }
      <button
        onClick={handleAddHydrogenMolecule}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg
          transition-colors mb-4"
      >
        {t('simulator.controls.addHydrogen')} ({molecules.length})
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

      {/* 添加氧气分子按钮 / Add Oxygen Molecule Button */}
      <button
        onClick={handleAddOxygenMolecule}
        className="w-full bg-blue-500 hover:bg-gray-600 text-white py-2 rounded-lg
          transition-colors mb-4"
      >
        {t('simulator.controls.addOxygen')} ({molecules.length})
      </button> 

      {/* 添加过氧化氢分子按钮 / Add Hydrogen Peroxide Molecule Button */}
      <button
        onClick={handleAddHydrogenPeroxideMolecule}
        className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg
          transition-colors mb-4"
      >
        {t('simulator.controls.addHydrogenPeroxide')} ({molecules.length})
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