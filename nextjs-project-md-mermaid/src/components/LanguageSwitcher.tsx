'use client';

import { useState } from 'react';

export const LanguageSwitcher = () => {
  const [language, setLanguage] = useState('zh');

  const toggleLanguage = () => {
    setLanguage(language === 'zh' ? 'en' : 'zh');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="fixed top-4 right-4 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
    >
      {language === 'zh' ? 'English' : '中文'}
    </button>
  );
}; 