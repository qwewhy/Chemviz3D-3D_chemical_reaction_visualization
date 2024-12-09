/**
 * @file Footer.jsx
 * @author1 [Hongyuan Wang] <HW8545626@gmail.com>
 * @copyright Copyright (c) 2024 [Hongyuan Wang]
 * @license MIT
 * @description This module implements the Footer component, providing project information and description.
 */

// Footer.tsx
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Footer组件：网站底部信息
// Footer component: Website footer information
const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 项目信息 / Project information */}
          <div>
            <h3 className="text-lg font-bold mb-2">
              {t('footer.projectName')}
              <span className="block text-sm opacity-75">{t('footer.projectSubtitle')}</span>
            </h3>
            <p className="text-sm text-gray-300">
              <span className="block">{t('footer.description')}</span>
            </p>
          </div>

          {/* 快速链接 / Quick links */}
          <div>
            <h4 className="text-lg font-bold mb-2">{t('footer.quickLinks.title')}</h4>
            <ul className="text-sm space-y-2">
              <li><Link to="/about" className="hover:text-gray-300">{t('footer.quickLinks.about')}</Link></li>
              <li><Link to="/contact" className="hover:text-gray-300">{t('footer.quickLinks.contact')}</Link></li>
              <li><Link to="/help" className="hover:text-gray-300">{t('footer.quickLinks.help')}</Link></li>
            </ul>
          </div>

          {/* 联系信息 / Contact information */}
          <div>
            <h4 className="text-lg font-bold mb-2">{t('footer.contact.title')}</h4>
            <div className="text-sm space-y-2 text-gray-300">
              <p>{t('footer.contact.email')}</p>
              <p>{t('footer.contact.github')}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;