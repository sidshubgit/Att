
import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
    console.warn("API_KEY environment variable not set. Using a placeholder. The app will not function correctly without a valid API key.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "YOUR_API_KEY_HERE" });

export const generateChatResponse = async (
  prompt: string,
  history: { role: 'user' | 'model'; parts: { text: string }[] }[],
  isThinkingMode: boolean
): Promise<string> => {
  try {
    const modelName = isThinkingMode ? 'gemini-2.5-pro' : 'gemini-2.5-flash';

    // Note: The new chat API in @google/genai doesn't directly support sending history in generateContent.
    // We are simulating a conversational context by prepending the prompt.
    // For a real multi-turn chat, `ai.chats.create` is preferred.
    // However, to accommodate the thinking mode toggle per message, we use generateContent.

    const response = await ai.models.generateContent({
        model: modelName,
        contents: [...history, { role: 'user', parts: [{text: prompt}]}],
        ...(isThinkingMode && { config: { thinkingConfig: { thinkingBudget: 32768 } } })
    });
    
    return response.text;

  } catch (error) {
    console.error("Error generating response from Gemini:", error);
    return "Sorry, I encountered an error. Please check the console for details.";
  }
};
