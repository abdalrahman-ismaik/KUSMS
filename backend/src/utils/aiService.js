import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY || "AIzaSyAXERNCJto83MLn_H3B4eFa8ypwRlHtCPE"
);

/**
 * Generates a booking suggestion using the Gemini API.
 * @param {object} usageData - The user's booking history and facility usage patterns.
 * @returns {Promise<string>} The AI-generated suggestion.
 */
export async function generateBookingSuggestion(usageData) {
  // If no API key is provided, return a mock response.
  if (
    !process.env.GEMINI_API_KEY ||
    process.env.GEMINI_API_KEY === "placeholder"
  ) {
    return `You frequently book '${
      usageData.favoriteFacility.name
    }'. It is busiest on ${usageData.busiestDays.join(
      ", "
    )}. Try booking on ${usageData.quietestDays.join(
      ", "
    )} for better availability.`;
  }
  // console.log(`Data fed into Gemini API: ${JSON.stringify(usageData)}`);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });

  const prompt = `
    A student has the following booking history for university facilities:
    - usageData: ${JSON.stringify(usageData)}

    Based on this, generate a short, friendly, and encouraging suggestion for the student.
    The suggestion should:
    1. Acknowledge their preference for the facility. Mention the name of the facility (Take all the details from the file i have provided you with, don't hallucinate), where it is located and its description. When you generate content, don't say "of course, here is the information you requested" or "as an AI language model". Just provide the information directly.
    2. Recommend they book it again.
    3. Take all the data from the usageData object
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    // console.log(text);
    return text;
  } catch (error) {
    console.error("Error generating suggestion from Gemini API:", error);
    // Fallback to a simpler, non-AI suggestion in case of an API error
    return `We noticed you often book '${
      usageData.favoriteFacility.name
    }'. For better availability, try booking on ${usageData.quietestDays.join(
      ", "
    )}, as it's less busy on those days.`;
  }
}
