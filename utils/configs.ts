export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://www.resumely.co"
    : "http://localhost:3000";

export const GROQ_MODELS = [
  "llama3-8b-8192",
  "llama3-70b-8192",
  "mixtral-8x7b-32768",
];

export const GPT_MODELS = [
  "gpt-3.5-turbo-0125",
  "gpt-3.5-turbo-1106",
  "gpt-4-1106-preview",
  "gpt-4-turbo-preview",
  "gpt-4",
  "gpt-4-turbo",
];
