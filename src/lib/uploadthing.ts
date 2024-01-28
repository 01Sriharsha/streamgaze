import { File_Router } from "@/app/api/uploadthing/core";
import { generateComponents } from "@uploadthing/react";
import { FileRouter } from "uploadthing/next";

export const { UploadButton, UploadDropzone, Uploader } =
  generateComponents<File_Router>();
