import React from 'react';

/**
 * 原子位置编辑器组件
 * Atom Position Editor Component
 * 用于精确控制选中原子的位置
 */
const AtomPositionEditor = ({ selectedAtom, onUpdatePosition }) => {
  if (!selectedAtom) return null;

  const handleAxisChange = (axis, value) => {
    const newPosition = { ...selectedAtom.position };
    newPosition[axis] = parseFloat(value) || 0;
    onUpdatePosition(newPosition);
  };

  const handleAxisStep = (axis, step) => {
    const newPosition = { ...selectedAtom.position };
    newPosition[axis] = (parseFloat(newPosition[axis]) || 0) + step;
    onUpdatePosition(newPosition);
  };

  return (
    <div className="absolute bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg">
      <h3 className="text-lg font-bold mb-2">
        原子位置编辑 / Atom Position Edit
        <span className="ml-2 text-sm text-gray-500">
          {selectedAtom.symbol} - {selectedAtom.id}
        </span>
      </h3>
      
      {/* X轴控制 */}
      <div className="flex items-center gap-2 mb-2">
        <span className="w-8 text-red-500 font-bold">X:</span>
        <button
          className="px-2 py-1 bg-red-100 hover:bg-red-200 rounded"
          onClick={() => handleAxisStep('x', -1)}
        >
          -1
        </button>
        <input
          type="number"
          className="w-24 px-2 py-1 border rounded"
          value={selectedAtom.position.x.toFixed(2)}
          onChange={(e) => handleAxisChange('x', e.target.value)}
          step="0.1"
        />
        <button
          className="px-2 py-1 bg-red-100 hover:bg-red-200 rounded"
          onClick={() => handleAxisStep('x', 1)}
        >
          +1
        </button>
      </div>

      {/* Y轴控制 */}
      <div className="flex items-center gap-2 mb-2">
        <span className="w-8 text-green-500 font-bold">Y:</span>
        <button
          className="px-2 py-1 bg-green-100 hover:bg-green-200 rounded"
          onClick={() => handleAxisStep('y', -1)}
        >
          -1
        </button>
        <input
          type="number"
          className="w-24 px-2 py-1 border rounded"
          value={selectedAtom.position.y.toFixed(2)}
          onChange={(e) => handleAxisChange('y', e.target.value)}
          step="0.1"
        />
        <button
          className="px-2 py-1 bg-green-100 hover:bg-green-200 rounded"
          onClick={() => handleAxisStep('y', 1)}
        >
          +1
        </button>
      </div>

      {/* Z轴控制 */}
      <div className="flex items-center gap-2">
        <span className="w-8 text-blue-500 font-bold">Z:</span>
        <button
          className="px-2 py-1 bg-blue-100 hover:bg-blue-200 rounded"
          onClick={() => handleAxisStep('z', -1)}
        >
          -1
        </button>
        <input
          type="number"
          className="w-24 px-2 py-1 border rounded"
          value={selectedAtom.position.z.toFixed(2)}
          onChange={(e) => handleAxisChange('z', e.target.value)}
          step="0.1"
        />
        <button
          className="px-2 py-1 bg-blue-100 hover:bg-blue-200 rounded"
          onClick={() => handleAxisStep('z', 1)}
        >
          +1
        </button>
      </div>
    </div>
  );
};

export default AtomPositionEditor; 