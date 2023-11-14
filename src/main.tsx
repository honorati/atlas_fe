import React from "react";
import ReactDOM from "react-dom/client";
import { Incoming } from "./components/incoming.component";
import "./style/App.css";
import "./style/Classes.css";
import "./style/Checkbox.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Incoming />
  </React.StrictMode>,
);
