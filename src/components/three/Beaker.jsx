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

  // 墙体 - 更宽且更矮
  const [wallRef] = useCylinder(() => ({
    ...wallPhysicsConfig,
    position: [0, 1.5, 0], // 降低高度
    args: [6, 6, 4, 32], // 增加半径，减少高度
  }));

  // 内部空腔
  const [cavityRef] = useCylinder(() => ({
    ...wallPhysicsConfig,
    position: [0, 1.6, 0],
    args: [5.8, 5.8, 4.2, 32],
    isTrigger: true,
  }));

  // 底部
  const [bottomRef] = useCylinder(() => ({
    ...wallPhysicsConfig,
    position: [0, -0.5, 0], // 调整底部位置
    args: [6, 6, 0.2, 32], // 匹配新的半径
  }));

  return (
    <group>
      <mesh ref={wallRef}>
        <cylinderGeometry args={[6, 6, 4, 32]} />
        <meshStandardMaterial
          color="#ff0000"
          transparent={true}
          opacity={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};

export default Beaker;