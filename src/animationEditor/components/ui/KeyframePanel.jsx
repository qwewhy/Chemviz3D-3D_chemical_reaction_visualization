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
  onCreateNewFrame,
  onSelectKeyframe,
  onExport,
}) => {
  const { t } = useTranslation();
  
  console.log('KeyframePanel render:', {
    currentKeyframe,
    keyframesCount: keyframes.length,
    keyframes
  });
  
  return (
    <div className="w-64 bg-gray-100 p-4 flex flex-col h-full">
      <div className="text-lg font-bold mb-4 flex-none">
        Keyframes
        <div className="text-sm font-normal">
          Current: {currentKeyframe + 1} / 20
        </div>
      </div>

      <div className="flex flex-col gap-2 mb-4 flex-none">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={onSaveKeyframe}
        >
          {t('keyframePanel.saveFrame')}
        </button>
        
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={onCreateNewFrame}
          disabled={keyframes.length >= 20}
        >
          {t('keyframePanel.createNewFrame')}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto min-h-0" style={{
        maxHeight: 'calc(100vh - 400px)'
      }}>
        <div className="space-y-2 pr-2">
          {keyframes.map((frame, index) => (
            <div
              key={frame.timestamp}
              className={`p-2 rounded cursor-pointer transition-colors duration-200 ${
                currentKeyframe === index ? 'bg-blue-200' : 'bg-white hover:bg-gray-50'
              }`}
              onClick={() => onSelectKeyframe(index)}
            >
              <div className="font-medium">
                Keyframe {index + 1}
              </div>
              <div className="text-sm text-gray-600">
                {Object.keys(frame.atoms).length} objects, {frame.bonds.length} bonds
              </div>
              {/* <div className="text-xs text-gray-500"> */}
                {/* {t('keyframePanel.editing')} */}
              {/* </div> */}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex-none">
        <button
          className="w-full bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
          onClick={onExport}
        >
          {t('keyframePanel.export')}
        </button>
      </div>
    </div>
  );
};

export default KeyframePanel; 