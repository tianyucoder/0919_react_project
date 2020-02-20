import i18n from 'i18next';
  import Backend from 'i18next-xhr-backend';
  import LanguageDetector from 'i18next-browser-languagedetector';
  import { initReactI18next } from 'react-i18next';

  i18n
    // load translation using xhr -> see /public/locales
    // learn more: https://github.com/i18next/i18next-xhr-backend
    .use(Backend) // 内部发ajax请求加载locale文件
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector) // 检查浏览器当前的语言
    // pass the i18n instance to react-i18next.
    .use(initReactI18next) // 指定i18n对象
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({ // 初始化
      fallbackLng: 'en', // 如果没有对应的语言资源, 加载指定的
      debug: false, // 是否使用调试模式

      interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
      },
    });

  export default i18n;