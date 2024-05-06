"use client";
import React from "react";
import { SubmitForm } from "../app/actions";
import { useFormState } from "react-dom";
import { SubmitButton } from "@/app/login/submit-button";
import { questionsFromResumeInitialState } from "@/utils/states";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Generator({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) {
  const [file, setFile] = React.useState<File>();
  const [fileEnter, setFileEnter] = React.useState<boolean>(false);
  const router = useRouter();

  const [formState, submitFormAction] = useFormState(
    SubmitForm,
    questionsFromResumeInitialState
  );

  useEffect(() => {
    if (
      formState.data &&
      formState.data.data &&
      formState.data.data.length > 0
    ) {
      const element = document.getElementById("questions");
      element?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
      return;
    }

    if (formState.message) {
      const element = document.getElementById("message");
      element?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
      return;
    }
  }, [formState]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const currentFile = event.target.files[0];
      setFile(currentFile);
      formState.message = "";
    }
    checkAuth();
  };

  const checkAuth = () => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  };

  return (
    <div className="">
      <form
        action={submitFormAction}
        className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 items-center"
      >
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setFileEnter(true);
          }}
          onDragLeave={(e) => {
            setFileEnter(false);
          }}
          onDragEnd={(e) => {
            e.preventDefault();
            setFileEnter(false);
          }}
          onDrop={(e) => {
            e.preventDefault();
            setFileEnter(false);
            if (e.dataTransfer.items.length == 1) {
              const file = e.dataTransfer.items[0].getAsFile() as File;
              setFile(file);
              formState.message = "";
              let fileInput = document.querySelector(
                ".resume-picker"
              ) as HTMLInputElement;
              if (fileInput) {
                fileInput.files = e.dataTransfer.files;
              }
            }
            checkAuth();
          }}
          className="col-span-full"
        >
          <div
            className={`${
              fileEnter
                ? "border-2 border-green-500"
                : file
                ? "border-2 border-green-500"
                : "border border-dashed border-foreground/25"
            } flex justify-center rounded-lg px-6 py-10`}
          >
            <div className="text-center">
              <div className="mt-4 text-sm leading-6">
                <label
                  htmlFor="resume"
                  className="relative cursor-pointer rounded-md bg-gray-900 font-semibold text-white focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:ring-offset-gray-900 hover:text-indigo-500 px-4 py-2"
                >
                  <span>{file ? "Change File" : "Select File"}</span>
                  <input
                    type="file"
                    accept="application/pdf"
                    id="resume"
                    name="resume"
                    className="resume-picker sr-only"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
              <p className="text-xs leading-5 text-gray-400 mt-5">
                {file?.name
                  ? file.name
                  : "Drag & Drop or Select a PDF up to 1MB"}
              </p>
            </div>
          </div>
        </div>
        {file?.name ? (
          <div className="col-span-full grid place-items-center">
            <SubmitButton
              type="submit"
              className="animate-in text-white bg-green-600 rounded-md px-4 py-2 w-9/12 md:w-6/12 shadow-md shadow-green-600/25 hover:bg-green-500 hover:shadow-lg hover:shadow-green-500/25"
              pendingText="Generating Questions..."
              formAction={submitFormAction}
            >
              Submit
            </SubmitButton>
          </div>
        ) : (
          <></>
        )}
        {formState.message ? (
          <h1
            id="message"
            className="col-span-full text-center text-red-400 text-bold"
          >
            {formState.message}
          </h1>
        ) : (
          <></>
        )}
      </form>
      {formState.data && formState.data.data ? (
        <div className="py-16" id="questions">
          <ol className={"list-decimal list-inside"}>
            {formState.data.data.map((item) => (
              <li key={item.question} className="animate-in">
                <span className="text-lg">{item.question}</span>
                <h2 className="m-4 text-slate-400">Follow up Questions:</h2>
                <ul className={"list-disc list-inside ml-8 space-y-2"}>
                  {item.follow_ups.map((follow_up) => (
                    <li key={follow_up}>{follow_up}</li>
                  ))}
                </ul>
                <h2 className="m-4 text-slate-400">Pointers:</h2>
                <ul className={"list-disc list-inside ml-8 space-y-2"}>
                  {item.key_points.map((key_point) => (
                    <li key={key_point}>{key_point}</li>
                  ))}
                </ul>
                <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
              </li>
            ))}
          </ol>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
