import React from 'react';
import * as THREE from 'three';
import { BondType } from '../../organic/types/ChemxTypes';

/**
 * 化学键组件
 * Chemical Bond Component
 * 渲染两个原子之间的化学键
 */
const Bond = ({ bond, atom1, atom2, editMode, onBreakBond }) => {
  if (!atom1 || !atom2) return null;

  const start = new THREE.Vector3(
    atom1.position.x,
    atom1.position.y,
    atom1.position.z
  );
  const end = new THREE.Vector3(
    atom2.position.x,
    atom2.position.y,
    atom2.position.z
  );
  
  const direction = new THREE.Vector3().subVectors(end, start);
  const center = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
  const length = direction.length();
  
  const quaternion = new THREE.Quaternion();
  quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    direction.normalize()
  );

  // 根据化学键类型设置样式
  const getBondStyle = () => {
    switch (bond.bondType) {
      case BondType.COVALENT:
        return {
          radius: 0.1,
          color: '#00ff00',  // 绿色
          emissive: '#004400'
        };
      case BondType.IONIC:
        return {
          radius: 0.05,  // 更细
          color: '#ff0000',  // 红色
          emissive: '#440000'
        };
      case BondType.METALLIC:
        return {
          radius: 0.1,
          color: '#cccccc',  // 灰白色
          emissive: '#444444'
        };
      default:
        return {
          radius: 0.1,
          color: '#ffffff',
          emissive: '#000000'
        };
    }
  };

  const bondStyle = getBondStyle();

  const handleClick = (e) => {
    e.stopPropagation();
    if (editMode === 'breakBond') {
      console.log('Breaking bond:', bond.id);
      onBreakBond(bond.id);
    }
  };

  return (
    <mesh
      position={center}
      quaternion={quaternion}
      onClick={handleClick}
    >
      <cylinderGeometry args={[bondStyle.radius, bondStyle.radius, length, 8]} />
      <meshStandardMaterial 
        color={editMode === 'breakBond' ? '#ff4444' : bondStyle.color}
        emissive={editMode === 'breakBond' ? '#ff0000' : bondStyle.emissive}
        emissiveIntensity={0.2}
      />
    </mesh>
  );
};

export default Bond; 