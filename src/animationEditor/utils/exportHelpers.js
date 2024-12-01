/**
 * 导出相关的工具函数
 * Export related utility functions
 */

/**
 * 转换原子数据格式
 * Convert atom data format
 */
const convertAtoms = (atomsObj) => {
  // 确保 atomsObj 是有效的对象
  if (!atomsObj || typeof atomsObj !== 'object') {
    console.error('Invalid atoms object:', atomsObj);
    return [];
  }

  return Object.values(atomsObj).map(atom => {
    // 验证原子数据的完整性
    if (!atom.id || !atom.symbol || !atom.position) {
      console.error('Invalid atom data:', atom);
      return null;
    }

    return {
      id: atom.id.replace('atom_', 'A'),
      symbol: atom.symbol,
      position: {
        x: Number(atom.position.x) || 0,
        y: Number(atom.position.y) || 0,
        z: Number(atom.position.z) || 0
      },
      charge: Number(atom.charge) || 0,
      electrons: Number(atom.electrons) || 0
    };
  }).filter(Boolean); // 过滤掉无效的原子数据
};

/**
 * 转换化学键数据格式
 * Convert bond data format
 */
const convertBonds = (bonds) => {
  // 确保 bonds 是有效的数组
  if (!Array.isArray(bonds)) {
    console.error('Invalid bonds array:', bonds);
    return [];
  }

  return bonds.map((bond, index) => {
    // 验证化学键数据的完整性
    if (!bond.atomIds || !Array.isArray(bond.atomIds) || bond.atomIds.length !== 2) {
      console.error('Invalid bond data:', bond);
      return null;
    }

    return {
      id: `bond_${String(index + 1).padStart(3, '0')}`,
      atomIds: bond.atomIds.map(id => id.replace('atom_', 'A')),
      order: Number(bond.order) || 1,
      strength: Number(bond.strength) || 1.0,
      bondType: (bond.bondType || 'covalent').toLowerCase()
    };
  }).filter(Boolean); // 过滤掉无效的化学键数据
};

/**
 * 导出场景数据为chemx格式
 */
export const exportToChemx = (metadata, keyframes) => {
  // 验证输入数据
  if (!Array.isArray(keyframes) || keyframes.length === 0) {
    console.error('Invalid keyframes data:', keyframes);
    throw new Error('No keyframes data to export');
  }

  // 验证并转换每一帧数据
  const validKeyframes = keyframes.map((frame, index) => {
    if (!frame || !frame.atoms || !frame.bonds) {
      console.error(`Invalid frame data at index ${index}:`, frame);
      return null;
    }

    return {
      timestamp: index * 2000,
      atoms: convertAtoms(frame.atoms),
      bonds: convertBonds(frame.bonds)
    };
  }).filter(Boolean); // 过滤掉无效的帧

  // 如果没有有效的帧数据，抛出错误
  if (validKeyframes.length === 0) {
    throw new Error('No valid keyframes data to export');
  }

  const chemxData = {
    version: "1.0",
    metadata: {
      ...metadata,
      author: "ChemX Editor User",
      exportTime: new Date().toISOString()
    },
    duration: (validKeyframes.length - 1) * 2000,
    keyframes: validKeyframes
  };

  console.log('Exporting chemx data:', chemxData);

  return new Blob([JSON.stringify(chemxData, null, 2)], {
    type: 'application/json'
  });
};

/**
 * 下载文件
 */
export const downloadFile = (blob, filename) => {
  try {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading file:', error);
    alert('Failed to download file. Please try again.');
  }
}; 