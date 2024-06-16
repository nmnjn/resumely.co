"use client";
import React from "react";
import { SubmitForm, getModels } from "../app/actions";
import { useFormState } from "react-dom";
import { SubmitButton } from "@/components/SubmitButton";
import { questionsFromResumeInitialState } from "@/utils/states";
import { useEffect } from "react";

import DocumentPicker from "./DocumentPicker";
import QuestionsResponseCard from "@/components/QuestionsResponseCard";

export default function QuestionsGenerator() {
  const [file, setFile] = React.useState<File>();
  // const [models, setModels] = React.useState<string[]>([]);

  const [formState, submitFormAction] = useFormState(
    SubmitForm,
    questionsFromResumeInitialState
  );

  useEffect(() => {
    if (
      formState?.data &&
      formState?.data.data &&
      formState?.data.data.length > 0
    ) {
      const element = document.getElementById("questions");
      element?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
      return;
    }

    if (formState?.message) {
      const element = document.getElementById("message");
      element?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
      return;
    }
  }, [formState]);

  // useEffect(() => {
  //   const fetchModels = async () => {
  //     const models = await getModels();
  //     setModels(models);
  //   };

  //   fetchModels();
  // }, []);

  return (
    <>
      <div className="w-full lg:w-6/12 mx-auto px-4 flex flex-col items-center">
        <form action={submitFormAction} className="w-full space-y-8">
          <DocumentPicker
            id="resume"
            fileName="Resume"
            file={file}
            setFile={setFile}
          />
          {/* <div>
            <div className="w-full">
              <label
                htmlFor="model"
                className="block mb-2 text-sm font-medium text-foreground/50 w-9/12 md:w-6/12 mx-auto"
              >
                Select Model
              </label>
              <select
                id="model"
                name="model"
                className="border border-r-8 border-transparent w-9/12 md:w-6/12 mx-auto text-sm bg-background rounded-lg block p-4 sm:p-2.5 outline outline-foreground/25 outline-1"
              >
                {models.map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </select>
            </div>
          </div> */}
          {file?.name ? (
            <SubmitButton
              type="submit"
              className="animate-in text-white bg-primary rounded-md px-4 py-2 w-9/12 md:w-6/12 shadow-md shadow-primary/25 hover:bg-primary hover:shadow-lg hover:shadow-primary/25 block mx-auto"
              pendingText={"Preparing Questions..."}
              formAction={submitFormAction}
            >
              Submit
            </SubmitButton>
          ) : (
            <></>
          )}
          {formState?.message ? (
            <h1 id="message" className="text-center text-red-400 text-bold">
              {formState?.message}
            </h1>
          ) : (
            <></>
          )}
        </form>
      </div>
      <div id="questions" className="lg:w-8/12 mx-4 lg:mx-auto mt-16">
        <QuestionsResponseCard
          questionsResponse={formState.data}
        ></QuestionsResponseCard>
      </div>
    </>
  );
}
