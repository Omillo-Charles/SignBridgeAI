import React from 'react';
import { MessageSquare, Clock, TrendingUp } from 'lucide-react';
import { TranslationResult as TranslationResultType } from '../types';

interface TranslationResultProps {
  result: TranslationResultType | null;
  isLoading: boolean;
}

export const TranslationResult: React.FC<TranslationResultProps> = ({ result, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Analyzing Sign Language</h3>
          <p className="text-gray-600">Please wait while we process your gesture...</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 text-center border border-blue-100">
        <MessageSquare className="w-12 h-12 text-blue-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready to Translate</h3>
        <p className="text-gray-600">Capture a sign language gesture to see the translation here.</p>
      </div>
    );
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-600 bg-green-100';
    if (confidence >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
        <h3 className="text-xl font-bold mb-2">Translation Result</h3>
        <div className="flex items-center space-x-2 text-blue-100">
          <Clock className="w-4 h-4" />
          <span className="text-sm">{formatTime(result.timestamp)}</span>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Detected Gesture</label>
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-gray-900 font-medium">{result.detectedGesture}</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Translation</label>
            <div className="p-4 bg-blue-50 rounded-xl">
              <p className="text-blue-900 font-medium text-lg">{result.translation}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-gray-500" />
            <span className="text-sm text-gray-600">Confidence Score</span>
          </div>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${getConfidenceColor(result.confidence)}`}>
            {result.confidence}%
          </div>
        </div>

        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
                result.confidence >= 80 ? 'bg-green-500' :
                result.confidence >= 60 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${result.confidence}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};