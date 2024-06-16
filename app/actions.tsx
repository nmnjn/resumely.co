"use server";

import { createClient } from "@/utils/supabase/server";
import { getUser } from "@/utils/supabase/utils";
import { Database } from "@/types/supabase";
import { QuestionsResponse } from "@/utils/interface";
import { fileCheck, parseResponse } from "@/lib/utils";
import { generateQuestionsGROQ } from "@/utils/groq/client";
import { generateQuestionsGPT } from "@/utils/gpt/client";
import { GPT_MODELS, GROQ_MODELS } from "@/utils/configs";
import { isRedirectError } from "next/dist/client/components/redirect";
import { readPDFFileV3 } from "@/lib/server-utils";

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

export async function SubmitForm(prevState: any, formData: FormData) {
  "use server";

  try {
    const user = await getUser(true);

    const file = formData.get("resume") as File;
    if (file === null) {
      return {
        message: "Unable to find file.",
      };
    }

    fileCheck(file);
    const fileContent = await readPDFFileV3(file);

    var model = (formData.get("model") as string) || "gpt-4o";

    var rawResponse = "";

    if (GROQ_MODELS.includes(model)) {
      rawResponse = await generateQuestionsGROQ(model, fileContent);
    } else if (GPT_MODELS.includes(model)) {
      rawResponse = await generateQuestionsGPT(model, fileContent);
    } else {
      throw Error(
        "Invalid model selected. Please choose a supported LLM model"
      );
    }

    const parsedResponse = parseResponse<QuestionsResponse>(rawResponse);
    if (parsedResponse.error && parsedResponse.error == "ERROR 1") {
      throw new Error(
        "Seems like the document uploaded is not a valid resume. Please try again with a valid resume."
      );
    }

    const supabase = createClient();

    // const { data: storageData, error } = await supabase.storage
    //   .from("resumely")
    //   .upload(`${user!.id}/${Date.now()}-${file.name}`, file);

    const newGeneration: Database["public"]["Tables"]["generations"]["Insert"] =
      {
        email: user!.email,
        file_name: file.name,
        response: parsedResponse as any,
        action: "GENQV1",
        model: model,
        // file_path: storageData?.path,
      };

    await supabase.from("generations").insert(newGeneration);
    return {
      message: "",
      data: parsedResponse,
    };
  } catch (error: any) {
    console.log(error);
    if (isRedirectError(error)) {
      throw error;
    }
    return {
      message: `${error.message}`,
    };
  }
}
