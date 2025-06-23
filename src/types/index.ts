export interface Language {
  code: string;
  name: string;
  flag: string;
}

export interface TranslationResult {
  detectedGesture: string;
  translation: string;
  confidence: number;
  timestamp: number;
}

export interface CameraStatus {
  isActive: boolean;
  isSupported: boolean;
  error: string | null;
}