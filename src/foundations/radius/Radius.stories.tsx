import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties, ReactNode } from "react";
import { spacing } from "../spacing/spacing";
import { GLYPH_SIZE_PX, glyphRadius, LAYER_RADII } from "./radius";

/**
 * Radius — two separate corner-radius systems:
 *
 * - **Layer-Based** (`--radius-layer-0 … 6`) — organizes **nested containers**.
 *   Layer 0 is the outermost frame (desktop window / iOS device screen); each
 *   surface nested inside follows `inner-radius = outer-radius − gap`, so the
 *   corners stay concentric. The base ladder assumes a one-spacing-unit gap
 *   (`--space-1`). See **Layers**, **Conformance Rule**, **Gap Scaling**.
 * - **Glyph / size-paired** (`--radius-glyph-xs … xl`) — sizes a **single box's**
 *   corners to its own size, so a glyph-like box (swatch, avatar, chip, the Aa
 *   size boxes) reads as a rounded square at any scale. Smaller boxes round
 *   proportionally more. Anchored to the shared glyph size ladder
 *   (`GLYPH_SIZE_PX`). See **Glyph**.
 */
const meta: Meta = {
  title: "Foundations/Radius",
  tags: ["experimental"],
};
export default meta;

type Story = StoryObj;

/** Accent-tinted fill that deepens with each layer, so nesting reads. */
const tint = (i: number) =>
  `color-mix(in srgb, var(--color-accent) ${6 + i * 8}%, var(--color-bg-elevated))`;

/**
 * A stack of concentric boxes. Each layer is inset from its parent by `gap` and
 * rounded by `outer − i·gap`, so the corners stay concentric at every depth.
 */
function Stack({
  levels,
  gap = "--space-1",
  size = 64,
}: {
  levels: number;
  gap?: string;
  size?: number;
}) {
  const render = (i: number): ReactNode => {
    const style: CSSProperties = {
      padding: `var(${gap})`,
      borderRadius: `calc(var(--radius-layer-0) - ${i} * var(${gap}))`,
      background: tint(i),
      border: "1px solid var(--color-separator)",
    };
    const inner =
      i < levels - 1 ? (
        render(i + 1)
      ) : (
        <div
          className="grid place-items-center text-2xs font-mono"
          style={{ width: size, height: size, color: "var(--color-fg-secondary)" }}
        >
          L{i}
        </div>
      );
    return (
      <div key={i} style={style}>
        {inner}
      </div>
    );
  };
  return render(0);
}

/** The hero: seven concentric layers (gap = space-1) beside the token ladder. */
export const Layers: Story = {
  render: () => (
    <div className="flex flex-wrap items-start gap-10 p-8">
      <Stack levels={7} />
      <div className="flex flex-col gap-1">
        {Object.values(LAYER_RADII).map((item, i) => (
          <div key={item.token} className="flex items-center gap-3 py-1">
            <span
              className="size-4 rounded-sm"
              style={{ background: tint(i), border: "1px solid var(--color-separator)" }}
            />
            <code className="w-36 text-xs font-mono text-fg-secondary">{item.token}</code>
            <span className="w-10 text-2xs tabular-nums text-fg-tertiary">{item.valuePx}px</span>
            <span className="text-2xs text-fg-tertiary">{item.description}</span>
          </div>
        ))}
        <p className="mt-3 max-w-xs text-2xs text-fg-tertiary">
          Each layer is inset by <code className="font-mono">--space-1</code> ({spacing["space-1"]})
          and its radius is the layer above minus that gap — so the corners stay concentric all the
          way down.
        </p>
      </div>
    </div>
  ),
};

