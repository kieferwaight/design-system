export const isOfflineCacheSupported = (): boolean => {
  return typeof window !== "undefined" && "caches" in window;
};
