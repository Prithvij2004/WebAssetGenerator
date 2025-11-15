import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

let genAI = null;
let model = null;

function initializeGemini() {
  if (!API_KEY) {
    console.warn('Gemini API key not found. Please set VITE_GEMINI_API_KEY in .env file.');
    return false;
  }

  if (!genAI) {
    genAI = new GoogleGenerativeAI(API_KEY);
    model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  }

  return true;
}

export async function generateLogo(prompt, theme) {
  if (!initializeGemini()) {
    throw new Error('Gemini API not initialized. Please check your API key.');
  }

  const enhancedPrompt = `Create a ${theme} themed logo based on this description: ${prompt}.
  The design should follow brutal minimalistic principles: clean, stark, high contrast, geometric shapes, minimal decorative elements.
  Generate a detailed description of the logo that can be used to create it.`;

  try {
    const result = await model.generateContent(enhancedPrompt);
    const response = await result.response;
    const text = response.text();

    return {
      description: text,
      prompt: enhancedPrompt,
      timestamp: Date.now(),
      type: 'logo'
    };
  } catch (error) {
    console.error('Error generating logo with Gemini:', error);
    throw error;
  }
}

export async function generateIcon(prompt, theme) {
  if (!initializeGemini()) {
    throw new Error('Gemini API not initialized. Please check your API key.');
  }

  const enhancedPrompt = `Create a ${theme} themed icon based on this description: ${prompt}.
  The icon should be simple, geometric, and follow brutal minimalistic design principles.
  Provide a detailed description of the icon design.`;

  try {
    const result = await model.generateContent(enhancedPrompt);
    const response = await result.response;
    const text = response.text();

    return {
      description: text,
      prompt: enhancedPrompt,
      timestamp: Date.now(),
      type: 'icon'
    };
  } catch (error) {
    console.error('Error generating icon with Gemini:', error);
    throw error;
  }
}

export async function chatWithAI(message, context = '') {
  if (!initializeGemini()) {
    throw new Error('Gemini API not initialized. Please check your API key.');
  }

  const fullPrompt = context ? `${context}\n\nUser: ${message}` : message;

  try {
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error chatting with Gemini:', error);
    throw error;
  }
}

export async function generateImagePrompt(description, theme) {
  if (!initializeGemini()) {
    throw new Error('Gemini API not initialized. Please check your API key.');
  }

  const prompt = `Based on this description: "${description}" and theme: "${theme}",
  create a detailed image generation prompt for a brutal minimalistic design.
  The prompt should emphasize: high contrast, geometric shapes, stark design, minimal elements, clean lines.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating image prompt:', error);
    throw error;
  }
}
