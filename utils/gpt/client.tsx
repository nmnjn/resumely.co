import OpenAI from "openai";

const openai = new OpenAI();

export default async function generateQuestionsGPT(
  model: string,
  resumeText: string
) {
  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: process.env.GENERATE_QUESTIONS_SYSTEM_PROMPT || "",
      },
      {
        role: "user",
        content: `Resume: ${resumeText}`,
      },
    ],
    model: model,
    temperature: 0.3,
  });

  if (!chatCompletion.choices[0].message.content) {
    throw new Error("Unable to generate content.");
  }
  return chatCompletion.choices[0].message.content;
}
