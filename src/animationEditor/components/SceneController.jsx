import React, { useCallback } from 'react';
import { useThree } from '@react-three/fiber';
import { Grid, Html, Plane } from '@react-three/drei';
import * as THREE from 'three';

/**
 * 场景交互控制器
 * Scene Interaction Controller
 * 处理3D场景中的点击和拖拽事件
 * @param {Object} props - 组件属性
 */
const SceneController = ({ 
  editMode,
  onPlaceAtom,
  onSelectAtom,
  onStartBond,
  onCompleteBond,
  bondStartAtom,
  atoms 
}) => {
  const { camera, gl, scene } = useThree();
  const raycaster = new THREE.Raycaster();
  const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0));
  const planeIntersectPoint = new THREE.Vector3();

  const handleClick = useCallback((event) => {
    event.stopPropagation();
    
    if (editMode === 'addAtom') {
      const position = event.point.clone();
      position.y = 0;
      console.log('Adding atom at position:', position);
      onPlaceAtom(position);
    } 
    else if (editMode === 'addBond') {
      // 获取场景中所有的原子的点击区域
      const atomMeshes = [];
      scene.traverse((object) => {
        if (object.userData?.isAtom && object.material.transparent) {
          atomMeshes.push(object);
        }
      });
      
      // 使用 event.point 来进行射线检测
      const intersects = raycaster.intersectObjects(atomMeshes);
      console.log('Bond mode intersects:', intersects);
      
      if (intersects.length > 0) {
        const atomId = intersects[0].object.userData.atomId;
        if (!bondStartAtom) {
          onStartBond(atomId);
        } else if (bondStartAtom !== atomId) {
          onCompleteBond(bondStartAtom, atomId);
        }
      }
    }
  }, [editMode, camera, gl, scene, bondStartAtom, onPlaceAtom, onStartBond, onCompleteBond]);

  console.log('SceneController render', {
    editMode,
    bondStartAtom
  });

  return (
    <>
      <Plane 
        args={[100, 100]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        onClick={handleClick}
        visible={false}
      >
        <meshBasicMaterial transparent opacity={0} />
      </Plane>

      <Grid
        args={[20, 20]}
        position={[0, -0.01, 0]}
        cellColor="#888888"
        sectionColor="#cccccc"
      />
      
      {editMode === 'addBond' && (
        <Html position={[5, 5, 0]}>
          <div className="fixed top-20 left-4 bg-white/90 p-4 rounded-lg shadow-lg border border-blue-500">
            <h3 className="font-bold mb-2 text-blue-600">
              化学键创建 / Bond Creation
            </h3>
            {!bondStartAtom ? (
              <p className="text-gray-700">
                请选择起始原子 / Please select the first atom
              </p>
            ) : (
              <div>
                <p className="text-gray-700 mb-2">
                  起始原子 / Starting Atom: 
                  <span className="ml-2 font-bold text-blue-600">
                    {atoms[bondStartAtom]?.symbol || ''}
                  </span>
                </p>
                <p className="text-gray-700">
                  请选择目标原子 / Please select the target atom
                </p>
              </div>
            )}
          </div>
        </Html>
      )}
    </>
  );
};

export default SceneController; 