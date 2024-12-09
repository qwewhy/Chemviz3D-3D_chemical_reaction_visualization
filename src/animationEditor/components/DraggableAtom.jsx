/**
 * @file DraggableAtom.jsx
 * @author [Hongyuan Wang] <HW8545626@gmail.com>
 * @copyright Copyright (c) 2024 [Hongyuan Wang]
 * @license MIT
 */

import React from 'react';
import { Html, Text } from '@react-three/drei';
import * as THREE from 'three';
import { ATOM_COLORS, ATOM_RADIUS } from '../constants/atomProperties';
import { useTranslation } from 'react-i18next';

/**
 * 坐标轴组件 
 */
const Axes = ({ size = 2 }) => {
  const groupRef = React.useRef();
  const cleanupRef = React.useRef([]);
  
  React.useEffect(() => {
    if (!groupRef.current) return;
    
    // 清除现有的子元素和之前的资源
    cleanupRef.current.forEach(item => {
      if (item.geometry) item.geometry.dispose();
      if (item.material) item.material.dispose();
    });
    cleanupRef.current = [];
    
    while (groupRef.current.children.length) {
      groupRef.current.remove(groupRef.current.children[0]);
    }
    
    // 创建箭头
    const arrowSize = size * 0.01;
    const arrowGeometry = new THREE.ConeGeometry(arrowSize, arrowSize * 2, 8);
    cleanupRef.current.push(arrowGeometry);
    
    // 创建半透明材质
    const materials = {
      x: new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.7 }),
      y: new THREE.MeshBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 0.7 }),
      z: new THREE.MeshBasicMaterial({ color: 0x0000ff, transparent: true, opacity: 0.7 })
    };
    Object.values(materials).forEach(material => cleanupRef.current.push(material));
    
    // 创建线条
    const createLine = (start, end, color) => {
      const points = [new THREE.Vector3(...start), new THREE.Vector3(...end)];
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({ 
        color, 
        transparent: true, 
        opacity: 0.7 
      });
      cleanupRef.current.push(geometry, material);
      return new THREE.Line(geometry, material);
    };

    // 创建虚线
    const createDashedLine = (start, end, color) => {
      const points = [new THREE.Vector3(...start), new THREE.Vector3(...end)];
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineDashedMaterial({ 
        color, 
        transparent: true, 
        opacity: 0.7,
        dashSize: 0.1,
        gapSize: 0.1
      });
      cleanupRef.current.push(geometry, material);
      const line = new THREE.Line(geometry, material);
      line.computeLineDistances();
      return line;
    };

    // 创建箭头
    const arrows = {
      x: new THREE.Mesh(arrowGeometry, materials.x),
      y: new THREE.Mesh(arrowGeometry.clone(), materials.y),
      z: new THREE.Mesh(arrowGeometry.clone(), materials.z)
    };
    
    // 设置箭头位置和旋转
    arrows.x.position.set(size, 0, 0);
    arrows.y.position.set(0, size, 0);
    arrows.z.position.set(0, 0, size);
    
    arrows.x.rotation.z = -Math.PI / 2;
    arrows.z.rotation.x = Math.PI / 2;
    
    // 创建正向轴线
    const posLines = {
      x: createLine([0, 0, 0], [size, 0, 0], 0xff0000),
      y: createLine([0, 0, 0], [0, size, 0], 0x00ff00),
      z: createLine([0, 0, 0], [0, 0, size], 0x0000ff)
    };

    // 创建负向虚线
    const negLines = {
      x: createDashedLine([0, 0, 0], [-size, 0, 0], 0xff0000),
      y: createDashedLine([0, 0, 0], [0, -size, 0], 0x00ff00),
      z: createDashedLine([0, 0, 0], [0, 0, -size], 0x0000ff)
    };
    
    if (groupRef.current) {
      // 添加所有元素到组
      Object.values(arrows).forEach(arrow => groupRef.current.add(arrow));
      Object.values(posLines).forEach(line => groupRef.current.add(line));
      Object.values(negLines).forEach(line => groupRef.current.add(line));
      
      // 缩放整个坐标轴组
      groupRef.current.scale.set(0.8, 0.8, 0.8);
    }

    // 清理函数
    return () => {
      cleanupRef.current.forEach(item => {
        if (item.geometry) item.geometry.dispose();
        if (item.material) item.material.dispose();
      });
      cleanupRef.current = [];
    };
  }, [size]);
  
  return (
    <group ref={groupRef}>
      <Text position={[size + 0.2, 0, 0]} fontSize={0.1} color="red">X</Text>
      <Text position={[0, size + 0.2, 0]} fontSize={0.1} color="green">Y</Text>
      <Text position={[0, 0, size + 0.2]} fontSize={0.1} color="blue">Z</Text>
    </group>
  );
};

const DraggableAtom = ({ atom, selected, onSelect, editMode, isStartAtom, onDelete }) => {
  const { t } = useTranslation();
  
  const handleClick = (e) => {
    e.stopPropagation();
    
    const clickPosition = e.point;
    const atomPosition = new THREE.Vector3(atom.position.x, atom.position.y, atom.position.z);
    const distance = clickPosition.distanceTo(atomPosition);
    
    if (distance <= ATOM_RADIUS[atom.symbol] * 1.5) {
      if (editMode === 'deleteAtom') {
        onDelete(atom.id);
      } else if (editMode === 'select' || editMode === 'addBond') {
        onSelect();
      }
    }
  };

  const getEmissiveColor = () => {
    if (editMode === 'deleteAtom') return '#ff0000';
    if (isStartAtom) return '#00ff00';
    if (selected) return '#ffffff';
    return '#000000';
  };

  return (
    <group>
      <mesh
        position={[atom.position.x, atom.position.y, atom.position.z]}
        onClick={handleClick}
        userData={{ isAtom: true, atomId: atom.id }}
      >
        <sphereGeometry args={[ATOM_RADIUS[atom.symbol], 32, 32]} />
        <meshStandardMaterial 
          color={ATOM_COLORS[atom.symbol]}
          emissive={getEmissiveColor()}
          emissiveIntensity={0.4}
        />
      </mesh>
      
      {selected && (
        <group position={[atom.position.x, atom.position.y, atom.position.z]}>
          <Axes size={ATOM_RADIUS[atom.symbol] * 5} />
        </group>
      )}

      <Html
        position={[atom.position.x, atom.position.y + ATOM_RADIUS[atom.symbol] * 1.5, atom.position.z]}
        center
        style={{ pointerEvents: 'none' }}
      >
        <div 
          className={`
            text-sm px-2 rounded pointer-events-none select-none
            ${isStartAtom ? 'bg-green-500 text-white' : 'bg-black/50 text-white'}
          `}
        >
          {atom.symbol}
          {isStartAtom && (
            <span className="text-xs opacity-75">
              {t('draggableAtom.startAtom')}
            </span>
          )}
        </div>
      </Html>
    </group>
  );
};

export default DraggableAtom;