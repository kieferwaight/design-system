import { Children, type CSSProperties, type ReactNode } from "react";
import { applePrimitives, oklchGenerativeScales } from "./color";
import type { OklchRung } from "./color.types";

/**
 * Presentational demos for the Color overview doc (`Color.mdx`) and the
 * interactive playground (`Color.stories.tsx`). Every swatch here is generated
 * from the real engine data in `color.ts` — nothing is hand-keyed — so the
 * document always reflects the system that actually ships.
 */

/* ------------------------------------------------------------------ */
/* OKLCH evaluation — mirrors the `calc(var(--seed-accent-c) * n)` math */
/* ------------------------------------------------------------------ */

export const SEEDS = oklchGenerativeScales.seeds;

/** Resolve a rung's chroma — a number, or a `calc(--seed-accent-c * n)` string. */
export const resolveChroma = (value: number | string, accentC = SEEDS.accentC): number => {
  if (typeof value === "number") return value;
  const multiplier = value.match(/\*\s*([0-9.]+)/)?.[1];
  return multiplier ? Number((accentC * Number(multiplier)).toFixed(4)) : accentC;
};

/** A neutral rung → an OKLCH string, drifting hue with the seed. */
export const neutralColor = (rung: OklchRung, neutralH = SEEDS.neutralH): string =>
  `oklch(${rung.lightness} ${rung.chroma} ${neutralH + rung.hueShift})`;

/** An accent rung → an OKLCH string, parameterised by hue + chroma seed. */
export const accentColor = (
  rung: OklchRung,
  hue = SEEDS.accentH,
  chroma = SEEDS.accentC,
): string => `oklch(${rung.lightness} ${resolveChroma(rung.chroma, chroma)} ${hue + rung.hueShift})`;

/** The accent hue families used throughout the doc (approximate OKLCH angles). */
export const ACCENT_HUES = [
  { name: "Orange", hue: 55 },
  { name: "Yellow", hue: 95 },
  { name: "Green", hue: 150 },
  { name: "Cyan", hue: 205 },
  { name: "Blue", hue: 250 },
  { name: "Purple", hue: 305 },
] as const;

/* ------------------------------------------------------------------ */
/* Shared style atoms                                                  */
/* ------------------------------------------------------------------ */

const surface: CSSProperties = {
  borderRadius: 16,
  border: "1px solid var(--color-separator)",
  background: "var(--color-bg-elevated)",
  overflow: "hidden",
};

const mono: CSSProperties = {
  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
  fontVariantNumeric: "tabular-nums",
};

const caption: CSSProperties = {
  fontSize: 11,
  lineHeight: 1.35,
  color: "var(--color-fg-tertiary)",
};

const Row = ({ children, style }: { children: ReactNode; style?: CSSProperties }) => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "stretch", ...style }}>
    {Children.toArray(children)}
  </div>
);

const Figure = ({ label, children }: { label: ReactNode; children: ReactNode }) => (
  <figure style={{ margin: 0, display: "flex", flexDirection: "column", gap: 8, flex: "1 1 220px" }}>
    {children}
    <figcaption style={{ ...caption, fontSize: 12, color: "var(--color-fg-secondary)" }}>
      {label}
    </figcaption>
  </figure>
);

/* ------------------------------------------------------------------ */
/* 1 · Layered architecture diagram                                    */
/* ------------------------------------------------------------------ */

const LAYERS = [
  { name: "Generative System", note: "seeds → every family" },
  { name: "Base Color System", note: "neutral + accent scales" },
  { name: "Palette", note: "one ordered scale" },
  { name: "Swatch", note: "rendered token" },
  { name: "Color Token", note: "one value" },
];

/** Concentric containers: each layer composes the one nested inside it. */
export const LayerDiagram = () => {
  const render = (i: number): ReactNode => {
    const tintPct = 6 + (LAYERS.length - 1 - i) * 7;
    const layer = LAYERS[i];
    return (
      <div
        style={{
          padding: "14px 16px",
          borderRadius: 18 - i * 2,
          border: "1px solid var(--color-separator)",
          background: `color-mix(in oklch, var(--color-accent) ${tintPct}%, var(--color-bg-elevated))`,
        }}
      >
        <div style={{ ...caption, fontSize: 12, fontWeight: 600, color: "var(--color-fg)" }}>
          {layer.name}{" "}
          <span style={{ fontWeight: 400, color: "var(--color-fg-tertiary)" }}>· {layer.note}</span>
        </div>
        <div style={{ marginTop: 12 }}>
          {i < LAYERS.length - 1 ? (
            render(i + 1)
          ) : (
            <div
              style={{
                height: 44,
                borderRadius: 10,
                background: "var(--color-accent)",
              }}
            />
          )}
        </div>
      </div>
    );
  };
  return <div style={{ maxWidth: 560 }}>{render(0)}</div>;
};

