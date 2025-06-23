import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Language } from '../types';
import { SUPPORTED_LANGUAGES } from '../constants/languages';

interface LanguageSelectorProps {
  selectedLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  selectedLanguage,
  onLanguageChange
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{selectedLanguage.flag}</span>
          <span className="font-medium text-gray-900">{selectedLanguage.name}</span>
        </div>
        <ChevronDown 
          className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-64 overflow-y-auto">
          {SUPPORTED_LANGUAGES.map((language) => (
            <button
              key={language.code}
              onClick={() => {
                onLanguageChange(language);
                setIsOpen(false);
              }}
              className={`flex items-center w-full px-4 py-3 space-x-3 hover:bg-gray-50 transition-colors duration-150 ${
                selectedLanguage.code === language.code ? 'bg-blue-50 text-blue-700' : 'text-gray-900'
              }`}
            >
              <span className="text-2xl">{language.flag}</span>
              <span className="font-medium">{language.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};