import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties } from "react";
import { MATERIAL_THICKNESSES, MATERIALS } from "./material";

/**
 * Material — Apple's translucent system surfaces. A material is a blurred,
 * adaptive fill that samples the content behind it, so toolbars, sheets, and
 * sidebars feel layered above the page. The HIG defines four by thickness, from
 * most see-through to most opaque: Ultra-Thin → Thin → Regular → Thick.
 *
 * Tokens: `--material-*` (semantic) over `--apple-mat-*` (raw light/dark);
 * apply with the `.material-*` classes (fill + backdrop blur + hairline).
 * Place "vibrant" content (labels) on top using the standard label tokens.
 *
 * https://developer.apple.com/design/human-interface-guidelines/materials
 */
const meta: Meta = {
  title: "Foundations/Material",
  tags: ["experimental"],
};
export default meta;

type Story = StoryObj;

/** A colorful backdrop so the blur + translucency are visible. */
const BACKDROP: CSSProperties = {
  background:
    "linear-gradient(135deg, var(--sys-blue), var(--sys-purple) 30%, var(--sys-pink) 55%, var(--sys-orange) 80%, var(--sys-yellow))",
};

function MaterialCard({ cls, name, note }: { cls: string; name: string; note: string }) {
  return (
    <div className={`${cls} flex flex-col gap-1 rounded-2xl p-4`} style={{ minWidth: 200 }}>
      <span className="text-base font-semibold" style={{ color: "var(--color-fg)" }}>
        {name}
      </span>
      <span className="text-sm" style={{ color: "var(--color-fg-secondary)" }}>
        {note}
      </span>
      <code className="text-2xs font-mono" style={{ color: "var(--color-fg-tertiary)" }}>
        .{cls}
      </code>
    </div>
  );
}

/** All source-defined materials over a vivid gradient (uses the current toolbar theme). */
export const Ramp: Story = {
  render: () => (
    <div className="p-6">
      <div className="flex flex-wrap gap-4 rounded-3xl p-6" style={BACKDROP}>
        {MATERIAL_THICKNESSES.map((thickness) => {
          const mat = MATERIALS[thickness];
          return (
            <MaterialCard
              key={mat.className}
              cls={mat.className}
              name={mat.name}
              note={mat.description}
            />
          );
        })}
      </div>
    </div>
  ),
};

/** The same ramp forced into Light and Dark, so the adaptive fill is obvious. */
export const LightAndDark: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-6">
      {(["light", "dark"] as const).map((mode) => (
        <div key={mode}>
          <h4 className="m-0 mb-2 text-xs font-semibold uppercase tracking-wide text-fg-tertiary">
            {mode}
          </h4>
          <div
            className="flex flex-wrap gap-4 rounded-3xl p-6"
            style={{ ...BACKDROP, colorScheme: mode } as CSSProperties}
          >
            {MATERIAL_THICKNESSES.map((thickness) => {
              const mat = MATERIALS[thickness];
              return (
                <MaterialCard
                  key={mat.className}
                  cls={mat.className}
                  name={mat.name}
                  note={mat.description}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  ),
};

/** A realistic use: a Thick-material toolbar floating over scrolling content. */
export const ToolbarOverContent: Story = {
  render: () => (
    <div className="p-6">
      <div className="relative h-80 overflow-hidden rounded-3xl" style={BACKDROP}>
        <div className="absolute inset-x-0 top-0 z-10 material-thick flex items-center justify-between px-5 py-3">
          <span className="text-base font-semibold" style={{ color: "var(--color-fg)" }}>
            Conversations
          </span>
          <span className="text-sm" style={{ color: "var(--color-accent)" }}>
            Edit
          </span>
        </div>
        <div className="grid grid-cols-6 gap-3 p-5 pt-20">
          {Array.from({ length: 24 }, (_, i) => `tile-${i}`).map((id) => (
            <div key={id} className="aspect-square rounded-xl bg-white/30" />
          ))}
        </div>
        <div className="absolute inset-x-0 bottom-0 material-regular flex items-center justify-around px-5 py-3">
          {["All", "Pinned", "Flagged"].map((t) => (
            <span
              key={t}
              className="text-sm font-medium"
              style={{ color: "var(--color-fg-secondary)" }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  ),
};
