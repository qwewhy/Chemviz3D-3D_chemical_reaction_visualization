// Controls组件：模拟控制面板
// Controls component: Simulation control panel
import { useTranslation } from 'react-i18next';

const Controls = ({
  onStart,
  onReset,
  temperature,
  pressure,
  onTemperatureChange,
  onPressureChange,
  isSimulating
}) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      {/* 控制按钮 */}
      <div className="flex gap-2">
        <button
          onClick={onStart}
          className={`btn flex-1 ${
            isSimulating ? 'bg-red-500 hover:bg-red-600' : 'btn-primary'
          }`}
        >
          {isSimulating ? t('simulator.controls.stop') : t('simulator.controls.start')}
        </button>
        <button
          onClick={onReset}
          className="btn bg-gray-200 hover:bg-gray-300 flex-1"
        >
          {t('simulator.controls.reset')}
        </button>
      </div>

      {/* 温度控制 */}
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
          className="w-full"
        />
        <span className="text-sm text-gray-600">{temperature}K</span>
      </div>

      {/* 压力控制 */}
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
          className="w-full"
        />
        <span className="text-sm text-gray-600">{pressure} atm</span>
      </div>
    </div>
  );
};

export default Controls; 