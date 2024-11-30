import React, { useState, useCallback, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { BondType } from '../organic/types/ChemxTypes';
import SceneController from '../animationEditor/components/SceneController';
import DraggableAtom from '../animationEditor/components/DraggableAtom';
import Bond from '../animationEditor/components/Bond';
import Toolbar from '../animationEditor/components/ui/Toolbar';
import KeyframePanel from '../animationEditor/components/ui/KeyframePanel';
import { ATOM_RADIUS } from '../animationEditor/constants/atomProperties';
import { exportToChemx, downloadFile } from '../animationEditor/utils/exportHelpers';
import useKeyframes from '../animationEditor/hooks/useKeyframes';
import useAtomDrag from '../animationEditor/hooks/useAtomDrag';
import AtomPositionEditor from '../animationEditor/components/ui/AtomPositionEditor';
import useHistoryState from '../animationEditor/hooks/useHistoryState';
import { useTranslation } from 'react-i18next';

/**
 * 化学反应动画编辑器主页面
 * Chemical Reaction Animation Editor Main Page
 */
const KeyframeEditor = () => {
  // 态管理 / State management
  const [atoms, setAtoms, undoAtoms, canUndoAtoms] = useHistoryState({});
  const [bonds, setBonds, undoBonds, canUndoBonds] = useHistoryState([]);
  const [selectedAtom, setSelectedAtom] = useState(null);
  const [editMode, setEditMode] = useState('select');
  const [selectedAtomType, setSelectedAtomType] = useState('C');
  const [metadata, setMetadata] = useState({
    name: '',
    description: '',
    created: Date.now()
  });
  const [bondStartAtom, setBondStartAtom] = useState(null);
  const [selectedBondType, setSelectedBondType] = useState(BondType.COVALENT);

  // 使用自定义钩子 / Use custom hooks
  const {
    keyframes,
    currentKeyframe,
    saveKeyframe,
    switchKeyframe
  } = useKeyframes();

  const {
    isDragging,
    startDrag,
    updateDrag,
    endDrag
  } = useAtomDrag();

  const { t } = useTranslation();

  /**
   * 处理原子放置
   * Handle atom placement
   * @param {THREE.Vector3} position - 放置位置 / Placement position
   */
  const handlePlaceAtom = useCallback((position) => {
    console.log('handlePlaceAtom called with position:', position);
    const newAtom = {
      id: `atom_${Date.now()}`,
      symbol: selectedAtomType,
      position: {
        x: position.x,
        y: position.y,
        z: position.z
      },
      charge: 0,
      electrons: ATOM_RADIUS[selectedAtomType] * 4
    };

    console.log('Creating new atom:', newAtom);
    setAtoms(prev => {
      const newAtoms = {
        ...prev,
        [newAtom.id]: newAtom
      };
      console.log('Updated atoms state:', newAtoms);
      return newAtoms;
    });
  }, [selectedAtomType, setAtoms]);

  /**
   * 处理原子移动
   * Handle atom movement
   * @param {string} atomId - 原子ID / Atom ID
   * @param {THREE.Vector3} newPosition - 新位置 / New position
   */
  const handleAtomMove = useCallback((atomId, newPosition) => {
    setAtoms(prev => ({
      ...prev,
      [atomId]: {
        ...prev[atomId],
        position: {
          x: newPosition.x,
          y: newPosition.y,
          z: newPosition.z
        }
      }
    }));
  }, []);

  /**
   * 处理化学键添加
   * Handle bond addition
   * @param {string} atom1Id - 原子1ID / Atom 1 ID
   * @param {string} atom2Id - 原子2ID / Atom 2 ID
   */
  const handleAddBond = useCallback((atom1Id, atom2Id) => {
    if (atom1Id === atom2Id) return;
    
    const existingBond = bonds.find(bond => 
      (bond.atomIds[0] === atom1Id && bond.atomIds[1] === atom2Id) ||
      (bond.atomIds[0] === atom2Id && bond.atomIds[1] === atom1Id)
    );
    
    if (existingBond) return;

    const newBond = {
      id: `bond_${Date.now()}`,
      atomIds: [atom1Id, atom2Id],
      order: 1,
      strength: 1.0,
      bondType: selectedBondType
    };

    setBonds(prev => [...prev, newBond]);
    setBondStartAtom(null);
  }, [bonds, selectedBondType, setBonds]);

  /**
   * 处理导出
   * Handle export
   */
  const handleExport = useCallback(() => {
    const blob = exportToChemx(metadata, keyframes);
    downloadFile(blob, `${metadata.name || 'reaction'}.chemx`);
  }, [metadata, keyframes]);

  /**
   * 处理原子位置更新
   * Handle atom position update
   */
  const handleAtomPositionUpdate = useCallback((newPosition) => {
    if (!selectedAtom) return;
    
    setAtoms(prev => ({
      ...prev,
      [selectedAtom]: {
        ...prev[selectedAtom],
        position: newPosition
      }
    }));
  }, [selectedAtom, setAtoms]);

  /**
   * 处理撤销操作
   * Handle undo operation
   */
  const handleUndo = useCallback(() => {
    console.log('Undo triggered', { canUndoAtoms, canUndoBonds });
    if (canUndoAtoms) {
      console.log('Undoing atoms');
      undoAtoms();
    }
    if (canUndoBonds) {
      console.log('Undoing bonds');
      undoBonds();
    }
  }, [canUndoAtoms, canUndoBonds, undoAtoms, undoBonds]);

  // 添加键盘快捷键支持
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault();
        handleUndo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleUndo]);

  // 添加处理函数
  const handleBreakBond = useCallback((bondId) => {
    setBonds(prev => prev.filter(bond => bond.id !== bondId));
  }, [setBonds]);

  return (
    <div className="h-screen flex flex-col">
      <Toolbar
        metadata={metadata}
        setMetadata={setMetadata}
        editMode={editMode}
        setEditMode={setEditMode}
        selectedAtomType={selectedAtomType}
        setSelectedAtomType={setSelectedAtomType}
        selectedBondType={selectedBondType}
        setSelectedBondType={setSelectedBondType}
        onUndo={handleUndo}
        canUndo={canUndoAtoms || canUndoBonds}
      />
      
      <div className="flex-1 flex">
        <div className="flex-1 relative">
          <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            
            <SceneController
              editMode={editMode}
              onPlaceAtom={handlePlaceAtom}
              onSelectAtom={setSelectedAtom}
              onStartBond={(atomId) => {
                console.log('Starting bond from atom:', atomId);
                if (bondStartAtom === atomId) {
                  setBondStartAtom(null);
                } else {
                  setBondStartAtom(atomId);
                }
              }}
              onCompleteBond={(atom1Id, atom2Id) => {
                console.log('Completing bond between atoms:', atom1Id, atom2Id);
                handleAddBond(atom1Id, atom2Id);
              }}
              bondStartAtom={bondStartAtom}
              atoms={atoms}
            />
  
            {Object.entries(atoms).map(([id, atom]) => (
              <DraggableAtom
                key={id}
                atom={atom}
                selected={selectedAtom === id || bondStartAtom === id}
                editMode={editMode}
                onSelect={() => {
                  console.log('Atom selected:', id);
                  if (editMode === 'addBond') {
                    if (!bondStartAtom) {
                      setBondStartAtom(id);
                    } else if (bondStartAtom === id) {
                      setBondStartAtom(null);
                    } else {
                      handleAddBond(bondStartAtom, id);
                    }
                  } else {
                    setSelectedAtom(id);
                  }
                }}
                onMove={handleAtomMove}
                isStartAtom={bondStartAtom === id}
              />
            ))}
  
            {bonds.map(bond => (
              <Bond
                key={bond.id}
                bond={bond}
                atom1={atoms[bond.atomIds[0]]}
                atom2={atoms[bond.atomIds[1]]}
                editMode={editMode}
                onBreakBond={handleBreakBond}
              />
            ))}
  
            <OrbitControls
              enableDamping
              dampingFactor={0.05}
              rotateSpeed={0.5}
              minDistance={2}
              maxDistance={20}
            />
          </Canvas>
  
          {/* 编辑模式提示 */}
          <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-2 rounded">
            {editMode === 'addAtom' && t('keyframeEditor.hints.addAtom')}
            {editMode === 'addBond' && t('keyframeEditor.hints.addBond')}
            {editMode === 'select' && t('keyframeEditor.hints.select')}
          </div>
        </div>

        <KeyframePanel
          currentKeyframe={currentKeyframe}
          keyframes={keyframes}
          onSaveKeyframe={() => saveKeyframe(atoms, bonds)}
          onSelectKeyframe={switchKeyframe}
          onExport={handleExport}
        />
      </div>

      {/* 添加原子位置编辑器 */}
      {selectedAtom && editMode === 'select' && (
        <AtomPositionEditor
          selectedAtom={atoms[selectedAtom]}
          onUpdatePosition={handleAtomPositionUpdate}
        />
      )}
    </div>
  );
};

export default KeyframeEditor;