/* ------------------------------------------------------------------ */
/* 2 · Swatch primitives                                               */
/* ------------------------------------------------------------------ */

/** A continuous, gap-free ramp — reads as one perceptual gradient. */
export const SwatchStrip = ({ colors, height = 48 }: { colors: string[]; height?: number }) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: `repeat(${colors.length}, 1fr)`,
      borderRadius: 12,
      overflow: "hidden",
      border: "1px solid var(--color-separator)",
    }}
  >
    {colors.map((color, i) => (
      <div key={i} style={{ background: color, height }} />
    ))}
  </div>
);

/** Big labelled swatches for naming the rungs of a scale. */
export const SwatchGrid = ({
  items,
  min = 104,
}: {
  items: { color: string; label: string; sub?: string }[];
  min?: number;
}) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: `repeat(auto-fill, minmax(${min}px, 1fr))`,
      gap: 10,
    }}
  >
    {items.map((it, i) => (
      <div key={i} style={surface}>
        <div style={{ background: it.color, height: 64 }} />
        <div style={{ padding: "8px 10px" }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "var(--color-fg)" }}>{it.label}</div>
          {it.sub && (
            <div style={{ ...mono, ...caption, fontSize: 10, marginTop: 2 }}>{it.sub}</div>
          )}
        </div>
      </div>
    ))}
  </div>
);

const light = (v: { light: string; dark: string }) => v.light;

/* ------------------------------------------------------------------ */
/* 3 · Apple ecosystem demos                                           */
/* ------------------------------------------------------------------ */

/** Apple system grays, 6 → 1, as one continuous gradient (light values). */
export const GrayGradient = () => {
  const grays = ["gray6", "gray5", "gray4", "gray3", "gray2", "gray"] as const;
  return <SwatchStrip colors={grays.map((g) => light(applePrimitives.systemGrays[g].default))} />;
};

/** Canvas → elevated surface → modal, separated by Apple grouped backgrounds. */
export const ElevatedSurfaces = () => {
  const tiers = [
    { name: "Canvas", bg: light(applePrimitives.backgrounds.grouped.grouped1), shadow: "none" },
    {
      name: "Elevated surface",
      bg: light(applePrimitives.backgrounds.grouped.grouped2),
      shadow: applePrimitives.shadows.md.light,
    },
    {
      name: "Modal surface",
      bg: light(applePrimitives.backgrounds.base.bg3),
      shadow: applePrimitives.shadows.lg.light,
    },
  ];
  return (
    <Row>
      {tiers.map((t) => (
        <Figure key={t.name} label={t.name}>
          <div
            style={{
              height: 120,
              borderRadius: 14,
              background: t.bg,
              boxShadow: t.shadow,
              border: "1px solid rgb(0 0 0 / 0.06)",
            }}
          />
        </Figure>
      ))}
    </Row>
  );
};

/** The 12 Apple system accent hues as large equal swatches (light values). */
export const SystemAccents = () => (
  <SwatchGrid
    min={84}
    items={Object.entries(applePrimitives.systemColors).map(([name, v]) => ({
      color: light(v.default),
      label: name[0].toUpperCase() + name.slice(1),
      sub: light(v.default),
    }))}
  />
);

