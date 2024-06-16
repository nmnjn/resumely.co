"use server";

import { createClient } from "@/utils/supabase/server";
import { getUser } from "@/utils/supabase/utils";

import { JDMatchResponse } from "@/utils/interface";

import { generateJDMatchGROQ } from "@/utils/groq/client";
import { generateJDMatchGPT } from "@/utils/gpt/client";
import { GPT_MODELS, GROQ_MODELS } from "@/utils/configs";
import { Database } from "@/types/supabase";
import { isRedirectError } from "next/dist/client/components/redirect";
import { fileCheck, parseResponse } from "@/lib/utils";
import { readPDFFileV3 } from "@/lib/server-utils";

export async function SubmitForm(prevState: any, formData: FormData) {
  try {
    const user = await getUser(true);

    const resumeFile = formData.get("resume") as File;
    if (resumeFile === null) {
      return {
        message: "Unable to find resume file.",
      };
    }

    fileCheck(resumeFile);
    const resumeFileContent = await readPDFFileV3(resumeFile);

    const jdFile = formData.get("jd") as File;
    if (jdFile === null) {
      return {
        message: "Unable to find jd file.",
      };
    }

    fileCheck(jdFile);
    const jdFileContent = await readPDFFileV3(jdFile);

    console.log(resumeFileContent);
    console.log(jdFileContent);

    var model = (formData.get("model") as string) || "gpt-4o";

    var rawResponse = "";

    if (GROQ_MODELS.includes(model)) {
      rawResponse = await generateJDMatchGROQ(
        model,
        resumeFileContent,
        jdFileContent
      );
    } else if (GPT_MODELS.includes(model)) {
      rawResponse = await generateJDMatchGPT(
        model,
        resumeFileContent,
        jdFileContent
      );
    } else {
      throw Error(
        "Invalid model selected. Please choose a supported LLM model"
      );
    }

    const parsedResponse = parseResponse<JDMatchResponse>(rawResponse);
    const supabase = createClient();

    // const { data: storageData, error } = await supabase.storage
    //   .from("resumely")
    //   .upload(`${user!.id}/${Date.now()}-${resumeFile.name}`, resumeFile);

    // await supabase.storage
    //   .from("resumely")
    //   .upload(`${user!.id}/${Date.now()}-${jdFile.name}`, jdFile);

    const newGeneration: Database["public"]["Tables"]["generations"]["Insert"] =
      {
        email: user!.email,
        file_name: `${resumeFile.name} || ${jdFile.name}`,
        response: parsedResponse as any,
        action: "GENJDV1",
        model: model,
        // file_path: storageData?.path,
      };

    await supabase.from("generations").insert(newGeneration);

    if (parsedResponse.error && parsedResponse.error == "ERROR 1") {
      throw new Error(
        "Seems like the document uploaded is not a valid resume. Please try again with a valid resume."
      );
    }

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
