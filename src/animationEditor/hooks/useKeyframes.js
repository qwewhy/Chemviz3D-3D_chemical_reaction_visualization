import { useState, useCallback } from 'react';

/**
 * 关键帧管理钩子
 * Keyframe management hook
 * 处理关键帧的保存、切换等操作
 * Handles keyframe saving, switching and other operations
 */
const useKeyframes = () => {
  const [keyframes, setKeyframes] = useState([]);
  const [currentKeyframe, setCurrentKeyframe] = useState(0);

  const saveKeyframe = useCallback((atoms, bonds) => {
    if (keyframes.length >= 10) {
      alert('最多允许10个关键帧 / Maximum 10 keyframes allowed');
      return;
    }

    const newKeyframe = {
      timestamp: keyframes.length * 2000,
      atoms: { ...atoms },
      bonds: [...bonds]
    };

    setKeyframes(prev => [...prev, newKeyframe]);
    setCurrentKeyframe(keyframes.length);
  }, [keyframes]);

  const switchKeyframe = useCallback((index) => {
    setCurrentKeyframe(index);
  }, []);

  return {
    keyframes,
    currentKeyframe,
    saveKeyframe,
    switchKeyframe
  };
};

export default useKeyframes; 