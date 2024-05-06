"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import pdfParse from "pdf-parse";

import { GeneratorResponse } from "@/utils/interface";

import generateQuestions from "@/utils/groq/client";
import generateQuestionsGPT from "@/utils/gpt/client";

export async function getUser(redirectToLogin: boolean) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && redirectToLogin) {
    return redirect("/login");
  }

  return user;
}

function parseResponse(response: string) {
  const startIndex = response.indexOf("{");
  const lastIndex = response.lastIndexOf("}");

  if (startIndex === -1 || lastIndex === -1 || lastIndex < startIndex) {
    throw new Error(
      "I am unable to read the document. Please try again later!"
    );
  }
  const jsonString = response.substring(startIndex, lastIndex + 1);
  try {
    const jsonObject: GeneratorResponse = JSON.parse(jsonString);
    if (jsonObject.error && jsonObject.error == "ERROR 1") {
      throw new Error(
        "Seems like the document uploaded is not a valid resume. Please try again with a valid resume."
      );
    }
    return jsonObject;
  } catch (error) {
    console.error(error);
    throw new Error(
      "I am unable to read the document. Please try again later!"
    );
  }
}

export async function SubmitForm(prevState: any, formData: FormData) {
  "use server";
  try {
    const user = await getUser(true);

    if (!user) {
      return redirect("/login");
    }

    const file = formData.get("resume") as File;
    if (file === null) {
      return {
        message: "Unable to find file.",
      };
    }

    if (file.type != "application/pdf") {
      throw Error(
        "Uploaded file is not a valid PDF. Please upload a PDF file only."
      );
    }

    if (file.size > 500000) {
      throw Error("Uploaded file is larger than supported tokens");
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const data = await pdfParse(buffer);

    const rawResponse = await generateQuestions(data.text);
    const parsedResponse = parseResponse(rawResponse);

    const supabase = createClient();
    const { error } = await supabase.from("generations").insert({
      email: user.email,
      file_name: file.name,
      response: parsedResponse,
      action: "GENQV1",
    });

    return {
      message: "",
      data: parsedResponse,
    };
  } catch (error: any) {
    return {
      message: `${error.message}`,
    };
  }
}
