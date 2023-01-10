export interface ElectronAPI {
  desktop: boolean;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
