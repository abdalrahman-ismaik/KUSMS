import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

let model;

if (GEMINI_API_KEY) {
  try {
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });
  } catch (error) {
    console.error(
      "Failed to initialize GoogleGenerativeAI. AI features may be disabled.",
      error
    );
    model = null;
  }
} else {
  console.warn("⚠️ GEMINI_API_KEY is not set. AI features will be disabled.");
}

/**
 * Calls the Gemini API with a given prompt.
 * @param prompt The text prompt to send to the model.
 * @returns The model's response text, or a fallback message.
 */
export async function callGemini(prompt) {
  if (!model) {
    console.error(
      "Gemini model not initialized or API key is missing. Returning a default summary."
    );
    return {
      aiSummary:
        "AI summary is unavailable. Please check the API key configuration.",
    };
  }

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    // Clean the text to remove markdown formatting
    const cleanedText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
    try {
      const parsed = JSON.parse(cleanedText);
      return { aiSummary: parsed.aiSummary || cleanedText };
    } catch (e) {
      // Fallback for cases where the response is not perfect JSON
      return { aiSummary: cleanedText };
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return { aiSummary: "An error occurred while generating the AI summary." };
  }
}
