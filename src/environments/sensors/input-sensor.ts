import { isTouchDevice } from "@/foundations/device";
import type { Sensor } from "./sensor.types";

export interface InputSensorValue {
  touch: boolean;
  hover: boolean;
  keyboard: boolean;
  coarsePointer: boolean;
  finePointer: boolean;
}

export class InputSensor implements Sensor<InputSensorValue> {
  read(): InputSensorValue {
    if (typeof window === "undefined") {
      return {
        touch: false,
        hover: true,
        keyboard: true,
        coarsePointer: false,
        finePointer: true,
      };
    }

    const hasMatchMedia = typeof window.matchMedia === "function";
    const coarsePointer = hasMatchMedia && window.matchMedia("(pointer: coarse)").matches;
    const finePointer = hasMatchMedia && window.matchMedia("(pointer: fine)").matches;
    const hover = hasMatchMedia && window.matchMedia("(hover: hover)").matches;
    const touch = isTouchDevice() || coarsePointer;

    return {
      touch,
      hover,
      keyboard: true,
      coarsePointer,
      finePointer,
    };
  }

  subscribe(onValueChange: () => void): () => void {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return () => {};
    }

    const queries = ["(pointer: coarse)", "(pointer: fine)", "(hover: hover)"];
    const mqls = queries.map((q) => window.matchMedia(q));

    for (const m of mqls) {
      m.addEventListener("change", onValueChange);
    }

    return () => {
      for (const m of mqls) {
        m.removeEventListener("change", onValueChange);
      }
    };
  }
}
