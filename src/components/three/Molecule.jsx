import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Line } from '@react-three/drei';
import { useBox } from '@react-three/cannon';
import { getElementColor } from '../../utils/moleculeHelpers';

const Molecule = ({ atoms, bonds, position }) => {
  const [ref, api] = useBox(() => ({
    mass: 1,
    position,
    args: [1, 1, 1],
  }));

  return (
    <group ref={ref}>
      {atoms.map((atom, index) => (
        <Atom key={index} {...atom} />
      ))}
      {bonds.map((bond, index) => (
        <Bond key={index} {...bond} />
      ))}
    </group>
  );
};

const Atom = ({ position, element, radius = 0.5 }) => {
  return (
    <Sphere position={position} args={[radius, 32, 32]}>
      <meshStandardMaterial color={getElementColor(element)} />
    </Sphere>
  );
};

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