import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties } from "react";
import { accentThemes, applePrimitives, semanticRoles } from "./color";
import type { ContrastSensitiveValue } from "./color.types";

/**
 * Palette — the Apple ecosystem color system. Core (system colors, grays, and
 * the dynamic semantic roles) plus the Accent. Every value is read straight
 * from the Tier-1 `--apple-*` constants / Tier-2 `--sys-*` & `--color-*` tokens.
 *
 * Light & dark are shown together: the raw scales display both literal ends,
 * and the semantic panels force `color-scheme` so the `light-dark()` tokens
 * resolve for each mode regardless of the toolbar theme.
 */
const meta: Meta = {
  title: "Foundations/Color/Palette",
  tags: ["experimental"],
};
export default meta;

type Story = StoryObj;

/* ---------- small display atoms ---------- */

/** A chip swatch over a literal CSS color value + the value caption. */
function Chip({ value }: { value: string }) {
  return (
    <span className="flex flex-col items-center gap-1">
      <span
        className="inline-block size-10 rounded-lg shadow-sm"
        style={{
          background: value,
          border: "1px solid var(--color-separator)",
        }}
      />
      <span className="text-3xs tabular-nums text-fg-tertiary">{value}</span>
    </span>
  );
}

/** A full-detail row: name + token, then Default L/D and Increased-Contrast L/D. */
function QuadRow({ q }: { q: Quad }) {
  return (
    <div className="flex items-center gap-4 border-b border-separator py-2">
      <span className="flex w-28 shrink-0 flex-col">
        <span className="text-sm text-fg">{q.name}</span>
        <code className="text-3xs font-mono text-fg-tertiary">--sys-{q.slug}</code>
      </span>
      <Chip value={q.dl} />
      <Chip value={q.dd} />
      <span className="mx-1 h-10 w-px" style={{ background: "var(--color-separator)" }} />
      <Chip value={q.cl} />
      <Chip value={q.cd} />
    </div>
  );
}

function QuadHeader() {
  return (
    <div className="mb-1 flex items-center gap-4 pl-32 text-2xs font-semibold uppercase tracking-wide text-fg-tertiary">
      <span className="w-12 text-center">Default</span>
      <span className="w-12 text-center">Default</span>
      <span className="mx-1 w-px" />
      <span className="w-12 text-center">Contrast</span>
      <span className="w-12 text-center">Contrast</span>
    </div>
  );
}

/** A panel forced to one appearance so `light-dark()` tokens resolve to it. */
function ModePanel({ mode, children }: { mode: "light" | "dark"; children: React.ReactNode }) {
  return (
    <section
      className="flex-1 min-w-64 rounded-2xl border border-separator p-4"
      style={
        {
          colorScheme: mode,
          background: "var(--color-bg)",
          color: "var(--color-fg)",
        } as CSSProperties
      }
    >
      <h4
        className="m-0 mb-3 text-xs font-semibold uppercase tracking-wide"
        style={{ color: "var(--color-fg-tertiary)" }}
      >
        {mode}
      </h4>
      {children}
    </section>
  );
}

/** One color, all four appearances: { default, contrast } × { light, dark }. */
interface Quad {
  name: string;
  slug: string;
  dl: string; // default light
  dd: string; // default dark
  cl: string; // increased-contrast light
  cd: string; // increased-contrast dark
}

const labelFor = (slug: string) =>
  slug.replace(/([a-z])(\d+)/, "$1 $2").replace(/^./, (initial) => initial.toUpperCase());

const toQuads = (palette: Record<string, ContrastSensitiveValue>): Quad[] =>
  Object.entries(palette).map(([slug, value]) => ({
    name: labelFor(slug),
    slug,
    dl: value.default.light,
    dd: value.default.dark,
    cl: value.contrast.light,
    cd: value.contrast.dark,
  }));

const SYSTEM = toQuads(applePrimitives.systemColors);
const GRAYS = toQuads(applePrimitives.systemGrays);
const semanticTokenSuffix = (tokenName: string) => tokenName.replace("--color-", "");
const BACKGROUNDS = semanticRoles
  .filter((role) =>
    ["--color-bg", "--color-bg-elevated", "--color-bg-sunken"].includes(role.tokenName),
  )
  .map((role) => semanticTokenSuffix(role.tokenName));
const LABELS = semanticRoles
  .filter(
    (role) => role.tokenName.startsWith("--color-fg") && role.tokenName !== "--color-fg-on-accent",
  )
  .map((role) => semanticTokenSuffix(role.tokenName));
const FILLS = semanticRoles
  .filter((role) => role.tokenName.startsWith("--color-fill"))
  .map((role) => semanticTokenSuffix(role.tokenName));
const ACCENT_ROLES = semanticRoles
  .filter((role) => role.tokenName.startsWith("--color-accent"))
  .map((role) => semanticTokenSuffix(role.tokenName));

/* ---------- Core ---------- */

