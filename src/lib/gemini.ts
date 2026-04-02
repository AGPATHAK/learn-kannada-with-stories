import { GoogleGenAI, Modality, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface StorySegment {
  kannada: string;
  english: string;
  audioData?: string; // Base64 WAV string
}

export interface VocabularyWord {
  word: string;
  meaning: string;
  pronunciation: string;
}

export interface Story {
  id: string;
  title: string;
  segments: StorySegment[];
  vocabulary: VocabularyWord[];
  isCustom?: boolean;
  createdAt: number;
}

async function callWithRetry<T>(fn: () => Promise<T>, maxRetries = 3, initialDelay = 2000): Promise<T> {
  let lastError: any;
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error: any) {
      lastError = error;
      const isRateLimit = error?.message?.includes('429') || error?.status === 'RESOURCE_EXHAUSTED' || (typeof error === 'string' && error.includes('429'));
      
      if (isRateLimit && i < maxRetries - 1) {
        const delay = initialDelay * Math.pow(2, i);
        console.warn(`Rate limit hit. Retrying in ${delay}ms... (Attempt ${i + 1}/${maxRetries})`);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      throw error;
    }
  }
  throw lastError;
}

export async function generateStory(topic: string, onProgress?: (current: number, total: number) => void): Promise<Story> {
  const response = await callWithRetry(() => ai.models.generateContent({
    model: "gemini-3.1-pro-preview",
    contents: `Generate a short children's story in Kannada for language learners about "${topic}". 
    The story should be simple. 
    Return the story as a JSON object with:
    - title: The title in Kannada.
    - segments: An array of objects, each with 'kannada' (a sentence or short phrase) and 'english' (translation).
    - vocabulary: An array of 5-8 difficult words from the story with 'word' (Kannada), 'meaning' (English), and 'pronunciation' (transliteration).`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          segments: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                kannada: { type: Type.STRING },
                english: { type: Type.STRING }
              },
              required: ["kannada", "english"]
            }
          },
          vocabulary: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                word: { type: Type.STRING },
                meaning: { type: Type.STRING },
                pronunciation: { type: Type.STRING }
              },
              required: ["word", "meaning", "pronunciation"]
            }
          }
        },
        required: ["title", "segments", "vocabulary"]
      }
    }
  }));

  const storyData = JSON.parse(response.text || "{}");
  const story: Story = {
    id: Math.random().toString(36).substring(7),
    createdAt: Date.now(),
    ...storyData
  };

  // Generate audio for each segment upfront
  const total = story.segments.length;
  for (let i = 0; i < total; i++) {
    const segment = story.segments[i];
    if (onProgress) onProgress(i + 1, total);
    try {
      segment.audioData = await generateSpeechBase64(segment.kannada);
    } catch (e) {
      console.error("Failed to generate audio for segment:", segment.kannada, e);
    }
  }

  return story;
}

async function generateSpeechBase64(text: string): Promise<string> {
  const response = await callWithRetry(() => ai.models.generateContent({
    model: "gemini-2.5-flash-preview-tts",
    contents: [{ parts: [{ text: text.trim() }] }],
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: { voiceName: 'Kore' },
        },
      },
    },
  }));

  const part = response.candidates?.[0]?.content?.parts?.[0];
  const base64Audio = part?.inlineData?.data;
  const mimeType = part?.inlineData?.mimeType;

  if (!base64Audio) throw new Error("No audio data returned");

  // Wrap raw PCM in WAV header if needed
  if (mimeType && (mimeType.includes('mp3') || mimeType.includes('wav') || mimeType.includes('mpeg'))) {
    return `data:${mimeType};base64,${base64Audio}`;
  }

  // Assume raw PCM (16-bit LE, 24kHz)
  const binaryString = atob(base64Audio);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  const wavHeader = new ArrayBuffer(44);
  const view = new DataView(wavHeader);
  const writeString = (offset: number, string: string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  const sampleRate = 24000;
  const numChannels = 1;
  const bitsPerSample = 16;

  writeString(0, 'RIFF');
  view.setUint32(4, 36 + len, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * numChannels * (bitsPerSample / 8), true);
  view.setUint16(32, numChannels * (bitsPerSample / 8), true);
  view.setUint16(34, bitsPerSample, true);
  writeString(36, 'data');
  view.setUint32(40, len, true);

  // Convert to base64 for storage
  const blob = new Blob([wavHeader, bytes], { type: 'audio/wav' });
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export async function generateSpeech(text: string): Promise<string> {
  // This is kept for backward compatibility or direct use
  return generateSpeechBase64(text);
}
