import React from "react";
import ReactDOM from "react-dom/client";
import "./style/App.css";
import "./style/Classes.css";
import { Incoming } from "./components/incoming.component";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Incoming />
  </React.StrictMode>,
);
