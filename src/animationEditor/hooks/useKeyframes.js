import { useState, useCallback } from 'react';

/**
 * 关键帧管理钩子
 * Keyframe management hook
 */
const useKeyframes = () => {
  const [keyframes, setKeyframes] = useState([]);
  const [currentKeyframe, setCurrentKeyframe] = useState(0);

  // 添加新的验证函数
  const validateKeyframeData = useCallback((atoms, bonds) => {
    if (!atoms || !bonds) {
      console.error('Invalid keyframe data:', { atoms, bonds });
      return false;
    }
    return true;
  }, []);

  const saveKeyframe = useCallback((atoms, bonds) => {
    // 验证数据
    if (!validateKeyframeData(atoms, bonds)) {
      return;
    }

    setKeyframes(prev => {
      // 检查是否达到最大帧数限制
      if (prev.length >= 20 && currentKeyframe >= prev.length) {
        console.warn('Maximum keyframes limit reached');
        alert('Maximum 20 keyframes allowed');
        return prev;
      }

      // 创建新的关键帧数据，确保深拷贝
      const newKeyframe = {
        timestamp: Date.now(),
        atoms: JSON.parse(JSON.stringify(atoms)), // 深拷贝确保数据独立
        bonds: JSON.parse(JSON.stringify(bonds))  // 深拷贝确保数据独立
      };

      // 创建新的关键帧数组
      const newFrames = [...prev];
      
      // 更新或添加关键帧
      if (currentKeyframe === prev.length) {
        console.log('Adding new keyframe at index:', currentKeyframe);
        newFrames.push(newKeyframe);
      } else {
        console.log('Updating existing keyframe at index:', currentKeyframe);
        // 更新现有帧时，保持原始时间戳以维护顺序
        newKeyframe.timestamp = prev[currentKeyframe]?.timestamp || Date.now();
        newFrames[currentKeyframe] = newKeyframe;
      }

      // 验证新的关键帧数组
      console.log('Updated keyframes:', newFrames);
      return newFrames;
    });

    return true;
  }, [currentKeyframe, validateKeyframeData]);

  const switchKeyframe = useCallback((index) => {
    console.log('Switching to keyframe:', index);
    if (index >= 0 && index <= keyframes.length) {
      setCurrentKeyframe(index);
      return true;
    }
    return false;
  }, [keyframes.length]);

  const getCurrentKeyframeData = useCallback(() => {
    return keyframes[currentKeyframe];
  }, [keyframes, currentKeyframe]);

  // 改进验证函数，添加更详细的验证
  const validateAllKeyframes = useCallback(() => {
    console.log('Validating all keyframes before export');
    let isValid = true;
    const validationErrors = [];

    keyframes.forEach((frame, index) => {
      // 检查基本数据结构
      if (!frame || !frame.atoms || !frame.bonds) {
        validationErrors.push(`Frame ${index}: Missing basic data structure`);
        isValid = false;
        return;
      }

      // 检查原子数据
      const atomsValid = Object.values(frame.atoms).every(atom => {
        if (!atom.id || !atom.symbol || !atom.position) {
          validationErrors.push(`Frame ${index}: Invalid atom data - ${atom.id}`);
          return false;
        }
        return true;
      });

      // 检查化学键数据
      const bondsValid = frame.bonds.every(bond => {
        if (!bond.id || !bond.atomIds || bond.atomIds.length !== 2) {
          validationErrors.push(`Frame ${index}: Invalid bond data - ${bond.id}`);
          return false;
        }
        // 验证化学键引用的原子是否存在
        const atomsExist = bond.atomIds.every(atomId => frame.atoms[atomId]);
        if (!atomsExist) {
          validationErrors.push(`Frame ${index}: Bond references non-existent atom - ${bond.id}`);
          return false;
        }
        return true;
      });

      if (!atomsValid || !bondsValid) {
        isValid = false;
      }
    });

    if (!isValid) {
      console.error('Keyframe validation errors:', validationErrors);
      alert('Some keyframes contain invalid data:\n' + validationErrors.join('\n'));
    }

    return isValid;
  }, [keyframes]);

  // 添加获取所有关键帧数据的函数
  const getAllKeyframesData = useCallback(() => {
    return keyframes;
  }, [keyframes]);

  return {
    keyframes,
    currentKeyframe,
    saveKeyframe,
    switchKeyframe,
    getCurrentKeyframeData,
    validateAllKeyframes,
    getAllKeyframesData
  };
};

export default useKeyframes; 