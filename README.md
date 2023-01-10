# Boilerplate - Electron - TS - React

This boilerplate is based on electron forge. To re-create this template follow these steps:

## Electron TS and Webpack

1. Use the electron forge [Electron + Webpack + Typescript](https://www.electronforge.io/templates/typescript-+-webpack-template) template.
2. Create a types folder in the root of you directory.
3. Define you own API type that should be available at the window object in the renderer.

   ```TS
   export interface ElectronAPI {
       desktop: boolean;
   }

   declare global {
       interface Window {
           electronAPI: ElectronAPI;
       }
   }
   ```

4. Open the tsconfig.json
5. Add the types folder to the include property
   ```JSON
   "include": ["src/**/*", "types/*"]
   ```
6. Add you custom API to the preload.ts

   ```ts
   import { contextBridge } from "electron";

   contextBridge.exposeInMainWorld("electronAPI", {
     desktop: true,
   });
   ```

7. Use your custom API in the renderer.ts
   ```ts
   console.log(`🛠️ Usage of your custom API: ${window.electronAPI.desktop}`);
   ```
8. Run `yarn start` in you terminal and check the console outputs in the electron application.

For further information about why you should define your custom API with the contextBridge check the [Electorn Doc - contextBride]("https://www.electronjs.org/docs/latest/tutorial/context-isolation")

With this setup you can now use TypeScript and you also have type and autocompletion support for the window.yourCustomAPI.

## React with hot reload

1. Go to the root of your project. Open your terminal and install react with:
   ```bash
   yarn add react react-dom
   yarn add --dev @types/react @types/react-dom
   ```
2. Open the tsconfig.json and add the jsx property into the compilerOptions:
   ```json
   {
   "compilerOptions": {
      ...
      "jsx": "react-jsx"
   },
   }
   ```
3. Open the forge.config.ts and change the entry point of the js property to `js: "./src/renderer.tsx",`:
   ```ts
   plugins: [
      new WebpackPlugin({
         mainConfig,
         renderer: {
         config: rendererConfig,
         entryPoints: [
            {
               html: "./src/index.html",
               js: "./src/renderer.tsx",
               name: "main_window",
               preload: {
               js: "./src/preload.ts",
               },
            },
         ],
         },
      }),
   ],
   ```
4. Open the `srx/index.html` and change it to:
   ```HTML
   <!DOCTYPE html>
   <html>
   <head>
      <meta charset="UTF-8" />
      <title>Hello World!</title>
   </head>
   <body>
      <div id="root"></div>
   </body>
   </html>
   ```
5. Rename the `src/renderer.ts` into `src/renderer.tsx`
6. Open the `src/renderer.tsx` and change it to:

   ```tsx
   // In case you want to use later on tailwind the index.css needs to be imported before you import the App
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
   ```

7. Create the `src/App.tsx`
8. Open the `src/App.tsx` and change it to:

   ```tsx
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
   ```

9. Open the terminal and install `react-hot-loader` with the used React version. If this is not available choose the highest versin instead.:
   ```bash
   yarn add @hot-loader/react-dom@18.2.0
   ```
10. Create in the root of your project `.babelrc` and change it to:

```
{ "plugins": ["react-hot-loader/babel"] }
```

11. Open the `webpack.rules.ts` and add the following rule for the react-hot-loader:

```ts
export const rules: Required<ModuleOptions>["rules"] = [
   ...,
   // would only land a "hot-patch" to react-dom - fix for the hot-patch warning
   // https://github.com/gaearon/react-hot-loader/tree/master#webpack-plugin
   {
      test: /\.js$/,
      include: /node_modules\/react-dom/,
      use: ["react-hot-loader/webpack"],
   },
];
```

12. Run `yarn start` in your terminal. You should now see the React App. If you change the React Component it will be hot reloaded within the app.
