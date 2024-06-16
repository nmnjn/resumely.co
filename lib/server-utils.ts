"use server";

import { promises as fs } from "fs";
import pdfParse from "pdf-parse";
import PDFParser from "pdf2json";
import { execSync } from "child_process";
import { v4 as uuidv4 } from "uuid";

export async function readPDFFile(file: File) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const data = await pdfParse(buffer);
  return data.text;
}

export async function readPDFFileV2(file: File) {
  let parsedText = "";
  const tempFilePath = `/tmp/${file.name}`;
  const fileBuffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(tempFilePath, fileBuffer);
  const pdfParser = new (PDFParser as any)(null, 1);

  pdfParser.on("pdfParser_dataError", (errData: any) =>
    console.log(errData.parserError)
  );

  pdfParser.on("pdfParser_dataReady", () => {
    console.log((pdfParser as any).getRawTextContent());
    parsedText = (pdfParser as any).getRawTextContent();
  });

  pdfParser.loadPDF(tempFilePath);

  return parsedText;
}

export async function readPDFFileV3(file: File) {
  const tempFilePath = `/tmp/${uuidv4()}.pdf`;
  const fileBuffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(tempFilePath, fileBuffer);
  const output = execSync(`pdftotext ${tempFilePath} -`, { encoding: "utf-8" });
  return output;
}
