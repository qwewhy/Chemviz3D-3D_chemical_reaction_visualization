import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { Physics } from '@react-three/cannon';
import Molecule from './Molecule';
import { useSimulationStore } from '../../store/simulationStore';

const Scene = () => {
  const molecules = useSimulationStore((state) => state.molecules);

  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <Physics>
          {molecules && molecules.map((molecule, index) => (
            <Molecule key={index} {...molecule} />
          ))}
        </Physics>
        <OrbitControls />
        <Environment preset="sunset" />
      </Canvas>
    </div>
  );
};

export default Scene; 