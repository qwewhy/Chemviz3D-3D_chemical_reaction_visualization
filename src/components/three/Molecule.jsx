import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Line } from '@react-three/drei';
import { useBox } from '@react-three/cannon';
import { Vector3 } from 'three';

/**
 * Molecule component for rendering atoms and bonds
 * 分子组件，用于渲染原子和化学键
 */
const Molecule = ({ molecule }) => {
  if (!molecule) return null;

  // 创建一个 ref 来存储渲染组的引用
  const renderGroupRef = useRef();

  // Physics body configuration / 物理体配置
  const [physicsRef, api] = useBox(() => ({
    mass: 1,
    position: molecule.position.toArray(),
    args: [1.5, 1.5, 1.5],
    linearDamping: 0.999,
    angularDamping: 0.999,
    friction: 0.1,
    restitution: 0.2,
    allowSleep: true,
    fixedRotation: true,
    collisionResponse: 1,
    onCollide: (e) => {
      // 碰撞事件处理 / Collision event handling
    }
  }));

  // Update molecule position from physics / 从物理引擎更新分子位置
  useFrame(() => {
    api.position.subscribe((pos) => {
      // 更新物理位置
      molecule.position.set(pos[0], pos[1], pos[2]);
      // 同步渲染组的位置
      if (renderGroupRef.current) {
        renderGroupRef.current.position.set(pos[0], pos[1], pos[2]);
      }
      // 更新原子相对位置
      molecule.updateAtomicPositions();
    });
  });

  // Calculate bonds / 计算化学键
  const calculateBonds = () => {
    const bonds = [];
    if (molecule.molecularFormula === 'H2O') {
      const { oxygenAtom, hydrogenAtoms } = molecule;
      bonds.push({
        start: oxygenAtom.position,
        end: hydrogenAtoms[0].position
      });
      bonds.push({
        start: oxygenAtom.position,
        end: hydrogenAtoms[1].position
      });
    }
    return bonds;
  };

  const bonds = calculateBonds();

  return (
    <>
      {/* Physics body / 物理碰撞体 */}
      <group ref={physicsRef}>
        {/* Debug collision box / 调试用碰撞箱 */}
        <mesh>
          <boxGeometry args={[1.5, 1.5, 1.5]} />
          <meshBasicMaterial wireframe color="yellow" opacity={0.2} transparent />
        </mesh>
      </group>

      {/* Visual representation / 视觉渲染 */}
      <group ref={renderGroupRef} position={molecule.position.toArray()}>
        {/* Atoms / 原子 */}
        {molecule.atoms.map((atom, index) => (
          <Atom 
            key={index} 
            position={[
              atom.position.x - molecule.position.x,
              atom.position.y - molecule.position.y,
              atom.position.z - molecule.position.z
            ]}
            element={atom.symbol}
            color={atom.color}
            radius={atom.atomicRadius / 100}
          />
        ))}

        {/* Bonds / 化学键 */}
        {bonds.map((bond, index) => (
          <Bond 
            key={index} 
            start={[
              bond.start.x - molecule.position.x,
              bond.start.y - molecule.position.y,
              bond.start.z - molecule.position.z
            ]}
            end={[
              bond.end.x - molecule.position.x,
              bond.end.y - molecule.position.y,
              bond.end.z - molecule.position.z
            ]}
          />
        ))}
      </group>
    </>
  );
};

/**
 * 原子组件，用于渲染单个原子
 */
const Atom = ({ position, element, color, radius = 0.5 }) => {
  return (
    <Sphere position={position} args={[radius, 32, 32]}>
      <meshStandardMaterial color={color} />
    </Sphere>
  );
};

/**
 * 化学键组件，用于渲染单个化学键
 */
const Bond = ({ start, end }) => {
  return (
    <Line
      points={[start, end]}
      color="white"
      lineWidth={3}
    />
  );
};

export default Molecule; 