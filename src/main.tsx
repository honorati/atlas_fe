import React from "react";
import ReactDOM from "react-dom/client";
import "./style/App.css";
import { MapEditor } from "./components/map-coordinates.component";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MapEditor />
  </React.StrictMode>,
);
