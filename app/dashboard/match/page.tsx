"use client";

import { SubmitButton } from "@/components/SubmitButton";
import DocumentPicker from "@/components/DocumentPicker";
import { useState, useEffect } from "react";
import { useFormState } from "react-dom";
import { jdMatchGeneratorInitialState } from "@/utils/states";
import { SubmitForm } from "./actions";
import JDMatchResponseCard from "@/components/JDMatchResponseCard";

export default function MatchJD() {
  const [resumeFile, setResumeFile] = useState<File>();
  const [jdFile, setJDFile] = useState<File>();

  const [formState, submitFormAction] = useFormState(
    SubmitForm,
    jdMatchGeneratorInitialState
  );

  useEffect(() => {
    if (formState?.data && formState?.data.rating != null) {
      const element = document.getElementById("jdMatch");
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

  return (
    <div>
      <form
        action={submitFormAction}
        className="animate-in flex flex-col items-center space-y-8 mt-8 mx-16"
      >
        <div className="text-left w-full mx-16">
          Tailoring your resume to match a job description is important because
          it directly aligns your skills and experience with what the employer
          is looking for. This increases your chances of getting noticed and
          selected for an interview by showing that you understand the role and
          can meet its specific requirements. It also demonstrates your
          attention to detail and commitment to the opportunity.
          <br></br>
          <br></br>
          Attach your resume and respective job description below to get
          suggestions based on which you can improve your resume.
        </div>
        <div className="flex flex-col lg:flex-row w-10/12 mx-auto lg:space-x-16 space-y-8 lg:space-y-0 items-center">
          <div className="lg:w-6/12 space-y-4 text-center">
            {/* <TypographyH4>Upload Resume</TypographyH4> */}
            <DocumentPicker
              id="resume"
              fileName="Resume"
              file={resumeFile}
              setFile={setResumeFile}
            />
          </div>
          <div className="lg:w-6/12 space-y-4 text-center">
            {/* <TypographyH4>Upload Job Description</TypographyH4> */}
            <DocumentPicker
              id="jd"
              fileName="Job Description"
              file={jdFile}
              setFile={setJDFile}
            />
          </div>
        </div>
        <div className="w-full lg:w-6/12">
          {!!resumeFile && !!jdFile ? (
            <SubmitButton
              type="submit"
              className="animate-in text-white bg-primary rounded-md px-4 py-2 w-9/12 md:w-6/12 shadow-md shadow-primary/25 hover:bg-primary hover:shadow-lg hover:shadow-primary/25 block mx-auto"
              pendingText="Matching Job Description..."
              formAction={submitFormAction}
            >
              Submit
            </SubmitButton>
          ) : (
            // <Button className="animate-in">Submit</Button>
            <></>
          )}
        </div>
        {formState?.message ? (
          <h1 id="message" className="text-center text-red-400 text-bold">
            {formState?.message}
          </h1>
        ) : (
          <></>
        )}
      </form>
      <div id="jdMatch" className="lg:w-10/12 mx-4 lg:mx-auto mt-8">
        <JDMatchResponseCard
          jdMatchResponse={formState.data}
        ></JDMatchResponseCard>
      </div>
    </div>
  );
}
