/**
 * @file App.jsx
 * @author1 [Hongyuan Wang] <HW8545626@gmail.com>
 * @copyright Copyright (c) 2024 [Hongyuan Wang]
 * @license MIT
 * @description This module implements the main application component.
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SimulationProvider } from './context/SimulationContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Simulator from './pages/Simulator';
import OrganicReaction from './pages/OrganicReaction';
import MoleculeLibrary from './pages/MoleculeLibrary';
import About from './pages/About';

// App组件：应用程序的主要入口点
// App component: Main entry point of the application
function App() {
  return (
    <SimulationProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          {/* 头部导航 / Header navigation */}
          <Header className="fixed top-0 w-full z-50" />
          
          {/* 主要内容区域 / Main content area */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/simulation" element={<Simulator />} />
              <Route path="/organic" element={<OrganicReaction />} />
              <Route path="/molecule-library" element={<MoleculeLibrary />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>
          
          {/* 页脚 / Footer */}
          <Footer />
        </div>
      </Router>
    </SimulationProvider>
  );
}

export default App;