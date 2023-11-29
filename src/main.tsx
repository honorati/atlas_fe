import React from "react";
import ReactDOM from "react-dom/client";
import "./style/Index.css";
import MainMenu from "./components/Menu";
import Home from "./components/Home";

ReactDOM.createRoot(document.getElementById("root")!).render(
   <React.StrictMode>
      <MainMenu />
      <Home />
   </React.StrictMode>,
);
