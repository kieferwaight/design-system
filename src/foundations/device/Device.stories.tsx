import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { useDeviceState, useLaunchMode } from "@/environments";
import { DEVICE_QUERY } from "./device";

/**
 * Device — the three target classes (**ios · ipad · desktop**) the kit supports
 * for both CSS and JS. Width thresholds live once in `src/foundations/device/device.ts`
 * (`BREAKPOINTS`) and `src/design/theme.css` (`--breakpoint-*`); everything else
 * derives from them.
 *
 * Two questions, two answers:
 * - **`viewport`** — pure width class. Drives responsive *layout*; mirrors the
 *   Tailwind `ipad:` / `desktop:` variants and `[data-viewport]`.
 * - **`type`** — *capability-aware*. Real iPhones/iPads are pinned by user-agent
 *   so they're correct in any orientation (an iPad in landscape is still
 *   `ipad`, not `desktop`). Use for *behavior* — touch targets, native
 *   gestures. Exposed as `[data-device]`.
 *
 * In a desktop browser (and this Storybook canvas) the two are equal and follow
 * width — resize via the **Viewport** toolbar to watch them flip. On a real
 * iPad they can legitimately differ.
 *
 * **Launch mode** answers a third question — installed PWA vs browser tab:
 * `useLaunchMode` / `useIsPWA` / `useDisplayMode`. Gate an "Add to Home Screen"
 * prompt on `isSafariBrowser`; in CSS use the `pwa:` variant or `[data-pwa]`.
 *
 * SSR-safe hooks: `useDeviceState`, `useDeviceType`, `useViewportClass`,
 * `useLaunchMode`, `useDisplayMode`, `useIsIOS/IPad/Desktop`, `useIsPWA`,
 * `useIsTouch`, `useIsStandalone`, `useMediaQuery`.
 */
const meta: Meta = {
  title: "Foundations/Device",
  tags: ["experimental"],
};
export default meta;

type Story = StoryObj;

const DEVICE_DETAILS: Partial<Record<keyof typeof DEVICE_QUERY, { label: string; hint: string }>> =
  {
    ios: { label: "iPhone", hint: "phone-first base styles" },
    ipad: { label: "iPad", hint: "ipad: variant" },
    desktop: { label: "Desktop", hint: "desktop: variant" },
  };

const DEVICES = (Object.keys(DEVICE_QUERY) as (keyof typeof DEVICE_QUERY)[]).map((type) => ({
  type,
  label: DEVICE_DETAILS[type]?.label ?? type,
  hint: DEVICE_DETAILS[type]?.hint ?? "source-defined viewport class",
}));

function Field({ label, value, on }: { label: string; value: string; on?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2 border-b border-separator">
      <span className="text-sm text-fg-secondary">{label}</span>
      <span
        className="rounded-full px-3 py-1 text-sm font-semibold tabular-nums"
        style={{
          background: on === false ? "var(--color-bg-sunken)" : "var(--color-accent-subtle)",
          color: on === false ? "var(--color-fg-tertiary)" : "var(--color-accent)",
        }}
      >
        {value}
      </span>
    </div>
  );
}

/** Live inspector — reads the device hooks and reflects the current state. */
export const Inspector: Story = {
  render: () => {
    function Panel() {
      const { type: device, viewport, touch } = useDeviceState();
      const launch = useLaunchMode();
      return (
        <div className="flex flex-col gap-6 p-6 max-w-xl">
          <section className="rounded-xl border border-border bg-bg-elevated p-5">
            <h3 className="m-0 mb-3 text-base font-semibold text-fg">Live state</h3>
            <Field label="type (capability)" value={device} />
            <Field label="viewport (width)" value={viewport} />
            <Field label="touch" value={String(touch)} on={touch} />
          </section>

          <section className="rounded-xl border border-border bg-bg-elevated p-5">
            <h3 className="m-0 mb-3 text-base font-semibold text-fg">Launch mode</h3>
            <Field label="displayMode" value={launch.displayMode} />
            <Field label="isPWA" value={String(launch.isPWA)} on={launch.isPWA} />
            <Field
              label="isSafariBrowser"
              value={String(launch.isSafariBrowser)}
              on={launch.isSafariBrowser}
            />
            <Field label="isIOS" value={String(launch.isIOS)} on={launch.isIOS} />
            <p className="m-0 mt-3 text-2xs text-fg-tertiary">
              Gate an "Add to Home Screen" prompt on{" "}
              <code className="font-mono">isSafariBrowser</code>; hide it (and browser chrome) once{" "}
              <code className="font-mono">isPWA</code> is true.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h3 className="m-0 text-base font-semibold text-fg">Breakpoints</h3>
            <div className="overflow-hidden rounded-xl border border-border">
              {DEVICES.map((d) => {
                const active = d.type === device;
                return (
                  <div
                    key={d.type}
                    className="flex items-center justify-between gap-3 px-4 py-3 border-b border-separator last:border-b-0"
                    style={{ background: active ? "var(--color-accent-subtle)" : undefined }}
                  >
                    <div className="flex flex-col">
                      <span className="text-fg font-medium" style={{ fontSize: 15 }}>
                        {d.label}{" "}
                        <code className="text-xs font-mono text-fg-tertiary">{d.type}</code>
                      </span>
                      <code className="text-2xs font-mono text-fg-tertiary">
                        {DEVICE_QUERY[d.type]}
                      </code>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-2xs text-fg-tertiary">{d.hint}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Pure-CSS proof: each line shows only at its own device width. */}
          <section className="flex flex-col gap-2">
            <h3 className="m-0 text-base font-semibold text-fg">CSS variants (no JS)</h3>
            <p className="m-0 text-fg" style={{ fontSize: 17 }}>
              <span className="ipad:hidden desktop:hidden">
                Showing <strong>ios</strong> — base (un-prefixed) styles
              </span>
              <span className="hidden ipad:inline desktop:hidden">
                Showing <strong>ipad</strong> — <code className="font-mono text-sm">ipad:</code>{" "}
                and-up
              </span>
              <span className="hidden desktop:inline">
                Showing <strong>desktop</strong> —{" "}
                <code className="font-mono text-sm">desktop:</code> and-up
              </span>
            </p>
          </section>
        </div>
      );
    }
    return <Panel />;
  },
  play: async ({ canvas }) => {
    // The live readout renders the capability type, viewport class, and launch mode.
    await expect(canvas.getByText("type (capability)")).toBeInTheDocument();
    await expect(canvas.getByText("viewport (width)")).toBeInTheDocument();
    await expect(canvas.getByText("displayMode")).toBeInTheDocument();
    // In the Storybook canvas (a browser tab) the launch mode is "browser".
    await expect(canvas.getByText("browser")).toBeInTheDocument();
    const labels = canvas.getAllByText(/^(ios|ipad|desktop)$/);
    await expect(labels.length).toBeGreaterThan(0);
  },
};
