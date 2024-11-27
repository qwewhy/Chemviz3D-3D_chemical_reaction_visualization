# Chemical Reaction 3D Visualization V1.1.1

<p align="center">
  <img src="public/chemistry-3d-logo.svg" alt="Project Logo" width="200"/>
</p>

An interactive 3D visualization platform for chemical reactions, built with React and Three.js, providing an immersive educational experience for understanding molecular structures and chemical processes.

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![Three.js](https://img.shields.io/badge/Three.js-0.170.0-green.svg)](https://threejs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.10-purple.svg)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

You can use any device with a browser to experience at any time - Computer experience is recommended, mobile phone please use landscape screen.
v1.1.1:   [Have A Try!](http://chemviz3d.s3-website-ap-southeast-2.amazonaws.com) 
<!-- | [Documentation](https://your-docs-link.com) -->

## 🚀 Features

- **Real-time 3D Visualization**: Interactive molecular structure display using Three.js
- **Chemical Reaction Simulation**: Dynamic visualization of chemical reactions
- **Internationalization**: Support for multiple languages (EN, ZH, JA, DE, FR, IT, KO)
- **Educational Interface**: Comprehensive information about molecules and reactions
- **Responsive Design**: Seamless experience across different devices

## 🛠️ Technology Stack

- **Frontend Framework**: React 18.3.1
- **3D Rendering**:
  - Three.js 0.170.0
  - React Three Fiber 8.17.10
  - React Three Drei 9.117.3
  - React Three Cannon 6.6.0
- **State Management**: Zustand 4.4.1
- **Styling**: Tailwind CSS 3.4.15
- **Internationalization**: i18next & react-i18next
- **Build Tool**: Vite 5.4.10
- **Type Support**: TypeScript support included

## 📦 Project Structure

```plaintext
chemical-reaction-3d/
├── public/
│   ├── assets
│   └── chemistry-3d-logo.svg # 项目Logo project logo
├── src/
│   ├── components/       
│   │   ├── layout/      # 布局组件 Layout components 
│   │   │   ├── Header/  # 页面顶端 Header component
│   │   │   ├── Footer/  # 页脚 Footer component
│   │   │   └── Navigation.jsx # 导航栏 Navigation component
|   |   |   
│   │   ├── three/       # Three.js 相关组件 Three.js related components
│   │   │   ├── Scene.jsx        # 3D场景 3D scene
│   │   │   ├── Molecule.jsx     # 分子渲染和3js分子性质 Molecule rendering and 3js molecule properties
│   │   │   └── Breaker.jsx      # 场景底部的容器（烧杯） Container at the bottom of the scene
│   │   └── ui/          # UI组件 UI components
│   │       ├── Controls.jsx     # 反应界面右侧的控制面板 Control panel on the right side of the reaction interface
│   │       ├── Panel.jsx        # 信息面板 Information panel
│   │       └── LanguageSwitch.jsx # 语言切换 Language switch
│   ├── models/          # 分子和原子模型 Molecules and atoms models
│   │   ├── atoms/       # 原子基类和具体实现 Atoms base class and specific implementations
│   │   │   ├── BaseAtom.ts     # 原子基类 Atoms base class 
│   │   │   ├── H.ts            # 氢原子 Hydrogen atom
│   │   │   ├── O.ts            # 氧原子 Oxygen atom
│   │   │   ├── N.ts            # 氮原子 Nitrogen atom
│   │   │   ├── Cl.ts           # 氯原子 Chlorine atom
│   │   │   └── ...
│   │   └── molecules/   # 分子基类和具体实现 Molecules base class and specific implementations
│   │       ├── BaseMolecule.ts # 分子基类 Molecules base class
│   │       ├── H2O.ts          # 水分子 Water molecule
│   │       ├── NH3.ts          # 氨分子 Ammonia molecule
│   │       ├── HCl.ts          # 氯化氢分子 Hydrochloric acid molecule
│   │       ├── H2O2.ts         # 过氧化氢分子 Hydrogen peroxide molecule
│   │       ├── HClO.ts         # 次氯酸分子 Hypochlorous acid molecule
│   │       └── ...
│   ├── hooks/           # 自定义React hooks Custom React hooks
│   ├── pages/           # 页面组件 Page components
│   ├── store/           # 状态管理 State management
│   │   └── simulationStore.js # 对场景中的分子进行增加、删除等操作的接口 Interface for adding, deleting molecules in the scene
│   ├── utils/           # 工具函数 Utility functions
│   │   ├── constants.js # 常量 Constants
│   │   └── moleculeHelpers.js # 分子辅助函数 Molecule helper functions
│   ├── i18n/           # 国际化语言工具 Internationalization language tools
│   │   ├── config.js   # 国际化配置文件 Internationalization configuration file
│   │   └── locales/    # 国际化语言文件 Internationalization language files
│   └── context/        
│       └── SimulationContext.jsx # simulation 状态文件 Simulation state file
└── ...
```

## 🚀 Quick Start

### Prerequisites

- Node.js >= 16.0.0
- npm >= 7.0.0

### Installation and Setup

```bash
# Clone the repository
git clone https://github.com/qwewhy/Chemviz3D-3D_chemical_reaction_visualization.git

# Install dependencies
npm install

# Start development server
npm run dev 
or
npm start
```

The application will be available at `http://localhost:5173`

## 💻 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## 🌐 Internationalization

The application supports multiple languages:

- English (default)
- Chinese (简体中文)
- Japanese (日本語)
- German (Deutsch)
- French (Français)
- Italian (Italiano)
- Korean (한국어)

To add a new language, extend the translations in `src/i18n/config.js`.

## 🔧 Configuration

### Vite Configuration

The project uses Vite for building and development. Configuration can be found in `vite.config.js`.

### Tailwind Configuration

Tailwind CSS configuration is available in `tailwind.config.js`.

## 📱 Responsive Design

The application is fully responsive and supports:
- Desktop (1024px and above)
- Tablet (768px to 1023px)
- Mobile (below 768px)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
6. File Headers Format:
```typescript
/**
 * @file filename.jsx - Brief description
 * @author1 Original Author <email@example.com>
 * @author2 Contributor Name <email@example.com> (if applicable)
 * @copyright Copyright (c) 2024 Original Author
 * @license MIT
 * @description
 * Detailed description of the file's purpose and functionality.
 * Multiple lines are allowed for complex explanations.
 */
```

## 🧪 Add new chemical reaction

To add new chemical reactions to the system, please follow these detailed steps:

### 1. Create atom model
Navigate to src/models/atoms and check if the required atoms already exist:
- If the atom class exists, you can use it directly
- If needed, create a new atom class that extends BaseAtom.ts
- Define all required physical and chemical properties as specified in BaseAtom.ts

### 2. Create molecule models
Create new molecule classes in src/models/molecules following BaseMolecule.ts structure:

```typescript
import { Vector3 } from 'three';
import { BaseMolecule } from './BaseMolecule';
import { YourAtom } from '../atoms/YourAtom';

export class YourMolecule extends BaseMolecule {
    readonly bondLength: number = 0.00;
    readonly boilingPoint: number = 0.00;
    readonly meltingPoint: number = 0.00;

    atom1: YourAtom;

    atom2: YourAtom;

    constructor(position?: Vector3, rotation?: Vector3) {
        super(
            'XX2',             // Molecular formula
            0.00,              // Molecular mass g/mol
            0.00,              // Density g/cm³
            position,
            rotation
        );

        // Initialize atoms
        this.atom1 = new YourAtom();
        this.atom2 = new YourAtom();

        // Add atoms to the molecule
        this.atoms = [this.atom1, this.atom2];
        
        this.updateAtomicPositions();
    }

    /**
     * Updates positions of all atoms in the molecule
     */
    updateAtomicPositions(): void {
        // Place first atom at half bond length before center
        this.atom1.setPosition(new Vector3(
            this.position.x - this.bondLength / 2,
            this.position.y,
            this.position.z
        ));

        // Place second atom at half bond length after center
        this.atom2.setPosition(new Vector3(
            this.position.x + this.bondLength / 2,
            this.position.y,
            this.position.z
        ));
    }
}
```

### 3. Import molecule class and add molecule creation handler
In src/components/ui/Controls.jsx:

```javascript
// 1. Import your new molecule class:
import { NewMolecule } from '../../models/molecules/NewMolecule';

// 2. Add molecule creation handler:
const handleAddNewMolecule = () => {
  try {
    const randomX = (Math.random() - 0.5) * 6;
    const newMolecule = new NewMolecule(
      new Vector3(randomX, 8, randomX) // Spawn position of the molecule
    );
    addMolecule(newMolecule);
  } catch (error) {
    console.error('Error creating molecule:', error);
  }
};

// 3. Add UI button:
<button
  onClick={handleAddNewMolecule}
  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg
    transition-colors mb-4"
>
  //t('***') is a i18n translation key, please refer to src/i18n/config.json
  {t('simulator.controls.addNewMolecule')} ({molecules.length}) 
</button>
```

### 4. Register new molecule and add reaction rules and product handling
In src/components/three/Scene.jsx:
```javascript
// 1. Import new molecule:
import { NewMolecule } from '../../models/molecules/NewMolecule';

// 2. Add all reaction rules about all molecules in this project:
const reactionRules = [
  {
    reactants: { 'ReactantA': 1, 'ReactantB': 1 },
    products: { 'NewProduct': 1 },
    name: 'New chemical reaction' // Reaction name, shown in browser console
  },
  {
      reactants: { 'NH3': 2, 'Cl2': 3 },
      products: { 'N2': 1, 'HCl': 6 },
      name: 'ammonia and chlorine to nitrogen and hydrochloric acid'
  }
  // ... add more reaction rules here
];

// 3. Update product handling in checkReactionPossibility:
const checkReactionPossibility = () => {
  // ...
  for (const [product, count] of Object.entries(rule.products)) {
    for (let i = 0; i < count; i++) {
      let newMolecule;
      switch (product) {
        case 'NH4OH':
          newMolecule = new AmmoniaHydrate();
          break;
        case 'H2O':
          newMolecule = new WaterMolecule();
          break;
        case 'NH3':
          newMolecule = new AmmoniaMolecule();
          break;
        case 'HClO':
          newMolecule = new HypochlorousAcid();
          break;
        // ... add your new product here
        default:
          console.warn(`unknown product: ${product}`);
          continue;
      }
      allNewMolecules.push(newMolecule);
    }
  }
};
```

### 5. Testing and validation
- When the reactant conditions meet the chemical reaction conditions, add any 1 more new molecule to the scene to trigger the reaction, and the reaction will occur
- The new molecule renders correctly in the 3D scene
- Chemical reactions proceed as expected
- Collision detection works properly
- Physics simulation behaves correctly with the new molecule

## 📄 MIT License

Copyright <2024 Hongyuan Wang>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## 👥 Authors and Contributors

### Original Author
- **Hongyuan Wang** - *Initial work & Core Development* - <HW8545626@gmail.com>
  - Project architecture design
  - Core functionality implementation
  - 3D visualization system
  - Molecule reaction simulation engine
  - Basic Atom and Molecule models
  - UI/UX design and implementation
  - Documentation

<p align="center">Made with ❤️ for chemistry education</p>