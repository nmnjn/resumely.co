"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import pdfParse from "pdf-parse";

import { GeneratorResponse } from "@/utils/interface";

import generateQuestions from "@/utils/groq/client";
import generateQuestionsGPT from "@/utils/gpt/client";
import { GPT_MODELS, GROQ_MODELS } from "@/utils/configs";
import { Database } from "@/types/supabase";

export async function getModels() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("models")
    .select("model")
    .is("enabled", true);

  if (error) {
    return ["llama3-8b-8192"];
  }

  var models = [] as string[];

  data?.forEach((element) => {
    if (element.model) {
      models.push(element.model);
    }
  });

  return models;
}

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

    const model = (formData.get("model") as string) || "llama3-8b-8192";

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

    var rawResponse = "";

    if (GROQ_MODELS.includes(model)) {
      rawResponse = await generateQuestions(model, data.text);
    } else if (GPT_MODELS.includes(model)) {
      rawResponse = await generateQuestionsGPT(model, data.text);
    } else {
      throw Error("Invalid model.");
    }

    const parsedResponse = parseResponse(rawResponse);

    const supabase = createClient();

    const newGeneration: Database["public"]["Tables"]["generations"]["Insert"] =
      {
        email: user.email,
        file_name: file.name,
        response: parsedResponse as any,
        action: "GENQV1",
        model: model,
      };

    await supabase.from("generations").insert(newGeneration);
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
