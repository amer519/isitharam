import { buildPrompt } from './promptBuilder';

export const fetchAIAnswer = async (question) => {
  const prompt = buildPrompt(question);

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo", // or "gpt-3.5-turbo" if using a cheaper plan
      messages: [{ role: "user", content: prompt }],
      temperature: 0.4
    })
  });

  if (!response.ok) {
    const error = await response.json();
    console.error("OpenAI Error:", error);
    throw new Error("OpenAI API failed");
  }

  const data = await response.json();
  return data.choices[0]?.message?.content.trim();
};