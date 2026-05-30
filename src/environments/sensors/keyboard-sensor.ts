import type { Sensor } from "./sensor.types";

export interface KeyboardSensorValue {
  visible: boolean;
  height: number;
  offset: number;
}

export class KeyboardSensor implements Sensor<KeyboardSensorValue> {
  read(): KeyboardSensorValue {
    if (typeof window === "undefined" || !window.visualViewport) {
      return { visible: false, height: 0, offset: 0 };
    }

    const vv = window.visualViewport;
    const heightDiff = window.innerHeight - vv.height;

    const activeEl = document.activeElement;
    const isInputActive = !!(
      activeEl &&
      (activeEl.tagName === "INPUT" ||
        activeEl.tagName === "TEXTAREA" ||
        (activeEl as HTMLElement).isContentEditable)
    );

    // If focus is in an input and height shrank by more than 100px, keyboard is visible
    const visible = isInputActive && heightDiff > 100;
    const height = visible ? heightDiff : 0;
    const offset = vv.offsetTop;

    return { visible, height, offset };
  }

  subscribe(onValueChange: () => void): () => void {
    if (typeof window === "undefined") return () => {};

    const vv = window.visualViewport;

    // Listen to visualViewport updates
    if (vv) {
      vv.addEventListener("resize", onValueChange);
      vv.addEventListener("scroll", onValueChange);
    }

    // Listen to focus changes to update keyboard state instantly when inputs focus/blur
    window.addEventListener("focusin", onValueChange);
    window.addEventListener("focusout", onValueChange);

    return () => {
      if (vv) {
        vv.removeEventListener("resize", onValueChange);
        vv.removeEventListener("scroll", onValueChange);
      }
      window.removeEventListener("focusin", onValueChange);
      window.removeEventListener("focusout", onValueChange);
    };
  }
}