/** Conformant (inner = outer − gap) vs a constant radius that breaks concentricity. */
export const ConformanceRule: Story = {
  render: () => {
    const Constant = (i: number): ReactNode => {
      const inner =
        i < 3 ? (
          Constant(i + 1)
        ) : (
          <div
            className="grid place-items-center text-2xs font-mono"
            style={{ width: 64, height: 64, color: "var(--color-fg-secondary)" }}
          >
            L{i}
          </div>
        );
      return (
        <div
          key={i}
          style={{
            padding: "var(--space-1)",
            // BUG (for contrast): every layer reuses the SAME radius.
            borderRadius: "var(--radius-layer-0)",
            background: tint(i),
            border: "1px solid var(--color-separator)",
          }}
        >
          {inner}
        </div>
      );
    };
    return (
      <div className="flex flex-wrap items-start gap-12 p-8">
        <figure className="m-0 flex flex-col items-center gap-2">
          <Stack levels={4} />
          <figcaption className="text-sm font-medium text-fg">Conformant</figcaption>
          <code className="text-2xs font-mono text-fg-tertiary">inner = outer − gap</code>
        </figure>
        <figure className="m-0 flex flex-col items-center gap-2">
          {Constant(0)}
          <figcaption className="text-sm font-medium text-fg">Off — constant radius</figcaption>
          <code className="text-2xs font-mono text-fg-tertiary">corners pinch as you nest</code>
        </figure>
      </div>
    );
  },
};

/** A larger gap → a larger radius difference. Same rule, using space-3. */
export const GapScaling: Story = {
  render: () => (
    <div className="flex flex-wrap items-start gap-12 p-8">
      <figure className="m-0 flex flex-col items-center gap-2">
        <Stack levels={5} gap="--space-1" />
        <figcaption className="text-sm font-medium text-fg">
          gap = space-1 ({spacing["space-1"]})
        </figcaption>
      </figure>
      <figure className="m-0 flex flex-col items-center gap-2">
        <Stack levels={3} gap="--space-3" size={48} />
        <figcaption className="text-sm font-medium text-fg">
          gap = space-3 ({spacing["space-3"]})
        </figcaption>
      </figure>
      <p className="max-w-xs self-center text-2xs text-fg-tertiary">
        The radius step always equals the inset gap. Wider gaps subtract more per layer (
        <code className="font-mono">calc(var(--radius-layer-0) - i * var(--space-3))</code>), so
        corners stay concentric at any spacing.
      </p>
    </div>
  ),
};

/** Real-world mapping: window → side nav → card → control, each on its layer. */
export const RealWorld: Story = {
  render: () => {
    const tag = (n: string) => (
      <span className="text-3xs font-mono" style={{ color: "var(--color-fg-tertiary)" }}>
        {n}
      </span>
    );
    return (
      <div className="p-8">
        <div
          className="shadow-lg"
          style={{
            borderRadius: "var(--radius-layer-0)",
            background: "var(--color-bg-elevated)",
            padding: "var(--space-1)",
            width: 460,
          }}
        >
          <div className="flex items-center gap-1.5 px-3 py-2">
            <span className="size-2.5 rounded-full" style={{ background: "var(--sys-red)" }} />
            <span className="size-2.5 rounded-full" style={{ background: "var(--sys-yellow)" }} />
            <span className="size-2.5 rounded-full" style={{ background: "var(--sys-green)" }} />
            <span className="ml-auto">{tag("layer 0 · window")}</span>
          </div>
          <div className="flex gap-1" style={{ padding: "var(--space-1)" }}>
            {/* Side nav — layer 1 */}
            <nav
              className="flex w-32 flex-col gap-1"
              style={{
                borderRadius: "var(--radius-layer-1)",
                background: "var(--color-bg-sunken)",
                padding: "var(--space-1)",
              }}
            >
              {tag("layer 1 · nav")}
              {["All", "Pinned", "Flagged"].map((t, i) => (
                <button
                  key={t}
                  type="button"
                  className="px-2.5 py-1.5 text-left text-sm font-medium"
                  style={{
                    borderRadius: "var(--radius-layer-2)",
                    background: i === 0 ? "var(--color-accent)" : "transparent",
                    color: i === 0 ? "var(--color-fg-on-accent)" : "var(--color-fg)",
                  }}
                >
                  {t}
                </button>
              ))}
            </nav>
            {/* Main — layer 1 */}
            <main
              className="flex flex-1 flex-col gap-1"
              style={{
                borderRadius: "var(--radius-layer-1)",
                background: "var(--color-bg-sunken)",
                padding: "var(--space-1)",
              }}
            >
              {tag("layer 1 · content")}
              <div
                className="flex flex-col gap-1"
                style={{
                  borderRadius: "var(--radius-layer-2)",
                  background: "var(--color-bg-elevated)",
                  padding: "var(--space-1)",
                }}
              >
                {tag("layer 2 · card")}
                <input
                  readOnly
                  value="Search…"
                  className="px-2.5 py-1.5 text-sm"
                  style={{
                    borderRadius: "var(--radius-layer-3)",
                    background: "var(--color-fill)",
                    color: "var(--color-placeholder)",
                    border: "none",
                  }}
                />
                <span className="self-start">{tag("layer 3 · control")}</span>
              </div>
            </main>
          </div>
        </div>
        <p className="mt-4 max-w-md text-2xs text-fg-tertiary">
          Each nesting inset by <code className="font-mono">--space-1</code> drops one layer. A
          child that sits <em>flush</em> to its parent's edge (no gap) instead keeps the parent's
          radius — which is why a button floating at the top of the nav can read at layer 1.
        </p>
      </div>
    );
  },
};

