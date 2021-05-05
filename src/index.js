import React, { lazy } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarH from "./componentHook/NavbarH";
import "./App.css";

const DevelopInfo = lazy(() => import("./componentHook/DevelopInfo"));
const Add = lazy(() => import("./componentHook/AddProd"));

ReactDOM.render(
  <React.StrictMode>
    <App>
      <NavbarH />
      <Add />
      <DevelopInfo />
    </App>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
