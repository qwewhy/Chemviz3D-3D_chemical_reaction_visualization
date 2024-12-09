/**
 * @file Beaker.jsx
 * @author1 [Hongyuan Wang] <HW8545626@gmail.com>
 * @copyright Copyright (c) 2024 [Hongyuan Wang]
 * @license MIT
 * @description This module implements the Beaker component, providing a 3D beaker model containing Molecules.
 */

import { useRef } from "react";
import { useCylinder } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Beaker = () => {
  const wallPhysicsConfig = {
    mass: 0,
    type: "Static",
    friction: 0.1,
    restitution: 0.1,
    collisionResponse: 1
  };

  // 墙体
  const [wallRef] = useCylinder(() => ({
    ...wallPhysicsConfig,
    position: [0, 0.2, 0], // 高度
    args: [6, 6, 4, 32], // 半径
  }));

  return (
    <group>
      <mesh ref={wallRef}>
        <cylinderGeometry args={[10, 10, 4, 32]} />
        <meshStandardMaterial
          color="#009AA0"
          transparent={true}
          opacity={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};

export default Beaker;