import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertTimestampToLocalTime(timestamp: string) {
  const date = new Date(timestamp);
  return date.toLocaleString();
}

export function parseResponse<T>(response: string): T {
  const startIndex = response.indexOf("{");
  const lastIndex = response.lastIndexOf("}");

  if (startIndex === -1 || lastIndex === -1 || lastIndex < startIndex) {
    throw new Error(
      "I am unable to read the document. Please try again later!"
    );
  }
  const jsonString = response.substring(startIndex, lastIndex + 1);
  try {
    const jsonObject: T = JSON.parse(jsonString);
    return jsonObject;
  } catch (error) {
    console.error(error);
    throw new Error(
      "I am unable to read the document. Please try again later!"
    );
  }
}

export function fileCheck(file: File) {
  if (file.type != "application/pdf") {
    throw Error(
      "Uploaded file is not a valid PDF. Please upload a PDF file and try again!"
    );
  }

  if (file.size > 500000) {
    throw Error(
      "Uploaded PDF file is larger than the supported tokens limit. Please upload a smaller PDF file."
    );
  }
}
