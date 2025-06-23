import { GoogleGenerativeAI } from '@google/generative-ai';

class GeminiService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('Gemini API key not found. Please add VITE_GEMINI_API_KEY to your .env file');
    }
    
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
  }

  async analyzeSignLanguage(imageData: string, targetLanguage: string): Promise<{
    detectedGesture: string;
    translation: string;
    confidence: number;
  }> {
    try {
      const prompt = `
        Analyze this image for sign language gestures. If you detect any sign language:
        1. Identify the specific gesture or sign being made
        2. Translate it to ${targetLanguage}
        3. Provide a confidence score (0-100)
        
        Return your response in this exact JSON format:
        {
          "detectedGesture": "description of the sign or gesture detected",
          "translation": "translation in ${targetLanguage}",
          "confidence": confidence_score_as_number
        }
        
        If no clear sign language is detected, return:
        {
          "detectedGesture": "No clear sign detected",
          "translation": "Please make a clear sign language gesture",
          "confidence": 0
        }
      `;

      const result = await this.model.generateContent([
        prompt,
        {
          inlineData: {
            data: imageData.split(',')[1],
            mimeType: 'image/jpeg'
          }
        }
      ]);

      const response = await result.response;
      const text = response.text();
      
      // Extract JSON from the response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return {
          detectedGesture: parsed.detectedGesture || 'Unknown gesture',
          translation: parsed.translation || 'Unable to translate',
          confidence: Math.min(100, Math.max(0, parsed.confidence || 0))
        };
      }
      
      throw new Error('Invalid response format');
    } catch (error) {
      console.error('Gemini API error:', error);
      return {
        detectedGesture: 'Error analyzing gesture',
        translation: 'Unable to process at this time',
        confidence: 0
      };
    }
  }
}

export const geminiService = new GeminiService();