import type { Sensor } from "./sensor.types";

export interface SafeAreaSensorValue {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export class SafeAreaSensor implements Sensor<SafeAreaSensorValue> {
  private static probe: HTMLDivElement | null = null;

  private getOrCreateProbe(): HTMLDivElement | null {
    if (typeof document === "undefined") return null;
    if (SafeAreaSensor.probe) return SafeAreaSensor.probe;

    const div = document.createElement("div");
    div.id = "safe-area-probe";
    div.style.position = "fixed";
    div.style.top = "env(safe-area-inset-top, 0px)";
    div.style.right = "env(safe-area-inset-right, 0px)";
    div.style.bottom = "env(safe-area-inset-bottom, 0px)";
    div.style.left = "env(safe-area-inset-left, 0px)";
    div.style.width = "0px";
    div.style.height = "0px";
    div.style.visibility = "hidden";
    div.style.pointerEvents = "none";
    div.style.zIndex = "-9999";

    if (document.body) {
      document.body.appendChild(div);
      SafeAreaSensor.probe = div;
    }
    return div;
  }

  read(): SafeAreaSensorValue {
    if (typeof window === "undefined" || typeof document === "undefined") {
      return { top: 0, right: 0, bottom: 0, left: 0 };
    }

    const probe = this.getOrCreateProbe();
    if (!probe) return { top: 0, right: 0, bottom: 0, left: 0 };

    if (!probe.parentElement && document.body) {
      document.body.appendChild(probe);
    }

    const style = window.getComputedStyle(probe);
    return {
      top: parseFloat(style.top) || 0,
      right: parseFloat(style.right) || 0,
      bottom: parseFloat(style.bottom) || 0,
      left: parseFloat(style.left) || 0,
    };
  }

  subscribe(onValueChange: () => void): () => void {
    if (typeof window === "undefined") return () => {};

    window.addEventListener("resize", onValueChange);
    window.addEventListener("orientationchange", onValueChange);

    let observer: ResizeObserver | null = null;
    const probe = this.getOrCreateProbe();
    if (probe && typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(() => {
        onValueChange();
      });
      observer.observe(probe);
    }

    return () => {
      window.removeEventListener("resize", onValueChange);
      window.removeEventListener("orientationchange", onValueChange);
      if (observer) {
        observer.disconnect();
      }
    };
  }
}