/** The 12 system colors — every appearance: Default and Increased-Contrast, light + dark. */
export const SystemColors: Story = {
  render: () => (
    <div className="p-6">
      <QuadHeader />
      {SYSTEM.map((q) => (
        <QuadRow key={q.slug} q={q} />
      ))}
      <p className="mt-3 max-w-prose text-2xs text-fg-tertiary">
        The two right columns are the <strong>Increase Contrast</strong> accessibility appearance —
        live, they swap in under <code className="font-mono">@media (prefers-contrast: more)</code>.
      </p>
    </div>
  ),
};

/** System Gray 1–6 — the structural neutral scale, all four appearances. */
export const Grays: Story = {
  render: () => (
    <div className="p-6">
      <QuadHeader />
      {GRAYS.map((q) => (
        <QuadRow key={q.slug} q={q} />
      ))}
    </div>
  ),
};

/** The dynamic semantic roles, shown in both appearances side by side. */
export const Semantic: Story = {
  render: () => {
    const Body = () => (
      <div className="flex flex-col gap-5">
        <div>
          <p
            className="m-0 mb-1.5 text-2xs font-semibold uppercase tracking-wide"
            style={{ color: "var(--color-fg-tertiary)" }}
          >
            Backgrounds (grouped)
          </p>
          <div className="flex gap-2">
            {BACKGROUNDS.map((t) => (
              <span
                key={t}
                className="flex h-12 flex-1 items-end rounded-lg border p-1 text-3xs font-mono"
                style={{
                  background: `var(--color-${t})`,
                  borderColor: "var(--color-separator)",
                  color: "var(--color-fg-tertiary)",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <div>
          <p
            className="m-0 mb-1.5 text-2xs font-semibold uppercase tracking-wide"
            style={{ color: "var(--color-fg-tertiary)" }}
          >
            Labels
          </p>
          {LABELS.map((t) => (
            <div key={t} className="text-base leading-snug" style={{ color: `var(--color-${t})` }}>
              The quick brown fox — {t}
            </div>
          ))}
        </div>
        <div>
          <p
            className="m-0 mb-1.5 text-2xs font-semibold uppercase tracking-wide"
            style={{ color: "var(--color-fg-tertiary)" }}
          >
            Fills
          </p>
          <div className="flex gap-2">
            {FILLS.map((t, i) => (
              <span
                key={t}
                className="flex h-9 flex-1 items-center justify-center rounded-lg text-3xs font-mono"
                style={{ background: `var(--color-${t})`, color: "var(--color-fg-secondary)" }}
              >
                {i + 1}
              </span>
            ))}
          </div>
        </div>
        <div>
          <p
            className="m-0 mb-1.5 text-2xs font-semibold uppercase tracking-wide"
            style={{ color: "var(--color-fg-tertiary)" }}
          >
            Separators · Accent
          </p>
          <div className="h-px w-full" style={{ background: "var(--color-separator)" }} />
          <div
            className="mt-2 h-px w-full"
            style={{ background: "var(--color-separator-opaque)" }}
          />
          <div className="mt-3 flex items-center gap-2">
            <span
              className="rounded-full px-3 py-1 text-sm font-semibold"
              style={{ background: "var(--color-accent)", color: "var(--color-fg-on-accent)" }}
            >
              Accent
            </span>
            <span
              className="rounded-full px-3 py-1 text-sm font-semibold"
              style={{ background: "var(--color-accent-subtle)", color: "var(--color-accent)" }}
            >
              Subtle
            </span>
            <a className="text-sm" style={{ color: "var(--color-link)" }} href="#link">
              Link
            </a>
          </div>
        </div>
      </div>
    );
    return (
      <div className="flex flex-wrap gap-4 p-6">
        <ModePanel mode="light">
          <Body />
        </ModePanel>
        <ModePanel mode="dark">
          <Body />
        </ModePanel>
      </div>
    );
  },
};

/* ---------- Accent ---------- */

const ACCENTS = Object.keys(accentThemes);

/** The active accent and the selectable Apple accent options (switch via toolbar). */
export const Accent: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-6">
      <section className="flex flex-col gap-2">
        <h3 className="m-0 text-sm font-semibold text-fg">Active accent</h3>
        <div className="flex items-center gap-3">
          <span
            className="size-16 rounded-2xl shadow-md"
            style={{ background: "var(--color-accent)" }}
          />
          <div className="flex flex-col gap-1.5">
            {ACCENT_ROLES.map((t) => (
              <span key={t} className="flex items-center gap-2">
                <span
                  className="size-5 rounded"
                  style={{
                    background: `var(--color-${t})`,
                    border: "1px solid var(--color-separator)",
                  }}
                />
                <code className="text-2xs font-mono text-fg-tertiary">--color-{t}</code>
              </span>
            ))}
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-2">
        <h3 className="m-0 text-sm font-semibold text-fg">Accent options (Apple system set)</h3>
        <div className="flex flex-wrap gap-3">
          {ACCENTS.map((a) => (
            <span key={a} className="flex flex-col items-center gap-1">
              <span
                className="size-11 rounded-full shadow-sm"
                style={{ background: `var(--sys-${a})` }}
              />
              <span className="text-2xs text-fg-tertiary capitalize">{a}</span>
            </span>
          ))}
        </div>
      </section>
    </div>
  ),
};
