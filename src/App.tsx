import { hot } from "react-hot-loader";
import * as React from "react";

const App = (): React.ReactElement => (
  <div>
    <p>React + Tailwind + Typescript + Electron = ❤</p>

    {window.electronAPI.desktop && (
      <span>browser: {window.electronAPI.desktop.toString()}</span>
    )}
  </div>
);

export default hot(module)(App);
