import React from 'react';
import { ATOM_COLORS } from '../../constants/atomProperties';
import { BondType } from '../../../organic/types/ChemxTypes';

/**
 * 顶部工具栏组件
 * Top Toolbar Component
 * 包含元数据输入、编辑模式切换和原子类型选择
 * Contains metadata input, edit mode switching and atom type selection
 */
const Toolbar = ({
  metadata,
  setMetadata,
  editMode,
  setEditMode,
  selectedAtomType,
  setSelectedAtomType,
  selectedBondType,
  setSelectedBondType,
  onUndo,
  canUndo
}) => {
  return (
    <div className="p-4 bg-gray-100 shadow-md">
      {/* 元数据输入区 / Metadata input area */}
      <div className="flex gap-4 mb-4">
        <input
          className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="动画名称 / Animation Name"
          value={metadata.name}
          onChange={e => setMetadata(prev => ({...prev, name: e.target.value}))}
        />
        <input
          className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="描述 / Description"
          value={metadata.description}
          onChange={e => setMetadata(prev => ({...prev, description: e.target.value}))}
        />
      </div>
      
      {/* 编辑模式切换和原子类型选择 / Edit mode switch and atom type selection */}
      <div className="flex gap-2 items-center">
        {/* 选择模式 / Select mode */}
        <button 
          className={`px-4 py-2 rounded-lg transition-colors ${
            editMode === 'select' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
          onClick={() => setEditMode('select')}
        >
          选择 / Select
        </button>

        {/* 添加原子模式 / Add atom mode */}
        <button
          className={`px-4 py-2 rounded-lg transition-colors ${
            editMode === 'addAtom' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
          onClick={() => setEditMode('addAtom')}
        >
          添加原子 / Add Atom
        </button>

        {/* 添加化学键模式 / Add bond mode */}
        <button
          className={`px-4 py-2 rounded-lg transition-colors ${
            editMode === 'addBond' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
          onClick={() => setEditMode('addBond')}
        >
          添加化学键 / Add Bond
        </button>

        {/* 断开化学键模式 / Break bond mode */}
        <button
          className={`px-4 py-2 rounded-lg transition-colors ${
            editMode === 'breakBond' 
              ? 'bg-red-500 text-white' 
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
          onClick={() => setEditMode('breakBond')}
        >
          断开化学键 / Break Bond
        </button>

        {/* 撤销按钮 / Undo button */}
        <button
          className={`px-4 py-2 rounded-lg transition-colors ${
            canUndo
              ? 'bg-yellow-500 text-white hover:bg-yellow-600'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          onClick={onUndo}
          disabled={!canUndo}
          title="Ctrl+Z"
        >
          撤销 / Undo
        </button>

        {/* 原子类型选择器 - 移除样式覆盖 */}
        <div className="flex items-center gap-2 ml-4">
          <label className="text-gray-700">
            原子类型 / Atom Type:
          </label>
          <select
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedAtomType}
            onChange={e => setSelectedAtomType(e.target.value)}
          >
            {Object.keys(ATOM_COLORS).map(symbol => (
              <option key={symbol} value={symbol}>
                {symbol} - {getAtomName(symbol)}
              </option>
            ))}
          </select>
        </div>

        {/* 化学键类型选择器 - 仅在addBond模式下显示 */}
        {editMode === 'addBond' && (
          <div className="flex items-center gap-2 ml-4">
            <label className="text-gray-700">
              键类型 / Bond Type:
            </label>
            <select
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedBondType}
              onChange={e => setSelectedBondType(e.target.value)}
            >
              <option value={BondType.COVALENT}>共价键 / Covalent</option>
              <option value={BondType.IONIC}>离子键 / Ionic</option>
              <option value={BondType.METALLIC}>金属键 / Metallic</option>
            </select>
          </div>
        )}

        {/* 当前选中的原子类型预览 */}
        <div 
          className="w-8 h-8 rounded-full ml-2"
          style={{
            backgroundColor: ATOM_COLORS[selectedAtomType],
            border: '2px solid #666'
          }}
          title={`${selectedAtomType} - ${getAtomName(selectedAtomType)}`}
        />
      </div>
    </div>
  );
};

/**
 * 获取原子名称
 * Get atom name
 * @param {string} symbol - 原子符号 / Atom symbol
 * @returns {string} 原子名称 / Atom name
 */
const getAtomName = (symbol) => {
  const names = {
    H: '氢 / Hydrogen',
    C: '碳 / Carbon',
    O: '氧 / Oxygen',
    N: '氮 / Nitrogen'
  };
  return names[symbol] || symbol;
};

export default Toolbar; 