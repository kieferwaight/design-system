export const isPushSupported = (): boolean => {
  return typeof window !== "undefined" && "PushManager" in window;
};
