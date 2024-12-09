/**
 * @file Home.jsx
 * @author1 [Hongyuan Wang] <HW8545626@gmail.com>
 * @copyright Copyright (c) 2024 [Hongyuan Wang]
 * @license MIT
 * @description This module implements the Home page component, providing a hero section and feature showcase.
 */

import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

/**
 * Home page component with hero section and feature showcase
 * 主页组件，包含英雄区块和特性展示
 */
const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Hero Section / 英雄区块 */}
      <section className="relative h-screen flex items-center">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          {/* Left Content / 左侧内容 */}
          <div className="md:w-1/2 text-white space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
              {t('home.title')}
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              {t('home.subtitle')}
            </p>
            <div className="space-x-4">
              <Link
                to="/simulation"
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg
                  transition-colors text-lg inline-block"
              >
                {t('home.startButton')}
              </Link>
              <Link
                to="/about"
                className="border border-blue-500 text-blue-500 hover:bg-blue-500/10 
                  px-8 py-3 rounded-lg transition-colors text-lg inline-block"
              >
                {t('home.learnMore')}
              </Link>
            </div>
          </div>

          {/* Right Content - Logo Animation / 右侧内容 - Logo动画 */}
          <div className="md:w-1/2 mt-12 md:mt-0">
            <div className="relative w-full max-w-lg mx-auto">
              <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
              <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
              <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
              <img
                src="/chemistry-3d-logo.svg"
                alt="Chemistry 3D Logo"
                className="relative w-full h-full object-contain animate-float"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section / 特性区块 */}
      <section className="py-20 bg-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature Cards / 特性卡片 */}
            <FeatureCard
              title={t('home.features.simulation.title')}
              description={t('home.features.simulation.description')}
              icon="🧪"
            />
            <FeatureCard
              title={t('home.features.interaction.title')}
              description={t('home.features.interaction.description')}
              icon="🔍"
            />
            <FeatureCard
              title={t('home.features.learning.title')}
              description={t('home.features.learning.description')}
              icon="📚"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

/**
 * Feature card component
 * 特性卡片组件
 */
const FeatureCard = ({ title, description, icon }) => (
  <div className="bg-gray-700/50 rounded-xl p-6 backdrop-blur-sm hover:transform hover:-translate-y-1 transition-all duration-300">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
);

export default Home; 