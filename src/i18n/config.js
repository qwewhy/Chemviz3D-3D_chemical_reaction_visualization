import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// 创建所有语言的翻译资源
const resources = {
  en: {
    translation: {
      nav: {
        home: 'Home',
        simulator: 'Simulator',
        molecules: 'Molecules',
        about: 'About'
      },
      home: {
        title: 'Chemical Reaction 3D Visualization',
        subtitle: 'Explore the mysteries of chemical reactions through interactive 3D visualization',
        startButton: 'Start Experience'
      },
      simulator: {
        title: 'Simulator',
        controls: {
          start: 'Start Simulation',
          stop: 'Stop Simulation',
          reset: 'Reset',
          temperature: 'Temperature',
          pressure: 'Pressure'
        }
      },
      molecules: {
        title: 'Molecule Library',
        water: 'Water Molecule',
        waterDesc: 'Water molecule is one of the most basic chemical substances',
        categories: {
          organic: 'Organic Molecules',
          inorganic: 'Inorganic Molecules',
          common: 'Common Molecules'
        },
        details: {
          formula: 'Chemical Formula',
          structure: 'Structure',
          properties: 'Properties',
          applications: 'Applications'
        }
      },
      about: {
        title: 'About Us',
        description: 'This is a 3D chemical reaction visualization system based on Three.js and React',
        features: {
          title: 'Project Features',
          visualization: 'Real-time 3D visualization',
          interaction: 'Interactive molecular simulation',
          education: 'Educational reaction demonstration'
        },
        team: {
          title: 'Our Team',
          description: 'A group of passionate developers and chemists'
        },
        technology: {
          title: 'Technology Stack',
          description: 'Built with modern web technologies'
        }
      },
      footer: {
        links: 'Quick Links',
        contact: 'Contact Us',
        about: 'About Us',
        help: 'Help'
      }
    }
  },
  zh: {
    translation: {
      nav: {
        home: '首页',
        simulator: '模拟器',
        molecules: '分子库',
        about: '关于'
      },
      home: {
        title: '化学反应3D可视化',
        subtitle: '探索化学反应的奥秘，通过交互式3D可视化技术体验分子世界',
        startButton: '开始体验'
      },
      simulator: {
        title: '模拟器',
        controls: {
          start: '开始模拟',
          stop: '停止模拟',
          reset: '重置',
          temperature: '温度',
          pressure: '压力'
        }
      },
      molecules: {
        title: '分子库',
        water: '水分子',
        waterDesc: '水分子是最基本的化学物质之一'
      },
      about: {
        title: '关于我们',
        description: '这是一个基于Three.js和React的3D化学反应可视化系统',
        features: {
          title: '项目特点',
          visualization: '实时3D可视化',
          interaction: '交互式分子模拟',
          education: '教育性的反应展示'
        }
      },
      footer: {
        links: '快速链接',
        contact: '联系我们',
        about: '关于我们',
        help: '使用帮助'
      }
    }
  },
  ja: {
    translation: {
      nav: {
        home: 'ホーム',
        simulator: 'シミュレーター',
        molecules: '分子ライブラリ',
        about: '概要'
      },
      home: {
        title: '化学反応3D可視化',
        subtitle: 'インタラクティブな3D可視化技術で化学反応の神秘を探索',
        startButton: '体験を開始'
      },
      molecules: {
        title: '分子ライブラリ',
        water: '水分子',
        waterDesc: '水分子は最も基本的な化学物質の一つです',
        categories: {
          organic: '有機分子',
          inorganic: '無機分子',
          common: '一般的な分子'
        },
        details: {
          formula: '化学式',
          structure: '構造',
          properties: '特性',
          applications: '応用'
        }
      },
      about: {
        title: '私たちについて',
        description: 'Three.jsとReactをベースにした3D化学反応可視化システム',
        features: {
          title: 'プロジェクトの特徴',
          visualization: 'リアルタイム3D可視化',
          interaction: 'インタラクティブな分子シミュレーション',
          education: '教育的な反応デモンストレーション'
        }
      }
    }
  },
  de: {
    translation: {
      nav: {
        home: 'Startseite',
        simulator: 'Simulator',
        molecules: 'Molekülbibliothek',
        about: 'Über uns'
      },
      home: {
        title: '3D-Visualisierung chemischer Reaktionen',
        subtitle: 'Erforschen Sie die Geheimnisse chemischer Reaktionen durch interaktive 3D-Visualisierung',
        startButton: 'Erlebnis starten'
      },
      molecules: {
        title: 'Molekülbibliothek',
        water: 'Wassermolekül',
        waterDesc: 'Das Wassermolekül ist einer der grundlegendsten chemischen Substanzen',
        categories: {
          organic: 'Organische Moleküle',
          inorganic: 'Anorganische Moleküle',
          common: 'Häufige Moleküle'
        }
      }
    }
  },
  fr: {
    translation: {
      nav: {
        home: 'Accueil',
        simulator: 'Simulateur',
        molecules: 'Bibliothèque de molécules',
        about: 'À propos'
      },
      home: {
        title: 'Visualisation 3D des réactions chimiques',
        subtitle: 'Explorez les mystères des réactions chimiques grâce à la visualisation 3D interactive',
        startButton: 'Commencer l\'expérience'
      }
    }
  },
  it: {
    translation: {
      nav: {
        home: 'Home',
        simulator: 'Simulatore',
        molecules: 'Libreria molecolare',
        about: 'Chi siamo'
      },
      home: {
        title: 'Visualizzazione 3D delle reazioni chimiche',
        subtitle: 'Esplora i misteri delle reazioni chimiche attraverso la visualizzazione 3D interattiva',
        startButton: 'Inizia esperienza'
      }
    }
  },
  ko: {
    translation: {
      nav: {
        home: '홈',
        simulator: '시뮬레이터',
        molecules: '분자 라이브러리',
        about: '소개'
      },
      home: {
        title: '화학 반응 3D 시각화',
        subtitle: '인터랙티브 3D 시각화를 통한 화학 반응의 신비 탐구',
        startButton: '체험 시작'
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    lng: 'en', // 设置默认语言为英语
    interpolation: {
      escapeValue: false
    }
  });

export default i18n; 