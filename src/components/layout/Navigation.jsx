import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Navigation = () => {
  const { t } = useTranslation();

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/simulation', label: t('nav.simulator') },
    { path: '/molecule-library', label: t('nav.molecules') },
    { path: '/about', label: t('nav.about') },
  ];

  return (
    <nav className="flex gap-6">
      {navLinks.map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          className={({ isActive }) =>
            `hover:text-gray-200 transition-colors ${
              isActive ? 'border-b-2 border-white' : ''
            }`
          }
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navigation; 