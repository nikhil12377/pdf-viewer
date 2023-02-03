import React from "react";
import { Worker } from "@react-pdf-viewer/core";
import PdfViewer from "../components/PdfViewer";

export default function FileViewer({ fileName }) {
  return (
    <div>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.3.122/build/pdf.worker.min.js">
        <PdfViewer fileName={fileName} />
      </Worker>
    </div>
  );
}
