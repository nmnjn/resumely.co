import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export default async function generateQuestions(resumeText: string) {
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
    model: "llama3-8b-8192", //"llama3-70b-8192", //"mixtral-8x7b-32768", //"llama3-8b-8192",
    temperature: 0.3,
    max_tokens: 3500,
    top_p: 1,
    stream: false,
    stop: null,
    response_format: {
      type: "json_object",
    },
  });

  return chatCompletion.choices[0].message.content;
}
