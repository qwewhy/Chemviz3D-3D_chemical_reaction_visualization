# Chemical Reaction 3D Visualization

<p align="center">
  <img src="public/chemistry-3d-logo.svg" alt="Project Logo" width="200"/>
</p>

An interactive 3D visualization platform for chemical reactions, built with React and Three.js, providing an immersive educational experience for understanding molecular structures and chemical processes.

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![Three.js](https://img.shields.io/badge/Three.js-0.170.0-green.svg)](https://threejs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.10-purple.svg)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

[Live Demo](https://your-demo-link.com) | [Documentation](https://your-docs-link.com)

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
│   ├── assets/
│   │   ├── molecules/    # Molecule models and textures
│   │   └── textures/     # General textures
│   └── chemistry-3d-logo.svg
├── src/
│   ├── components/       # React components
│   │   ├── layout/      # Layout components (Header, Footer)
│   │   ├── three/       # Three.js related components
│   │   └── ui/          # UI components
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Page components
│   ├── store/           # State management
│   ├── utils/           # Utility functions
│   └── i18n/           # Internationalization
└── ...
```

## 🚀 Quick Start

### Prerequisites

- Node.js >= 16.0.0
- npm >= 7.0.0

### Installation and Setup

```bash
# Clone the repository
git clone https://github.com/your-username/chemical-reaction-3d.git

# Navigate to project directory
cd chemical-reaction-3d

# Install dependencies
npm install

# Start development server
npm run dev
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

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_APP_TITLE=Chemical Reaction 3D
VITE_API_URL=your-api-url
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

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Your Name - Initial work - [YourGithub](https://github.com/yourusername)

## 🙏 Acknowledgments

- Three.js community
- React Three Fiber team
- All contributors and supporters

## 📝 Changelog

### [1.0.0] - 2024-03-XX
- Initial release
- Basic molecular visualization
- Multi-language support
- Reaction simulation features

---

<p align="center">Made with ❤️ for chemistry education</p>