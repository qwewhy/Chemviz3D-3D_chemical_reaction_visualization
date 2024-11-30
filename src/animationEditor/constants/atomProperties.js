/**
 * 原子属性常量定义
 * Atom property constants
 */

/**
 * 原子颜色映射表
 * Mapping table for atom colors
 */
export const ATOM_COLORS = {
  H: "#FFFFFF", // 氢原子 - 白色 / Hydrogen - White
  C: "#808080", // 碳原子 - 灰色 / Carbon - Gray
  O: "#FF0000", // 氧原子 - 红色 / Oxygen - Red
  N: "#0000FF"  // 氮原子 - 蓝色 / Nitrogen - Blue
};

/**
 * 原子半径映射表
 * Mapping table for atom radii
 */
export const ATOM_RADIUS = {
  H: 0.25, // 氢原子最小 / Hydrogen is the smallest
  C: 0.7,  // 碳原子标准大小 / Carbon is the standard size
  O: 0.6,  // 氧原子略小于碳 / Oxygen is slightly smaller than carbon
  N: 0.65  // 氮原子介于碳氧之间 / Nitrogen is between carbon and oxygen
}; 