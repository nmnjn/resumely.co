"use client";

import { useState } from "react";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { TypographyMuted } from "./ui/typography";

export default function DocumentPicker({
  id,
  fileName,
  file,
  setFile,
}: {
  id: string;
  fileName: string;
  file: File | undefined;
  setFile: (file: File) => void;
}) {
  // const [file, setFile] = useState<File>();
  const [fileEnter, setFileEnter] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const currentFile = event.target.files[0];
      setFile(currentFile);
    }
  };

  return (
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
          let fileInput = document.querySelector(
            `.${id}-picker`
          ) as HTMLInputElement;
          if (fileInput) {
            fileInput.files = e.dataTransfer.files;
          }
        }
      }}
    >
      <div
        className={`${
          fileEnter
            ? "border-2 border-primary"
            : file
            ? "border-2 border-primary"
            : "border border-dashed border-foreground/25"
        } flex justify-center rounded-lg px-4 py-10 w-full`}
      >
        <div className="text-center space-y-4">
          <div className="mt-4 text-sm leading-6">
            <label
              htmlFor={id}
              className={cn(
                buttonVariants({
                  variant: file ? "secondary" : "outline",
                  size: "default",
                }),
                "relative cursor-pointer"
              )}
            >
              <span>{file ? `Change ${fileName}` : `Select ${fileName}`}</span>
              <input
                type="file"
                accept="application/pdf"
                id={id}
                name={id}
                className={`${id}-picker sr-only`}
                onChange={handleFileChange}
              />
            </label>
          </div>
          <TypographyMuted>
            {file?.name ? file.name : "Drag & Drop or Select a PDF up to 1MB"}
          </TypographyMuted>
        </div>
      </div>
    </div>
  );
}
