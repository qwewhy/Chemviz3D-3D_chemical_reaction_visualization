import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Scene from '../components/three/Scene';
import { useSimulationStore } from '../store/simulationStore';

const Home = () => {
  const { t } = useTranslation();
  const setMolecules = useSimulationStore((state) => state.setMolecules);

  // 设置默认分子
  useEffect(() => {
    // 示例分子数据
    const defaultMolecules = [
      {
        atoms: [
          { element: 'O', position: [0, 0, 0] },
          { element: 'H', position: [-0.5, 0.5, 0] },
          { element: 'H', position: [0.5, 0.5, 0] },
        ],
        bonds: [
          { start: [0, 0, 0], end: [-0.5, 0.5, 0] },
          { start: [0, 0, 0], end: [0.5, 0.5, 0] },
        ],
        position: [0, 0, 0],
      },
    ];
    setMolecules(defaultMolecules);
  }, [setMolecules]);

  return (
    <div className="min-h-screen">
      {/* 英雄区块 / Hero section */}
      <section className="relative h-[70vh]">
        <div className="absolute inset-0 w-full h-full">
          <Scene />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-6xl text-white font-bold mb-4">
              {t('home.title')}
            </h1>
            <p className="text-white text-xl mb-8 max-w-2xl">
              {t('home.subtitle')}
            </p>
            <Link
              to="/simulation"
              className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-lg
                transition-colors text-lg inline-block"
            >
              {t('home.startButton')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 