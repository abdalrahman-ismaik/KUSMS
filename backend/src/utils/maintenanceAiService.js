import { callGemini } from "../ai/geminiClient.js";
import { toSimpleRequests } from "./maintenanceSummaryService.js";

export async function getAiSummary(rawRequests) {
  const simpleRequests = toSimpleRequests(rawRequests);

  // Prepare data for the model
  const promptInput = {
    requests: simpleRequests,
  };

  const prompt = `You are an assistant helping campus maintenance staff plan their day.

Here is today's maintenance data (JSON):

${JSON.stringify(promptInput)}

1. Write a concise summary (3-6 sentences) of the maintenance situation for the week: overall volume, main categories, any urgent priorities.
3. Return your answer as JSON with the keys: "aiSummary".`;

  let aiSummary = null;

  try {
    const geminiResponse = await callGemini(prompt);

    if (!geminiResponse) {
      aiSummary = "";
    } else if (typeof geminiResponse === "string") {
      try {
        const parsed = JSON.parse(geminiResponse);
        aiSummary = parsed.aiSummary ?? "";
      } catch (e) {
        aiSummary = geminiResponse; // fallback to raw text
      }
    } else {
      aiSummary = geminiResponse.aiSummary ?? "";
    }
  } catch (e) {
    console.error("Error calling Gemini or parsing response:", e);
  }

  return { aiSummary };
}
