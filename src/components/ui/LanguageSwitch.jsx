/**
 * @file LanguageSwitch.jsx
 * @author [Hongyuan Wang] <HW8545626@gmail.com>
 * @copyright Copyright (c) 2024 [Hongyuan Wang]
 * @license MIT
 * @description This module implements the LanguageSwitch component, providing a language switch with i18n support.
 */

import { useTranslation } from 'react-i18next';
import { Menu } from '@headlessui/react';

const LanguageSwitch = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'zh', name: '中文' },
    { code: 'ja', name: '日本語' },
    { code: 'de', name: 'Deutsch' },
    { code: 'fr', name: 'Français' },
    { code: 'it', name: 'Italiano' },
    { code: 'ko', name: '한국어' }
  ];

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="px-3 py-1 rounded-md bg-white/10 hover:bg-white/20 transition-colors">
        {languages.find(lang => lang.code === i18n.language)?.name || 'Language'}
      </Menu.Button>
      <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="py-1">
          {languages.map((lang) => (
            <Menu.Item key={lang.code}>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-gray-100' : ''
                  } w-full text-left px-4 py-2 text-sm text-gray-700`}
                  onClick={() => i18n.changeLanguage(lang.code)}
                >
                  {lang.name}
                </button>
              )}
            </Menu.Item>
          ))}
        </div>
      </Menu.Items>
    </Menu>
  );
};

export default LanguageSwitch; 