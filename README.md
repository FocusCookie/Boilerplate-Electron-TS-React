# Boilerplate - Electron - TS - React

This boilerplate is based on electron forge. To re-create this template follow these steps:

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
