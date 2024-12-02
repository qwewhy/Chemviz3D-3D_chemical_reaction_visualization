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
import KeyFrameEditorImportantNotesAlert from '../components/layout/KeyFrameEditorImportantNotesAlert';
import Axes from '../animationEditor/components/scene/Axes';

/**
 * 化学反应动画编辑器主页面
 * Chemical Reaction Animation Editor Main Page
 */
const KeyframeEditor = () => {
  // 状态管理 / State management
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
    switchKeyframe,
    getCurrentKeyframeData,
    validateAllKeyframes
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
    try {
      if (!validateAllKeyframes()) {
        alert('Some keyframes contain invalid data. Please check your data before exporting.');
        return;
      }

      const blob = exportToChemx(metadata, keyframes);
      downloadFile(blob, `${metadata.name || 'reaction'}.chemx`);
    } catch (error) {
      console.error('Export failed:', error);
      alert(`Export failed: ${error.message}`);
    }
  }, [metadata, keyframes, validateAllKeyframes]);

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
    
    // 只回退最近的一个操作
    if (canUndoAtoms) {
      const atomsTimestamp = undoAtoms.getLastTimestamp?.() || 0;
      const bondsTimestamp = undoBonds.getLastTimestamp?.() || 0;
      
      if (atomsTimestamp >= bondsTimestamp) {
        console.log('Undoing atoms');
        undoAtoms();
      }
    }
    
    if (canUndoBonds) {
      const atomsTimestamp = undoAtoms.getLastTimestamp?.() || 0;
      const bondsTimestamp = undoBonds.getLastTimestamp?.() || 0;
      
      if (bondsTimestamp > atomsTimestamp) {
        console.log('Undoing bonds');
        undoBonds();
      }
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

  /**
   * 处理原子删除
   * Handle atom deletion
   */
  const handleDeleteAtom = useCallback((atomId) => {
    // 删除与该原子相关的所有化学键
    setBonds(prev => prev.filter(bond => 
      !bond.atomIds.includes(atomId)
    ));
    
    // 删除原子
    setAtoms(prev => {
      const newAtoms = { ...prev };
      delete newAtoms[atomId];
      return newAtoms;
    });
    
    // 如果删除的是当前选中的原子，清除选中状态
    if (selectedAtom === atomId) {
      setSelectedAtom(null);
    }
    
    // 如果删除的是正在创建化学键的原子，清除化学键创建状态
    if (bondStartAtom === atomId) {
      setBondStartAtom(null);
    }
  }, [selectedAtom, bondStartAtom, setBonds, setAtoms]);

  // 处理关键帧切换的函数
  const handleKeyframeSwitch = useCallback((index) => {
    console.log('Switching to keyframe:', index);
    
    // 如果切换到新的空帧位置
    if (index === keyframes.length) {
      setAtoms({});
      setBonds([]);
      switchKeyframe(index);
      return;
    }
    
    // 切换到已存在的帧
    const targetKeyframe = keyframes[index];
    if (targetKeyframe) {
      setAtoms(targetKeyframe.atoms);
      setBonds(targetKeyframe.bonds);
      switchKeyframe(index);
    }
  }, [keyframes, switchKeyframe, setAtoms, setBonds]);

  // 在 KeyframePanel 组件的 onSaveKeyframe 回调中添加日志
  const handleSaveKeyframe = useCallback(() => {
    console.log('Saving keyframe:', {
      atomsCount: Object.keys(atoms).length,
      bondsCount: bonds.length,
      currentKeyframe
    });
    
    // 检查是否有原子或键
    if (Object.keys(atoms).length === 0 && bonds.length === 0) {
      alert('Please add some atoms or bonds first');
      return;
    }
    
    saveKeyframe(atoms, bonds);
  }, [atoms, bonds, currentKeyframe, saveKeyframe]);

  // 在现有的 handleSaveKeyframe 函数旁添加新的处理函数
  const handleCreateNewFrame = useCallback(() => {
    console.log('Creating new frame');
    
    // 检查是否有原子或键
    if (Object.keys(atoms).length === 0 && bonds.length === 0) {
      alert('Please add some atoms or bonds first');
      return;
    }
    
    // 切换到新的帧位置
    const newFrameIndex = keyframes.length;
    if (newFrameIndex < 20) {
      switchKeyframe(newFrameIndex);
      saveKeyframe(atoms, bonds);
    } else {
      alert('Maximum 20 keyframes allowed');
    }
  }, [atoms, bonds, keyframes.length, switchKeyframe, saveKeyframe]);


  

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
            <Axes size={10} />
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
                onDelete={handleDeleteAtom}
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
          
          <KeyFrameEditorImportantNotesAlert />

          {/* 编辑模式提示 */}
          <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-2 rounded">
            {editMode === 'addAtom' && t('keyframeEditor.hints.addAtom')}
            {editMode === 'addBond' && t('keyframeEditor.hints.addBond')}
            {editMode === 'select' && t('keyframeEditor.hints.select')}
            {editMode === 'deleteAtom' && t('keyframeEditor.hints.deleteAtom')}
            {editMode === 'breakBond' && t('keyframeEditor.hints.breakBond')}
          </div>
        </div>

        <KeyframePanel
          currentKeyframe={currentKeyframe}
          keyframes={keyframes}
          onSaveKeyframe={handleSaveKeyframe}
          onCreateNewFrame={handleCreateNewFrame}
          onSelectKeyframe={handleKeyframeSwitch}
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