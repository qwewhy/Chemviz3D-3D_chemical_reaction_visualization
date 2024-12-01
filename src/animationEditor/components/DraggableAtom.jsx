import React from 'react';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { ATOM_COLORS, ATOM_RADIUS } from '../constants/atomProperties';
import { useTranslation } from 'react-i18next';

/**
 * 原子组件（移除拖拽功能）
 * Atom Component (without drag functionality)
 */
const DraggableAtom = ({ atom, selected, onSelect, editMode, isStartAtom, onDelete }) => {
  const { t } = useTranslation();

  const handleClick = (e) => {
    e.stopPropagation();
    
    const clickPosition = e.point;
    const atomPosition = new THREE.Vector3(atom.position.x, atom.position.y, atom.position.z);
    const distance = clickPosition.distanceTo(atomPosition);
    
    if (distance <= ATOM_RADIUS[atom.symbol] * 1.5) {
      console.log('Atom clicked:', {
        id: atom.id,
        symbol: atom.symbol,
        distance: distance,
        editMode: editMode
      });
      
      if (editMode === 'deleteAtom') {
        onDelete(atom.id);
      } else if (editMode === 'select' || editMode === 'addBond') {
        onSelect();
      }
    }
  };

  // 根据不同状态显示不同的发光效果
  const getEmissiveColor = () => {
    if (editMode === 'deleteAtom') return '#ff0000';  // 删除模式显示红色发光
    if (isStartAtom) return '#00ff00';  
    if (selected) return '#ffffff';      
    return '#000000';                    
  };

  return (
    <group>
      {/* 实际显示的原子 */}
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

      {/* 原子标签 - 添加pointer-events-none防止鼠标事件 */}
      <Html
        position={[atom.position.x, atom.position.y + ATOM_RADIUS[atom.symbol] * 1.5, atom.position.z]}
        center
        style={{
          pointerEvents: 'none'  // 确保HTML元素不会捕获任何鼠标事件
        }}
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