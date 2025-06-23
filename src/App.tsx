import React, { useState } from 'react';
import { Languages, Sparkles } from 'lucide-react';
import { LanguageSelector } from './components/LanguageSelector';
import { CameraView } from './components/CameraView';
import { TranslationResult } from './components/TranslationResult';
import { geminiService } from './services/geminiService';
import { SUPPORTED_LANGUAGES } from './constants/languages';
import { Language, TranslationResult as TranslationResultType } from './types';

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(SUPPORTED_LANGUAGES[0]);
  const [translationResult, setTranslationResult] = useState<TranslationResultType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCapture = async (imageData: string) => {
    setIsLoading(true);
    try {
      const result = await geminiService.analyzeSignLanguage(imageData, selectedLanguage.name);
      setTranslationResult({
        ...result,
        timestamp: Date.now()
      });
    } catch (error) {
      console.error('Translation error:', error);
      setTranslationResult({
        detectedGesture: 'Error occurred',
        translation: 'Unable to process the sign at this time',
        confidence: 0,
        timestamp: Date.now()
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
                <Languages className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">SignTranslate AI</h1>
                <p className="text-sm text-gray-600">Powered by Gemini AI</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-purple-600">
              <Sparkles className="w-5 h-5" />
              <span className="font-medium">AI Powered</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Translate Sign Language to Any Language
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Use your camera to capture sign language gestures and get instant translations 
            powered by advanced AI technology.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Camera Section */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Camera Feed</h3>
              <CameraView onCapture={handleCapture} />
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-6">
            {/* Language Selector */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Target Language</h3>
              <LanguageSelector
                selectedLanguage={selectedLanguage}
                onLanguageChange={setSelectedLanguage}
              />
            </div>
          </div>
        </div>

        {/* Translation Results */}
        <div className="mt-12">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Translation Results</h3>
          <TranslationResult result={translationResult} isLoading={isLoading} />
        </div>

        {/* Instructions */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">How to Use</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-blue-600">1</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Start Camera</h4>
              <p className="text-gray-600">Click "Start Camera" to begin capturing video from your webcam.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-purple-600">2</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Make Signs</h4>
              <p className="text-gray-600">Perform clear sign language gestures in front of the camera.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-green-600">3</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Get Translation</h4>
              <p className="text-gray-600">Click "Translate Sign" to get AI-powered translations.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            Built with ❤️ by Omillo Charles
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;