/** Accent applied to real interface roles. */
export const AccentInUse = () => {
  const blue = light(applePrimitives.systemColors.blue.default);
  const items: { label: string; node: ReactNode }[] = [
    {
      label: "Button",
      node: (
        <span
          style={{
            background: blue,
            color: "#fff",
            padding: "8px 16px",
            borderRadius: 10,
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          Continue
        </span>
      ),
    },
    {
      label: "Link",
      node: <span style={{ color: blue, fontSize: 14, fontWeight: 500 }}>View details →</span>,
    },
    {
      label: "Badge",
      node: (
        <span
          style={{
            background: blue,
            color: "#fff",
            borderRadius: 999,
            fontSize: 12,
            fontWeight: 700,
            padding: "2px 9px",
          }}
        >
          12
        </span>
      ),
    },
    {
      label: "Focus ring",
      node: (
        <span
          style={{
            padding: "7px 14px",
            borderRadius: 10,
            background: "var(--color-bg-elevated)",
            border: "1px solid var(--color-separator)",
            outline: `3px solid color-mix(in srgb, ${blue} 45%, transparent)`,
            fontSize: 14,
          }}
        >
          Input
        </span>
      ),
    },
    {
      label: "Selected nav item",
      node: (
        <span
          style={{
            background: `color-mix(in srgb, ${blue} 15%, transparent)`,
            color: blue,
            padding: "7px 14px",
            borderRadius: 10,
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          Inbox
        </span>
      ),
    },
  ];
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 20, alignItems: "center" }}>
      {items.map((it) => (
        <div key={it.label} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ minHeight: 40, display: "flex", alignItems: "center" }}>{it.node}</div>
          <span style={caption}>{it.label}</span>
        </div>
      ))}
    </div>
  );
};

/** Four glass materials over a colourful blurred field. */
export const MaterialsDemo = () => {
  const tiers = ["ultraThin", "thin", "regular", "thick"] as const;
  const labels = { ultraThin: "Ultra Thin", thin: "Thin", regular: "Regular", thick: "Thick" };
  return (
    <div
      style={{
        position: "relative",
        borderRadius: 18,
        overflow: "hidden",
        padding: 24,
        background:
          "radial-gradient(circle at 15% 20%, var(--sys-pink), transparent 45%)," +
          "radial-gradient(circle at 85% 25%, var(--sys-blue), transparent 50%)," +
          "radial-gradient(circle at 50% 90%, var(--sys-green), transparent 55%)," +
          "linear-gradient(120deg, var(--sys-orange), var(--sys-purple))",
      }}
    >
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
        {tiers.map((t) => (
          <div
            key={t}
            style={{
              flex: "1 1 120px",
              minHeight: 130,
              borderRadius: 16,
              padding: "14px 16px",
              display: "flex",
              alignItems: "flex-end",
              color: "#fff",
              fontSize: 13,
              fontWeight: 600,
              textShadow: "0 1px 2px rgb(0 0 0 / 0.35)",
              background: light(applePrimitives.materials[t]),
              backdropFilter: "blur(18px) saturate(1.4)",
              WebkitBackdropFilter: "blur(18px) saturate(1.4)",
              border: `1px solid ${applePrimitives.materials.border.light}`,
            }}
          >
            {labels[t]}
          </div>
        ))}
      </div>
    </div>
  );
};

