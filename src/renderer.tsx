// Needs come before the App import otherwise the css import order is wrong
import "./index.css";

import App from "./App";

import React from "react";
import ReactDOM from "react-dom";

import { createRoot } from "react-dom/client";

console.log(
  '👋 This message is being logged by "renderer.js", included via webpack'
);

console.log(
  `🛠️ This is the value of the custom window.electronAPI.desktop: ${window.electronAPI.desktop}`
);

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);
