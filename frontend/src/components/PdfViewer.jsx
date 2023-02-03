import React from "react";
import { Viewer } from "@react-pdf-viewer/core";
import { pageNavigationPlugin } from "@react-pdf-viewer/page-navigation";
import { zoomPlugin } from "@react-pdf-viewer/zoom";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/zoom/lib/styles/index.css";
import "@react-pdf-viewer/page-navigation/lib/styles/index.css";

import { Box, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export default function PdfViewer({ fileName }) {
  const navigate = useNavigate();

  const pageNavigationPluginInstance = pageNavigationPlugin();
  const zoomPluginInstance = zoomPlugin();

  const { ZoomInButton, ZoomOutButton, ZoomPopover } = zoomPluginInstance;

  const { GoToPreviousPageButton, GoToNextPageButton } =
    pageNavigationPluginInstance;

  useEffect(() => {
    if (fileName === "NULL") {
      navigate("/");
    }
  });

  return (
    <div>
      <Box display="flex" flexDirection="row-reverse">
        <div>
          <ZoomInButton />
          <ZoomOutButton />
        </div>
        <div>
          <GoToPreviousPageButton />
          <GoToNextPageButton />
        </div>
      </Box>
      <Viewer
        fileUrl={`http://localhost:5000/file/${fileName}`}
        defaultScale={1}
        theme="dark"
        plugins={[pageNavigationPluginInstance, zoomPluginInstance]}
      />
    </div>
  );
}
