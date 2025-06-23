# 🤖 SignBridge AI

**SignBridge AI** is an intelligent web-based assistant that translates between **sign language and spoken English** — and vice versa. It bridges communication gaps between the Deaf community and the hearing world using advanced AI, computer vision, and natural language processing.

🔗 [Live Demo](https://signbridgeai.vercel.app/)

---

## 🚀 Features

- 🔤 **Sign to English**: Upload or capture a hand gesture image and get accurate translations.
- 💬 **English to Sign**: Enter any sentence and receive clear gesture descriptions.
- 🗣️ **Text-to-Speech**: Hear the translated English output using realistic voice synthesis.
- 🌍 **Multilingual & Inclusive**: Designed with future support for multiple languages and dialects.
- 🌐 **Powered by Gemini, ElevenLabs & Google Cloud Vision**

---

## 🧠 How It Works

1. **Sign Image Recognition**: Uses Google Cloud Vision API to analyze sign language images.
2. **Language Interpretation**: Gemini Pro 1.5 translates signs and English phrases with cultural context.
3. **Speech Synthesis**: ElevenLabs API brings the English translation to life with natural voice output.

---

## 🛠️ Tech Stack

| Tool | Purpose |
|------|---------|
| **React + Vite** | Frontend framework |
| **Tailwind CSS** | Styling and layout |
| **Google Gemini Pro** | Text interpretation and sign gesture generation |
| **Google Cloud Vision** | Image-to-text (sign language recognition) |
| **ElevenLabs** | High-quality text-to-speech |

---

## 📂 Project Structure

src/
├── components/ # UI components (Form, Navbar, Output)
├── services/ # API interaction with Gemini, ElevenLabs, Vision
├── types/ # TypeScript types and enums
├── constants.ts # API keys, default values, languages
├── App.tsx # Main app wrapper
└── main.tsx # App entry point


---

## 🧪 Setup & Run Locally

1. Clone the Repo
```bash
git clone https://github.com/Omillo-Charles/signbridge-ai.git
cd signbridge-ai

2. Install Dependencies
    npm install

3. Configure Environment Variables
   Create a .env file and add your keys:
    VITE_SIGN_LANGUAGE_API_KEY=your-google-key
    VITE_TRANSLATION_API_KEY=your-gemini-key
    VITE_TEXT_TO_SPEECH_API_KEY=your-elevenlabs-key
    
    SIGN_TO_TEXT_ENDPOINT=https://vision.googleapis.com/v1/images:annotate
    TEXT_TO_SIGN_ENDPOINT=https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent
    TEXT_TO_SPEECH_ENDPOINT=https://api.elevenlabs.io/v1/text-to-speech/{your_voice_id}

4. Run the App
    npm run dev

5. 📦 Deployment
    This app is deployed via Vercel for serverless, fast global delivery.


🎯 Roadmap
 Add real-time webcam gesture recognition

 Enable Kenyan Sign Language (KSL) & ASL toggle

 Add voice-to-sign feature for complete bidirectional communication

 Upload video gestures for continuous recognition

🙋‍♂️ Author
Built with 💙 by Omillo Fidel

📜 License
This project is licensed under the MIT License.

✨ Acknowledgements
    Google Cloud
    
    OpenAI Gemini
    
    ElevenLabs
    
    Bolt.new Hackathon


