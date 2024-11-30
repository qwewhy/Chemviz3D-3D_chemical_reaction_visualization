import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navigation from './Navigation';
import LanguageSwitch from '../ui/LanguageSwitch';

// Header组件：应用程序的顶部导航栏
// Header component: Top navigation bar of the application
const Header = () => {
  const { t } = useTranslation();

  return (
    <header className="bg-primary text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* 网站Logo和标题 / Website logo and title */}
        <Link to="/" className="text-xl font-bold flex items-center gap-2">
          <img 
            src="/chemistry-3d-logo.svg" 
            alt="Chemical Reaction 3D" 
            className="w-10 h-10"
          />
          <span className="hidden md:inline">{t('home.title')}</span>
        </Link>
        
        {/* 导航菜单 / Navigation menu */}
        <div className="flex items-center gap-4 relative z-[1000]">
          <Navigation />
          <div className="relative z-[1001]"> 
            <LanguageSwitch />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 