import React from "react";
import ReactDOM from "react-dom/client";
import "./style/App.css";
import { SignUp } from "./components/signup.component";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SignUp />
  </React.StrictMode>,
);
