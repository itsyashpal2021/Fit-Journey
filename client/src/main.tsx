import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import { ThemeProvider, createTheme } from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import App from "./App";

axios.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
