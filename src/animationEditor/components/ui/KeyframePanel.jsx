import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * 关键帧控制面板组件
 * Keyframe Control Panel Component
 * 用于管理和切换动画关键帧
 * For managing and switching animation keyframes
 */
const KeyframePanel = ({
  currentKeyframe,
  keyframes,
  onSaveKeyframe,
  onSelectKeyframe,
  onExport,
}) => {
  const { t } = useTranslation();
  
  return (
    <div className="w-80 m-4 bg-white rounded-lg shadow-lg p-4">
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-1">{t('keyframePanel.title')}</h2>
        <p className="text-sm text-gray-600">
          {t('keyframePanel.current', { current: currentKeyframe + 1, total: keyframes.length })}
        </p>
      </div>

      <div className="space-y-4">
        <button 
          className={`w-full py-2 rounded-lg transition-colors ${
            keyframes.length >= 10
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
          onClick={onSaveKeyframe}
          disabled={keyframes.length >= 10}
        >
          {t('keyframePanel.saveFrame')}
        </button>

        <div className="space-y-2">
          {keyframes.map((_, index) => (
            <button
              key={index}
              className={`w-full py-2 rounded-lg transition-colors ${
                currentKeyframe === index
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
              onClick={() => onSelectKeyframe(index)}
            >
              {t('keyframePanel.keyframe', { number: index + 1 })}
            </button>
          ))}
        </div>

        <button
          className={`w-full py-2 rounded-lg transition-colors ${
            keyframes.length === 0
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-green-500 text-white hover:bg-green-600'
          }`}
          onClick={onExport}
          disabled={keyframes.length === 0}
        >
          {t('keyframePanel.export')}
        </button>
      </div>
    </div>
  );
};

export default KeyframePanel; 