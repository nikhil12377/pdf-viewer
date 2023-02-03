import "./App.css";
import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import FileViewer from "./routes/FileViewer";
import { Grid, Input, Box, Container } from "@mui/material";

function App() {
  const [fileName, setFileName] = useState("NULL");
  const navigate = useNavigate();

  async function uploadFileToServer(file) {
    try {
      const formData = new FormData();
      formData.append("pdf_file", file);
      const res = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });
      console.log(res);
      console.log("File Uploaded Successfully");
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  const Home = () => {
    return (
      <Grid
        display="flex"
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        <Box
          boxShadow={3}
          padding="50px"
          style={{
            background: "white",
            borderRadius: "15px",
            backgroundColor: "rgb(255, 253, 253)",
          }}
        >
          <Input
            type="file"
            onChange={async (e) => {
              setFileName(e.target.files[0].name);
              console.log(e.target.files[0].name);
              const file = await uploadFileToServer(e.target.files[0]);
              console.log(file);
              navigate("/file");
            }}
          />
        </Box>
      </Grid>
    );
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/file" element={<FileViewer fileName={fileName} />} />
    </Routes>
  );
}

export default App;
