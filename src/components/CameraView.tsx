import React from 'react';
import { Camera, CameraOff, AlertCircle, Zap, RefreshCw } from 'lucide-react';
import { useCamera } from '../hooks/useCamera';

interface CameraViewProps {
  onCapture: (imageData: string) => void;
}

export const CameraView: React.FC<CameraViewProps> = ({ onCapture }) => {
  const { videoRef, cameraStatus, startCamera, stopCamera, captureFrame } = useCamera();

  const handleCapture = () => {
    console.log('Capture button clicked');
    const imageData = captureFrame();
    if (imageData) {
      console.log('Image captured, sending for translation');
      onCapture(imageData);
    } else {
      console.error('Failed to capture image');
      alert('Failed to capture image. Please try again.');
    }
  };

  const handleStartCamera = () => {
    console.log('Start camera button clicked');
    startCamera();
  };

  if (!cameraStatus.isSupported) {
    return (
      <div className="bg-gray-100 rounded-2xl p-8 text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Camera Not Supported</h3>
        <p className="text-gray-600">Your browser doesn't support camera access.</p>
        <p className="text-sm text-gray-500 mt-2">
          Please use a modern browser like Chrome, Firefox, or Safari.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="relative">
        {cameraStatus.isActive ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-96 object-cover bg-gray-900"
          />
        ) : (
          <div className="w-full h-96 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <div className="text-center">
              <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Camera Preview</h3>
              <p className="text-gray-500">Click "Start Camera" to begin sign language detection</p>
            </div>
          </div>
        )}
        
        {cameraStatus.isActive && (
          <div className="absolute top-4 right-4">
            <div className="flex items-center space-x-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span>LIVE</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-6">
        {cameraStatus.error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-red-700 text-sm font-medium mb-1">Camera Error</p>
                <p className="text-red-600 text-sm">{cameraStatus.error}</p>
                <button
                  onClick={handleStartCamera}
                  className="mt-2 flex items-center space-x-1 text-red-600 hover:text-red-700 text-sm font-medium"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Try Again</span>
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex space-x-3">
            {!cameraStatus.isActive ? (
              <button
                onClick={handleStartCamera}
                className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium shadow-md"
              >
                <Camera className="w-5 h-5" />
                <span>Start Camera</span>
              </button>
            ) : (
              <button
                onClick={stopCamera}
                className="flex items-center space-x-2 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 font-medium shadow-md"
              >
                <CameraOff className="w-5 h-5" />
                <span>Stop Camera</span>
              </button>
            )}
          </div>

          {cameraStatus.isActive && (
            <button
              onClick={handleCapture}
              className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 font-medium shadow-lg"
            >
              <Zap className="w-5 h-5" />
              <span>Capture & Translate</span>
            </button>
          )}
        </div>

        {cameraStatus.isActive && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-700 text-sm text-center font-medium">
              📹 Camera is active! Make a clear sign language gesture and click "Capture & Translate"
            </p>
          </div>
        )}

        {!cameraStatus.isActive && !cameraStatus.error && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-700 text-sm text-center">
              💡 <strong>Tip:</strong> Make sure to allow camera permissions when prompted by your browser
            </p>
          </div>
        )}
      </div>
    </div>
  );
};