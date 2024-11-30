/**
 * 导出相关的工具函数
 * Export related utility functions
 */

/**
 * 转换原子数据格式
 * Convert atom data format
 */
const convertAtoms = (atomsObj) => {
  return Object.values(atomsObj).map(atom => ({
    id: atom.id.replace('atom_', 'A'),  // 使用更简洁的ID
    symbol: atom.symbol,
    position: atom.position,
    charge: atom.charge,
    electrons: atom.electrons
  }));
};

/**
 * 转换化学键数据格式
 * Convert bond data format
 */
const convertBonds = (bonds) => {
  return bonds.map((bond, index) => ({
    id: `bond_${String(index + 1).padStart(3, '0')}`,
    atomIds: bond.atomIds.map(id => id.replace('atom_', 'A')),
    order: bond.order,
    strength: bond.strength,
    bondType: bond.bondType.toLowerCase()
  }));
};

/**
 * 导出场景数据为chemx格式
 * Export scene data as chemx format
 * @param {Object} metadata - 元数据信息 / Metadata information
 * @param {Array} keyframes - 关键帧数据 / Keyframe data
 * @returns {Blob} 导出的文件数据 / Exported file data
 */
export const exportToChemx = (metadata, keyframes) => {
  const chemxData = {
    version: "1.0",
    metadata: {
      ...metadata,
      author: "ChemX Editor User",
    },
    duration: (keyframes.length - 1) * 2000,  // 从开始到结束的总时长
    keyframes: keyframes.map((frame, index) => ({
      timestamp: index * 2000,  // 每帧2000ms
      atoms: convertAtoms(frame.atoms),
      bonds: convertBonds(frame.bonds)
    }))
  };

  return new Blob([JSON.stringify(chemxData, null, 2)], {
    type: 'application/json'
  });
};

/**
 * 下载文件
 * Download file
 * @param {Blob} blob - 文件数据 / File data
 * @param {string} filename - 文件名 / Filename
 */
export const downloadFile = (blob, filename) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}; 