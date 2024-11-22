import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import Molecule from './Molecule';
import Beaker from './Beaker';
import { useSimulationStore } from '../../store/simulationStore';
import { Physics } from '@react-three/cannon';

/**
 * Main 3D scene component
 * 主3D场景组件
 */
const Scene = ({ mountKey }) => {
  const molecules = useSimulationStore((state) => state.molecules);

  return (
    <Canvas key={mountKey} camera={{ position: [0, 10, 30], fov: 50 }}>
      <Environment preset="studio" />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      <Physics
        gravity={[0, -9.81, 0]}
        defaultContactMaterial={{
          friction: 0.2,
          restitution: 0.5,
          contactEquationStiffness: 1e7,
          contactEquationRelaxation: 1,
        }}
        allowSleep={false}
        iterations={20}
      >
        <Beaker />
        {molecules.map((molecule, index) => (
          <Molecule key={`molecule-${index}-${molecule.id}`} molecule={molecule} />
        ))}
      </Physics>

      <OrbitControls 
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={8}
        maxDistance={30}
      />
    </Canvas>
  );
};

export default Scene;