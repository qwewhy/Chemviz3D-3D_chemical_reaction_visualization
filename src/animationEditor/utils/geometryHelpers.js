import * as THREE from 'three';

/**
 * 几何计算相关的工具函数
 * Geometry calculation utility functions
 */

/**
 * 计算两点之间的距离
 * Calculate distance between two points
 * @param {Object} point1 - 第一个点 / First point
 * @param {Object} point2 - 第二个点 / Second point
 * @returns {number} 距离 / Distance
 */
export const calculateDistance = (point1, point2) => {
  return new THREE.Vector3(
    point1.x,
    point1.y,
    point1.z
  ).distanceTo(new THREE.Vector3(
    point2.x,
    point2.y,
    point2.z
  ));
};

/**
 * 计算两个原子之间的化学键方向
 * Calculate chemical bond direction between two atoms
 * @param {Object} atom1 - 第一个原子 / First atom
 * @param {Object} atom2 - 第二个原子 / Second atom
 * @returns {THREE.Vector3} 方向向量 / Direction vector
 */
export const calculateBondDirection = (atom1, atom2) => {
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
  return end.sub(start).normalize();
}; 