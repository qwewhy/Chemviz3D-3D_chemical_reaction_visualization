import { useState, useCallback } from 'react';
import * as THREE from 'three';


/**
 * 原子拖拽钩子
 * Atom dragging hook
 * 处理原子的拖拽状态和位置更新
 * Handles atom drag state and position updates
 */
const useAtomDrag = () => {
  const [isDragging, setIsDragging] = useState(false);
  const dragPlane = new THREE.Plane();
  const intersection = new THREE.Vector3();

  const startDrag = useCallback((camera, position) => {
    setIsDragging(true);
    dragPlane.setFromNormalAndCoplanarPoint(
      camera.getWorldDirection(new THREE.Vector3()),
      position
    );
  }, []);

  const updateDrag = useCallback((event, onMove) => {
    if (isDragging) {
      const position = event.point.clone();
      onMove(position);
    }
  }, [isDragging]);

  const endDrag = useCallback(() => {
    setIsDragging(false);
  }, []);

  return {
    isDragging,
    startDrag,
    updateDrag,
    endDrag
  };
};

export default useAtomDrag; 