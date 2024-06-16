import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function generateQuestionsGROQ(model: string, resumeText: string) {
  const chatCompletion = await groq.chat.completions.create({
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
    max_tokens: 3500,
    top_p: 1,
    stream: false,
    stop: null,
  });

  return chatCompletion.choices[0].message.content;
}

export async function generateJDMatchGROQ(
  model: string,
  resumeText: string,
  jdText: string
) {
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: process.env.GENERATE_JD_MATCH_SYSTEM_PROMPT || "",
      },
      {
        role: "user",
        content: `
        Resume: ${resumeText}
        ----------------------------------
        ----------------------------------
        Job Description: ${jdText}
        `,
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