/** Default vs. increased-contrast appearance of the same card (light values). */
export const AccessibilityDemo = () => {
  const card = (variant: "default" | "contrast") => {
    const sc = applePrimitives.systemColors;
    const blue = sc.blue[variant].light;
    const label = variant === "default" ? "rgb(0 0 0 / 0.55)" : "rgb(0 0 0)";
    const sep =
      variant === "default"
        ? applePrimitives.separators.separator.light
        : applePrimitives.separators.separatorOpaque.light;
    return (
      <Figure label={variant === "default" ? "Default contrast" : "Increased contrast"}>
        <div
          style={{
            background: light(applePrimitives.backgrounds.base.bg1),
            borderRadius: 14,
            border: "1px solid rgb(0 0 0 / 0.06)",
            padding: 16,
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <div style={{ color: "rgb(0 0 0)", fontWeight: 600, fontSize: 14 }}>Notifications</div>
          <div style={{ color: label, fontSize: 13 }}>Secondary label text</div>
          <div style={{ height: 1, background: sep }} />
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <span
              style={{
                background: blue,
                color: "#fff",
                padding: "6px 14px",
                borderRadius: 9,
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              Enable
            </span>
            <span style={{ color: blue, fontSize: 13, fontWeight: 600 }}>Not now</span>
          </div>
        </div>
      </Figure>
    );
  };
  return (
    <Row>
      {card("default")}
      {card("contrast")}
    </Row>
  );
};

/* ------------------------------------------------------------------ */
/* 4 · Generative — neutral & accent scales                            */
/* ------------------------------------------------------------------ */

export const NeutralRamp = ({ neutralH = SEEDS.neutralH }: { neutralH?: number }) => (
  <SwatchStrip colors={oklchGenerativeScales.neutral.map((r) => neutralColor(r, neutralH))} />
);

export const AccentRamp = ({
  hue = SEEDS.accentH,
  chroma = SEEDS.accentC,
}: {
  hue?: number;
  chroma?: number;
}) => <SwatchStrip colors={oklchGenerativeScales.accent.map((r) => accentColor(r, hue, chroma))} />;

export const NeutralSwatches = () => (
  <SwatchStrip
    colors={(["gray6", "gray5", "gray4", "gray3", "gray2", "gray"] as const).map((gray) =>
      light(applePrimitives.systemGrays[gray].default),
    )}
  />
);

export const AccentSwatches = () => (
  <SwatchStrip colors={Object.values(applePrimitives.systemColors).map((color) => light(color.default))} />
);

/* ------------------------------------------------------------------ */
/* 5 · Seed-driven control cards                                       */
/* ------------------------------------------------------------------ */

const hueWheelGradient = `linear-gradient(90deg,
  oklch(0.7 0.16 0), oklch(0.7 0.16 60), oklch(0.7 0.16 120),
  oklch(0.7 0.16 180), oklch(0.7 0.16 240), oklch(0.7 0.16 300), oklch(0.7 0.16 360))`;

const ControlCard = ({
  title,
  value,
  blurb,
  children,
}: {
  title: string;
  value: string;
  blurb: string;
  children: ReactNode;
}) => (
  <div style={{ ...surface, flex: "1 1 200px", padding: 16, background: "var(--color-bg-elevated)" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
      <span style={{ fontSize: 13, fontWeight: 600, color: "var(--color-fg)" }}>{title}</span>
      <code style={{ ...mono, fontSize: 12, color: "var(--color-accent)" }}>{value}</code>
    </div>
    <div style={{ margin: "12px 0" }}>{children}</div>
    <p style={{ ...caption, margin: 0 }}>{blurb}</p>
  </div>
);

const marker = (left: string): CSSProperties => ({
  position: "absolute",
  top: -3,
  bottom: -3,
  left,
  width: 3,
  borderRadius: 3,
  background: "var(--color-fg)",
  boxShadow: "0 0 0 2px var(--color-bg-elevated)",
});

/** Three cards visualising what each seed controls, rather than the raw number. */
export const SeedControls = () => (
  <Row>
    <ControlCard
      title="Neutral Hue"
      value={`${SEEDS.neutralH}°`}
      blurb="The temperature of every gray — surfaces, borders, and text lean cool or warm together."
    >
      <div style={{ position: "relative", height: 28, borderRadius: 8, background: hueWheelGradient }}>
        <span style={marker(`${(SEEDS.neutralH / 360) * 100}%`)} />
      </div>
    </ControlCard>
    <ControlCard
      title="Accent Hue"
      value={`${SEEDS.accentH}°`}
      blurb="The colour family of every interactive element — buttons, links, focus, charts."
    >
      <div style={{ position: "relative", height: 28, borderRadius: 8, background: hueWheelGradient }}>
        <span style={marker(`${(SEEDS.accentH / 360) * 100}%`)} />
      </div>
    </ControlCard>
    <ControlCard
      title="Accent Chroma"
      value={`${SEEDS.accentC}`}
      blurb="How muted or vivid the accent reads — the dial between enterprise calm and consumer punch."
    >
      <div
        style={{
          position: "relative",
          height: 28,
          borderRadius: 8,
          background: `linear-gradient(90deg, oklch(0.61 0 ${SEEDS.accentH}), oklch(0.61 0.32 ${SEEDS.accentH}))`,
        }}
      >
        <span style={marker(`${(SEEDS.accentC / 0.32) * 100}%`)} />
      </div>
    </ControlCard>
  </Row>
);

/* ------------------------------------------------------------------ */
/* 6 · Lightness — hierarchy through brightness                        */
/* ------------------------------------------------------------------ */

/** Six stacked cards descending from Background to Near Black. */
export const LightnessStack = () => {
  const steps = [
    { name: "Background", rung: 50 },
    { name: "Container", rung: 100 },
    { name: "Card", rung: 200 },
    { name: "Control", rung: 400 },
    { name: "Heading", rung: 700 },
    { name: "Near Black", rung: 1000 },
  ];
  const byRung = (r: number) => oklchGenerativeScales.neutral.find((n) => n.rung === r)!;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, maxWidth: 440 }}>
      {steps.map((s) => {
        const rung = byRung(s.rung);
        const bg = neutralColor(rung);
        const fg = rung.lightness > 0.6 ? "oklch(0.2 0 0)" : "oklch(0.98 0 0)";
        return (
          <div
            key={s.name}
            style={{
              background: bg,
              color: fg,
              borderRadius: 10,
              padding: "12px 16px",
              display: "flex",
              justifyContent: "space-between",
              fontSize: 13,
              fontWeight: 600,
              border: "1px solid var(--color-separator)",
            }}
          >
            <span>{s.name}</span>
            <span style={{ ...mono, fontWeight: 400, opacity: 0.7 }}>Neutral {s.rung}</span>
          </div>
        );
      })}
    </div>
  );
};

/** A mock app whose panes are separated only by lightness. */
export const MockApp = () => {
  const n = (r: number) => neutralColor(oklchGenerativeScales.neutral.find((x) => x.rung === r)!);
  return (
    <div
      style={{
        position: "relative",
        background: n(50),
        borderRadius: 16,
        padding: 16,
        border: "1px solid var(--color-separator)",
        minHeight: 240,
      }}
    >
      <span style={{ position: "absolute", top: 8, right: 12, ...caption }}>Canvas</span>
      <div style={{ display: "flex", gap: 12, height: "100%" }}>
        <aside
          style={{
            width: 120,
            background: n(100),
            borderRadius: 12,
            padding: 12,
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <span style={{ ...caption, fontSize: 10 }}>Sidebar</span>
          {["Inbox", "Drafts", "Sent"].map((t) => (
            <div key={t} style={{ height: 10, borderRadius: 4, background: n(200) }} />
          ))}
        </aside>
        <main style={{ flex: 1, position: "relative" }}>
          <div
            style={{
              background: "oklch(0.99 0.003 248)",
              borderRadius: 12,
              padding: 16,
              boxShadow: applePrimitives.shadows.sm.light,
              minHeight: 150,
            }}
          >
            <span style={{ ...caption, fontSize: 10 }}>Card</span>
            <div style={{ height: 12, width: "60%", borderRadius: 4, background: n(200), margin: "10px 0" }} />
            <div style={{ height: 8, width: "90%", borderRadius: 4, background: n(100), marginBottom: 6 }} />
            <div style={{ height: 8, width: "75%", borderRadius: 4, background: n(100) }} />
          </div>
          <div
            style={{
              position: "absolute",
              right: 8,
              bottom: 8,
              background: "oklch(0.99 0.003 248)",
              borderRadius: 12,
              padding: "10px 14px",
              boxShadow: applePrimitives.shadows.lg.light,
              fontSize: 12,
              color: "oklch(0.2 0 0)",
            }}
          >
            Modal
          </div>
          <div
            style={{
              position: "absolute",
              left: 24,
              top: 8,
              background: neutralColor(oklchGenerativeScales.neutral.find((x) => x.rung === 900)!),
              color: "oklch(0.98 0 0)",
              borderRadius: 8,
              padding: "4px 10px",
              fontSize: 11,
            }}
          >
            Tooltip
          </div>
        </main>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* 7 · Chroma — intensity / personality                                */
/* ------------------------------------------------------------------ */

const ChromaCard = ({ chroma }: { chroma: number }) => {
  const a = (rung: number, c = chroma) =>
    accentColor(oklchGenerativeScales.accent.find((x) => x.rung === rung)!, SEEDS.accentH, c);
  return (
    <div
      style={{
        background: a(50),
        borderRadius: 14,
        padding: 14,
        border: "1px solid var(--color-separator)",
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <div style={{ height: 10, width: "55%", borderRadius: 4, background: a(600) }} />
      <div style={{ height: 8, width: "85%", borderRadius: 4, background: a(200) }} />
      <span
        style={{
          alignSelf: "flex-start",
          background: a(600),
          color: "#fff",
          fontSize: 12,
          fontWeight: 600,
          padding: "6px 14px",
          borderRadius: 9,
        }}
      >
        Action
      </span>
    </div>
  );
};

/** The same layout at muted / balanced / vibrant chroma. */
export const ChromaVariants = () => (
  <Row>
    <Figure label="Muted · enterprise">
      <ChromaCard chroma={0.05} />
    </Figure>
    <Figure label="Balanced · default">
      <ChromaCard chroma={0.16} />
    </Figure>
    <Figure label="Vibrant · expressive">
      <ChromaCard chroma={0.27} />
    </Figure>
  </Row>
);

/* ------------------------------------------------------------------ */
/* 8 · Hue — one engine, many families                                 */
/* ------------------------------------------------------------------ */

/** The identical accent scale logic rendered across six hues. */
export const HueFamilies = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
    {ACCENT_HUES.map((f) => (
      <div key={f.name} style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ width: 64, fontSize: 12, fontWeight: 600, color: "var(--color-fg)" }}>
          {f.name}
        </span>
        <div style={{ flex: 1 }}>
          <SwatchStrip
            height={32}
            colors={oklchGenerativeScales.accent.map((r) => accentColor(r, f.hue))}
          />
        </div>
      </div>
    ))}
  </div>
);

/* ------------------------------------------------------------------ */
/* 9 · Surface & typography hierarchy from the neutral scale           */
/* ------------------------------------------------------------------ */

export const SurfaceHierarchy = () => {
  const tiers = [
    { name: "App Background", rung: 50 },
    { name: "Grouped Background", rung: 100 },
    { name: "Card", rung: 0 },
    { name: "Elevated Card", rung: 0 },
    { name: "Popover", rung: 0 },
    { name: "Modal", rung: 0 },
  ];
  const byRung = (r: number) => oklchGenerativeScales.neutral.find((x) => x.rung === r)!;
  return (
    <SwatchGrid
      items={tiers.map((t, i) => ({
        color: neutralColor(byRung(t.rung)),
        label: t.name,
        sub: i >= 2 ? "Neutral 0 + shadow" : `Neutral ${t.rung}`,
      }))}
    />
  );
};

export const TypographyHierarchy = () => {
  const rows = [
    { name: "Display Title", rung: 1000, size: 22, weight: 700 },
    { name: "Heading", rung: 900, size: 17, weight: 600 },
    { name: "Body", rung: 800, size: 15, weight: 400 },
    { name: "Secondary Text", rung: 500, size: 14, weight: 400 },
    { name: "Disabled Text", rung: 300, size: 14, weight: 400 },
  ];
  const byRung = (r: number) => oklchGenerativeScales.neutral.find((x) => x.rung === r)!;
  return (
    <div
      style={{
        background: "oklch(0.99 0.003 248)",
        borderRadius: 14,
        border: "1px solid var(--color-separator)",
        padding: 20,
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      {rows.map((r) => (
        <div
          key={r.name}
          style={{ color: neutralColor(byRung(r.rung)), fontSize: r.size, fontWeight: r.weight }}
        >
          {r.name}
        </div>
      ))}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* 10 · Perceptual behaviour charts                                    */
/* ------------------------------------------------------------------ */

/** A small SVG line+area chart over a list of values. */
export const Curve = ({
  values,
  stroke = "var(--color-accent)",
  fill = "color-mix(in srgb, var(--color-accent) 18%, transparent)",
  height = 120,
}: {
  values: number[];
  stroke?: string;
  fill?: string;
  height?: number;
}) => {
  const W = 320;
  const H = 100;
  const pad = 8;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const span = max - min || 1;
  const pts = values.map((v, i) => {
    const x = pad + (i / (values.length - 1)) * (W - pad * 2);
    const y = H - pad - ((v - min) / span) * (H - pad * 2);
    return [x, y] as const;
  });
  const line = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const area = `${line} L${pts[pts.length - 1][0].toFixed(1)} ${H - pad} L${pts[0][0].toFixed(1)} ${H - pad} Z`;
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      style={{ width: "100%", maxWidth: 420, height, display: "block" }}
      role="img"
    >
      <path d={area} fill={fill} />
      <path d={line} fill="none" stroke={stroke} strokeWidth={2.5} strokeLinejoin="round" />
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={2.8} fill={stroke} />
      ))}
    </svg>
  );
};

/** Chroma peaks mid-scale and falls toward both ends. */
export const NeutralChromaCurve = () => (
  <Curve values={oklchGenerativeScales.neutral.map((r) => r.chroma as number)} />
);

/** Two neutral ramps: flat gray vs. hue-drifted cool gray. */
export const HueDriftCompare = () => (
  <Row>
    <Figure label="Without hue drift — flat gray">
      <SwatchStrip
        colors={oklchGenerativeScales.neutral.map((r) => `oklch(${r.lightness} 0 0)`)}
      />
    </Figure>
    <Figure label="With hue drift — cool, Apple-inspired gray">
      <SwatchStrip colors={oklchGenerativeScales.neutral.map((r) => neutralColor(r))} />
    </Figure>
  </Row>
);

/** Accent chroma bell curve — richer before darker. */
export const AccentChromaCurve = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 420 }}>
    <Curve values={oklchGenerativeScales.accent.map((r) => resolveChroma(r.chroma))} />
    <AccentRamp />
  </div>
);

/** Accent 100 / 500 / 950 — hue drifting cyan-blue → indigo-blue. */
export const AccentHueDrift = () => {
  const rungs = [100, 500, 950];
  return (
    <Row>
      {rungs.map((rg) => {
        const r = oklchGenerativeScales.accent.find((x) => x.rung === rg)!;
        return (
          <Figure key={rg} label={`Accent ${rg} · hue ${SEEDS.accentH + r.hueShift}°`}>
            <div style={{ height: 96, borderRadius: 14, background: accentColor(r) }} />
          </Figure>
        );
      })}
    </Row>
  );
};

/* ------------------------------------------------------------------ */
/* 11 · Theme generation — same UI, different seed                     */
/* ------------------------------------------------------------------ */

/** A compact app screenshot driven entirely by an accent hue. */
export const MiniApp = ({ hue, name }: { hue: number; name: string }) => {
  const a = (rung: number) =>
    accentColor(oklchGenerativeScales.accent.find((x) => x.rung === rung)!, hue);
  const n = (r: number) => neutralColor(oklchGenerativeScales.neutral.find((x) => x.rung === r)!);
  return (
    <Figure label={name}>
      <div
        style={{
          ...surface,
          background: n(50),
          minHeight: 200,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            background: a(500),
            color: "#fff",
            padding: "10px 14px",
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          {name}
        </div>
        <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
          <div style={{ background: n(0), borderRadius: 10, padding: 12, display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ height: 8, width: "70%", borderRadius: 4, background: n(200) }} />
            <div style={{ height: 8, width: "90%", borderRadius: 4, background: n(100) }} />
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span
              style={{
                background: a(600),
                color: "#fff",
                fontSize: 12,
                fontWeight: 600,
                padding: "6px 14px",
                borderRadius: 9,
              }}
            >
              Primary
            </span>
            <span style={{ color: a(600), fontSize: 12, fontWeight: 600 }}>Link</span>
            <span
              style={{
                marginLeft: "auto",
                width: 36,
                height: 20,
                borderRadius: 999,
                background: a(500),
                position: "relative",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  right: 2,
                  top: 2,
                  width: 16,
                  height: 16,
                  borderRadius: 999,
                  background: "#fff",
                }}
              />
            </span>
          </div>
        </div>
      </div>
    </Figure>
  );
};

export const ThemeGeneration = () => (
  <Row>
    <MiniApp hue={250} name="Blue Theme" />
    <MiniApp hue={150} name="Green Theme" />
    <MiniApp hue={305} name="Purple Theme" />
  </Row>
);

/* ------------------------------------------------------------------ */
/* 12 · Data visualisation                                             */
/* ------------------------------------------------------------------ */

const seriesHues = [250, 150, 55, 305, 350];

/** Line + bar + pie sharing one generated palette. */
export const DataViz = () => {
  const c = (hue: number, rung = 500) =>
    accentColor(oklchGenerativeScales.accent.find((x) => x.rung === rung)!, hue);

  const lineData = [
    [20, 40, 30, 55, 50, 70],
    [10, 25, 35, 30, 45, 60],
    [35, 30, 50, 45, 65, 55],
  ];
  const W = 220;
  const H = 110;
  const toLine = (vals: number[]) =>
    vals
      .map((v, i) => `${i ? "L" : "M"}${(i / (vals.length - 1)) * W} ${H - (v / 80) * H}`)
      .join(" ");

  const bars = [60, 40, 75, 30, 55];

  const pie = [35, 25, 20, 12, 8];
  const total = pie.reduce((a, b) => a + b, 0);
  let acc = 0;
  const arcs = pie.map((v, i) => {
    const a0 = (acc / total) * Math.PI * 2 - Math.PI / 2;
    acc += v;
    const a1 = (acc / total) * Math.PI * 2 - Math.PI / 2;
    const large = a1 - a0 > Math.PI ? 1 : 0;
    const x0 = 55 + 50 * Math.cos(a0);
    const y0 = 55 + 50 * Math.sin(a0);
    const x1 = 55 + 50 * Math.cos(a1);
    const y1 = 55 + 50 * Math.sin(a1);
    return { d: `M55 55 L${x0.toFixed(1)} ${y0.toFixed(1)} A50 50 0 ${large} 1 ${x1.toFixed(1)} ${y1.toFixed(1)} Z`, hue: seriesHues[i] };
  });

  return (
    <Row>
      <Figure label="Line chart">
        <div style={{ ...surface, padding: 14 }}>
          <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%" }} role="img">
            {lineData.map((vals, i) => (
              <path key={i} d={toLine(vals)} fill="none" stroke={c(seriesHues[i])} strokeWidth={2.5} strokeLinejoin="round" />
            ))}
          </svg>
        </div>
      </Figure>
      <Figure label="Bar chart">
        <div style={{ ...surface, padding: 14 }}>
          <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%" }} role="img">
            {bars.map((v, i) => {
              const bw = W / bars.length - 8;
              const x = i * (W / bars.length) + 4;
              const h = (v / 80) * H;
              return <rect key={i} x={x} y={H - h} width={bw} height={h} rx={4} fill={c(seriesHues[i])} />;
            })}
          </svg>
        </div>
      </Figure>
      <Figure label="Pie chart">
        <div style={{ ...surface, padding: 14, display: "grid", placeItems: "center" }}>
          <svg viewBox="0 0 110 110" style={{ width: "100%", maxWidth: 130 }} role="img">
            {arcs.map((a, i) => (
              <path key={i} d={a.d} fill={c(a.hue)} />
            ))}
          </svg>
        </div>
      </Figure>
    </Row>
  );
};

/** Five chart-safe families stacked — every one obeys the same perceptual rules. */
export const DataVizRamps = () => {
  const names = ["Blue", "Green", "Orange", "Purple", "Pink"];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {seriesHues.map((hue, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ width: 56, fontSize: 12, fontWeight: 600, color: "var(--color-fg)" }}>
            {names[i]}
          </span>
          <div style={{ flex: 1 }}>
            <SwatchStrip height={28} colors={oklchGenerativeScales.accent.map((r) => accentColor(r, hue))} />
          </div>
        </div>
      ))}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* 13 · Future systems & architectural benefits                        */
/* ------------------------------------------------------------------ */

export const FutureSystems = () => {
  const systems = [
    { name: "Apple Inspired", neutralH: 250, accentH: 250, accentC: 0.16 },
    { name: "Material Inspired", neutralH: 270, accentH: 265, accentC: 0.2 },
    { name: "Enterprise", neutralH: 230, accentH: 235, accentC: 0.07 },
    { name: "Brand System", neutralH: 320, accentH: 330, accentC: 0.26 },
  ];
  return (
    <Row>
      {systems.map((s) => (
        <Figure key={s.name} label={s.name}>
          <div style={{ ...surface, padding: 12, display: "flex", flexDirection: "column", gap: 8 }}>
            <SwatchStrip
              height={22}
              colors={oklchGenerativeScales.neutral.map((r) => neutralColor(r, s.neutralH))}
            />
            <SwatchStrip
              height={22}
              colors={oklchGenerativeScales.accent.map((r) => accentColor(r, s.accentH, s.accentC))}
            />
          </div>
        </Figure>
      ))}
    </Row>
  );
};

export const BenefitCards = () => {
  const benefits = [
    { title: "Small Configuration Surface", body: "Generate entire themes from a handful of inputs." },
    { title: "Perceptual Balance", body: "Colors behave consistently because they are generated in OKLCH." },
    { title: "Themeable", body: "Support multiple visual identities without rewriting components." },
    { title: "Accessible", body: "Contrast and appearance systems compose naturally." },
    { title: "Composable", body: "Semantic roles stay independent from palette generation." },
    { title: "Future-Proof", body: "One engine drives semantic colors, charts, dark mode, and a11y variants." },
  ];
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: 12,
      }}
    >
      {benefits.map((b) => (
        <div key={b.title} style={{ ...surface, padding: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: "var(--color-fg)", marginBottom: 6 }}>
            {b.title}
          </div>
          <p style={{ ...caption, margin: 0 }}>{b.body}</p>
        </div>
      ))}
    </div>
  );
};
