import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// firebase 모듈 import 후 확인
import firebase from "./firebase";
console.log(firebase);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
