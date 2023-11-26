import React from "react";
import ReactDOM from "react-dom/client";
import "./style/App.css";
import MainMenu from "./components/menu.component";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MainMenu />
  </React.StrictMode>,
);
