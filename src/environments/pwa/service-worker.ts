export const registerServiceWorker = async (): Promise<boolean> => {
  if (typeof navigator !== "undefined" && "serviceWorker" in navigator) {
    return true;
  }
  return false;
};