/* ---------------- Glyph / size-paired radius ---------------- */

const GLYPH = Object.entries(GLYPH_SIZE_PX);

// A spread of arbitrary box sizes (e.g. font-derived) between the named buckets.
const GLYPH_PX = [11, 13, 16, 20, 24, 28, 36, 48, 54, 64, 80];

/**
 * Glyph radius — a box's corners scale with its own size, so it reads as a
 * rounded square at every scale (the named buckets, then arbitrary sizes).
 */
export const Glyph: Story = {
  render: () => (
    <div className="flex flex-col gap-8 p-8">
      <section className="flex flex-col gap-3">
        <h3 className="m-0 text-sm font-semibold text-fg">Named buckets (glyph sizes)</h3>
        <div className="flex items-end gap-6">
          {GLYPH.map(([name, px]) => (
            <div key={name} className="flex flex-col items-center gap-1.5">
              <div
                className="bg-accent"
                style={{ width: px, height: px, borderRadius: `var(--radius-glyph-${name})` }}
              />
              <span className="text-2xs font-mono text-fg-tertiary tabular-nums">
                {name} · {px}px · r{glyphRadius(px)}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h3 className="m-0 text-sm font-semibold text-fg">
          Interpolated — any box size gets a paired radius
        </h3>
        <div className="flex items-end gap-4">
          {GLYPH_PX.map((px) => (
            <div key={px} className="flex flex-col items-center gap-1.5">
              <div
                className="bg-accent-subtle"
                style={{
                  width: px,
                  height: px,
                  borderRadius: glyphRadius(px),
                  outline: "1px solid var(--color-accent)",
                }}
              />
              <span className="text-3xs font-mono text-fg-tertiary tabular-nums">
                {px}/{glyphRadius(px)}
              </span>
            </div>
          ))}
        </div>
        <p className="max-w-prose text-2xs text-fg-tertiary">
          Radius is paired to the box size via <code className="font-mono">glyphRadius(px)</code> —
          smaller boxes round proportionally more (xs ≈ ¼ of the box) so the corners stay visible,
          larger boxes round less (xl ≈ ⅙). This is what the Aa size boxes in
          <strong> Typography → Size</strong>, the square <strong>Swatch</strong>, and{" "}
          <strong>Avatar</strong> use.
        </p>
      </section>
    </div>
  ),
};
