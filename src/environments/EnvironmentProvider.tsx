import type { ReactNode } from "react";
import { createContext, useEffect, useMemo } from "react";
import type { DeviceType } from "@/foundations/device";
import { applyDeviceAttributes } from "./device-detector";
import type { SensorSnapshot } from "./environment.types";
import {
  CapabilitySensor,
  DeviceSensor,
  InputSensor,
  KeyboardSensor,
  LaunchSensor,
  SafeAreaSensor,
} from "./sensors";

/**
 * Coalesced reactive store that aggregates sensor inputs.
 * Debounces parallel browser triggers using requestAnimationFrame and dispatches atomic snapshot updates.
 */
export class EnvironmentStore {
  private snapshot: SensorSnapshot;
  private listeners = new Set<() => void>();
  private sensors: {
    device: DeviceSensor;
    launch: LaunchSensor;
    input: InputSensor;
    safeArea: SafeAreaSensor;
    keyboard: KeyboardSensor;
    capability: CapabilitySensor;
  };
  private rafId: number | null = null;
  private unsubs: (() => void)[] = [];

  constructor(serverDefault: DeviceType = "desktop") {
    this.sensors = {
      device: new DeviceSensor(serverDefault),
      launch: new LaunchSensor(),
      input: new InputSensor(),
      safeArea: new SafeAreaSensor(),
      keyboard: new KeyboardSensor(),
      capability: new CapabilitySensor(),
    };

    const isClient = typeof window !== "undefined";
    this.snapshot = {
      device: this.sensors.device.read(),
      launch: this.sensors.launch.read(),
      input: this.sensors.input.read(),
      safeArea: this.sensors.safeArea.read(),
      keyboard: this.sensors.keyboard.read(),
      capability: this.sensors.capability.read(),
      isResolved: isClient,
    };

    if (isClient) {
      this.init();
    }
  }

  private init() {
    const onSensorChange = () => {
      if (this.rafId !== null) return;
      this.rafId = requestAnimationFrame(() => {
        this.rafId = null;
        const prev = this.snapshot;
        const next = {
          device: this.sensors.device.read(),
          launch: this.sensors.launch.read(),
          input: this.sensors.input.read(),
          safeArea: this.sensors.safeArea.read(),
          keyboard: this.sensors.keyboard.read(),
          capability: this.sensors.capability.read(),
          isResolved: true,
        };

        if (JSON.stringify(prev) !== JSON.stringify(next)) {
          this.snapshot = next;
          this.notify();
        }
      });
    };

    this.unsubs = [
      this.sensors.device.subscribe(onSensorChange),
      this.sensors.launch.subscribe(onSensorChange),
      this.sensors.input.subscribe(onSensorChange),
      this.sensors.safeArea.subscribe(onSensorChange),
      this.sensors.keyboard.subscribe(onSensorChange),
      this.sensors.capability.subscribe(onSensorChange),
    ];
  }

  getSnapshot(): SensorSnapshot {
    return this.snapshot;
  }

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  destroy() {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
    }
    for (const unsub of this.unsubs) {
      unsub();
    }
    this.listeners.clear();
  }

  private notify() {
    for (const listener of this.listeners) {
      listener();
    }
  }
}

export const EnvironmentContext = createContext<EnvironmentStore | null>(null);

export interface EnvironmentProviderProps {
  children: ReactNode;
  serverDefault?: DeviceType;
}

export function EnvironmentProvider({
  children,
  serverDefault = "desktop",
}: EnvironmentProviderProps) {
  const store = useMemo(() => new EnvironmentStore(serverDefault), [serverDefault]);

  useEffect(() => {
    const cleanupAttributes = applyDeviceAttributes();
    return () => {
      cleanupAttributes();
      store.destroy();
    };
  }, [store]);

  return <EnvironmentContext.Provider value={store}>{children}</EnvironmentContext.Provider>;
}
