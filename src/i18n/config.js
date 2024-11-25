import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// 导入语言文件
import en from './locales/en';
import zh from './locales/zh';
import ja from './locales/ja';
import de from './locales/de';
import fr from './locales/fr';
import it from './locales/it';
import ko from './locales/ko';

const resources = {
  en,
  zh,
  ja,
  de,
  fr,
  it,
  ko
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    lng: 'en', // 默认语言设为英文
    interpolation: {
      escapeValue: false
    }
  });

export default i18n; 