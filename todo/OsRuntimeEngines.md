# OS-Level Runtime — `engines/` layer, coordination & the engine contract (EPIC)

| | |
|---|---|
| **Project** | Evolve the design system from a component library into an OS-style runtime: a dedicated `engines/` layer (Navigation, Gesture, Animation, Asset, Sync, Notification) coordinated by a core (event bus + lifecycle + perf), generalizing the Environment Engine pattern |
| **Owner** | ? |
| **Status** | **Backlog — do not start until the main folder/refactor migration lands** |
| **Priority** | Low now, High after migration. Single bundled epic, expected to iterate over several rounds |
| **Type** | Architecture epic / decision register (NOT a ready-to-implement spec) |
| **Target layer** | new `src/engines/` (absorbs [src/environments](/Users/kwaight/src/ai-conversations/web/src/environments)) |
| **Parent initiatives** | [DesignSystemFolderRefactor.md](/Users/kwaight/src/ai-conversations/web/todo/DesignSystemFolderRefactor.md), [EnvironmentEngine.md](/Users/kwaight/src/ai-conversations/web/todo/EnvironmentEngine.md) |
| **Related** | [ArchitecturalBoundaryEnforcement.md](/Users/kwaight/src/ai-conversations/web/todo/ArchitecturalBoundaryEnforcement.md), [FirstPaintStability.md](/Users/kwaight/src/ai-conversations/web/todo/FirstPaintStability.md), the lab motion track ([todo/lab/_Index.md](/Users/kwaight/src/ai-conversations/web/todo/lab/_Index.md)) |
| **Note** | Source: OS-runtime proposal. Deliberately kept as ONE ticket because almost every part is a decision, and the decisions are interdependent — splitting prematurely would lock in answers we haven't debated. Split into per-engine tickets only **after** the decisions in §3 are resolved. |

---

## 1. Executive Summary

The Environment Engine already proves a reusable runtime pattern — **sensors →
pure resolver → reactive store → context hooks** — living in
[src/environments](/Users/kwaight/src/ai-conversations/web/src/environments)
(sensors: capability/device/input/keyboard/launch/safe-area; a resolver; an
rAF-debounced provider; `use-device`/`use-environment` hooks; `profiles/`; and a
partial `pwa/` folder). The proposal is to (a) promote this into a first-class
`engines/` layer, (b) add up to six more engines on the same contract, and (c)
coordinate them with a core event bus + lifecycle + performance manager.

This is the right *direction* but a large surface with many interlocking
decisions. This ticket captures the vision, records what already exists, and —
most importantly — enumerates the **open decisions** to settle before any code.
Treat the engine list and folder layout in the source proposal as a **straw man**,
not an accepted design.

## 2. What we already have (don't rebuild)

- **Environment Engine** — the reference implementation of the engine pattern.
- **Rich sensor set** already covering most "input" needs the Gesture Engine would
  want: `input-sensor` (touch/hover/keyboard/pointer), `capability-sensor`,
  `keyboard-sensor`, `launch-sensor`, `safe-area-sensor`.
- **Navigation signals already exist** on the environment profile:
  `transition: "ios-slide" | "fade-scale" | "none"` and `gestureOwner`
  ([environment.types.ts](/Users/kwaight/src/ai-conversations/web/src/environments/environment.types.ts)).
  A Navigation/Gesture engine would *consume* these, not invent them.
- **PWA scaffolding stubs** already present —
  [pwa/service-worker.ts](/Users/kwaight/src/ai-conversations/web/src/environments/pwa/service-worker.ts),
  [pwa/push.ts](/Users/kwaight/src/ai-conversations/web/src/environments/pwa/push.ts),
  [pwa/cache.ts](/Users/kwaight/src/ai-conversations/web/src/environments/pwa/cache.ts),
  [pwa/manifest.ts](/Users/kwaight/src/ai-conversations/web/src/environments/pwa/manifest.ts)
  (all near-empty). The proposed Sync + Notification engines overlap heavily with
  these — decide whether those engines *are* the matured pwa stubs or something new.
- **Low blast radius for a rename**: only 3 files import `environments/` externally
  (all docs/stories), so relocating to `engines/environment/` is cheap mechanically
  — the cost is conceptual, not refactor volume.

## 3. Open decisions (resolve BEFORE implementation — this is the real work)

> These are interdependent. Expect to revisit them across the "few rounds" of
> iteration after the main migration. Each should end with a recorded decision +
> rationale appended to this file.

### D1 — Scope: is this a *design system* concern at all?
A design system owning **routing, data sync, and notifications** is a strong claim
— those are usually *application* concerns. Decide, per engine, whether it belongs
in this package or in the consuming app:
- Environment, Gesture, Animation → plausibly design-system (presentation/interaction).
- Navigation → borderline (transition orchestration yes; route *definitions* no?).
- Asset → borderline (icon/image loading yes; app data no).
- **Sync, Notification → likely application-level**, not design-system. Strong
  default: descope these to the app, or keep only the thin presentation shell
  (toast/in-app notification UI) here and leave the data/push machinery to the app.

### D2 — Naming & location: `engines/` vs `environments/`
The proposal renames `src/environments/` → `src/engines/environment/`. Decide:
- Do we adopt `engines/` as a new top-level layer, and does Environment move into
  it (and shed its `pwa/` to the relevant new engine)?
- AGENTS.md layer rules + the madge boundary checks
  ([ArchitecturalBoundaryEnforcement.md](/Users/kwaight/src/ai-conversations/web/todo/ArchitecturalBoundaryEnforcement.md))
  must be updated in lockstep — where does `engines/` sit relative to
  foundations/adapters/primitives/components/patterns? (Proposal:
  foundations+adapters → engines → patterns → apps.)

### D3 — The engine contract
The proposed `Engine<TConfig, TState>` interface (lifecycle
`initialize/start/stop/dispose`, `getState/subscribe`, `on/off`, `isHealthy/
getMetrics`) is generic. Decide:
- Is a *uniform* contract worth it, or does it over-abstract engines with very
  different shapes? The current Environment Engine doesn't have async
  `initialize/start/stop` — does forcing that on it add value or ceremony?
- `on/off(event, (...args: any[]))` is untyped — if we adopt an event bus, it
  should be a typed event map, not `any[]`. (Reconcile with D4.)
- Trim the contract to what every engine genuinely shares; let engines extend it.

### D4 — Coordination: event bus vs direct composition
The proposal adds a central event bus + lifecycle + performance manager. Decide:
- Do engines talk via a pub/sub **event bus**, or via **explicit typed
  dependencies** (Navigation imports Animation's API)? An event bus decouples but
  hurts traceability and type-safety; direct composition is the current style and
  is greppable. Lean toward typed direct composition unless N-to-N fan-out
  genuinely emerges.
- If a bus: typed event map (no `any`), and a story for ordering/back-pressure.

### D5 — Performance manager scope
"Adaptive quality / throttle / GPU pool" overlaps with work already ticketed:
[PerformanceBlurAndGpu.md](/Users/kwaight/src/ai-conversations/web/todo/PerformanceBlurAndGpu.md)
and the will-change pattern. Decide whether a central PerformanceManager owns this
or whether it stays per-surface. Avoid building a heavyweight monitor that itself
costs frames.

### D6 — Dependency on the lab motion track
Gesture + Animation engines presuppose decisions still open in
[todo/lab/](/Users/kwaight/src/ai-conversations/web/todo/lab/) (View Transitions,
@use-gesture expansion, morphing engine, etc.). These engines **cannot** be
designed until those adapter choices settle. Sequence accordingly.

### D7 — Documentation standard
The proposal's value-add is Mermaid-documented flows. Decide the doc convention:
each engine ships a `<Engine>.mdx` with (a) a kernel/coordination context diagram,
(b) an internal data-flow diagram, (c) a lifecycle state diagram. Adopt this as a
hard requirement so the diagrams are part of "done," not an afterthought.

## 4. Critical assessment (so we don't rubber-stamp the proposal)

- **Keep (high confidence):** generalizing the engine pattern; Mermaid flow docs;
  Gesture and Animation engines (they consume signals we already emit and unify
  the lab motion work); promoting Environment to a named layer.
- **Question (medium):** Navigation Engine — valuable for *transition
  orchestration*, but route definitions/deep-linking may belong to the app. Scope
  it to transitions + back-gesture coordination, not full routing, unless we ship
  apps from this repo.
- **Probably descope from the design system (low confidence it belongs here):**
  Sync Engine and Notification Engine are app/runtime data concerns. The existing
  `pwa/` stubs suggest we *started* down this road; decide deliberately whether to
  finish it here or hand it to the app. Asset Engine sits between — icon/image
  loading + preloading is reasonable; "offline data management" is not.
- **Avoid premature uniformity:** the `Engine<>` contract and event bus are the
  parts most likely to over-engineer. Adopt them only once ≥3 engines exist and
  the shared surface is observed, not predicted.

## 5. Phasing (iterative — re-evaluate after each round)

This is a *proposed* order, contingent on §3 decisions. The proposal's "core
first" order is risky — building the event bus/contract before any second engine
exists designs the abstraction blind. **Prefer: build one more engine concretely,
then extract the shared contract from two working examples.**

- **Round 0 (this ticket):** resolve D1–D7. Output: decisions appended below + a
  decision on which engines are in-scope. No engine code yet.
- **Round 1:** pick the highest-leverage concrete engine (likely **Gesture** or
  **Animation**, since signals + lab work feed them) and build it *without* the
  generic contract/bus — composed directly with Environment.
- **Round 2:** build a second in-scope engine. Now extract the shared `Engine`
  contract from two real implementations (D3) and decide on coordination (D4).
- **Round 3+:** remaining in-scope engines; introduce event bus/lifecycle/perf
  manager only if Round 2 showed they're needed; relocate Environment into
  `engines/` (D2) and update AGENTS.md + madge rules together.

## 6. Done when (for this epic)

- §3 decisions are recorded below with rationale.
- An agreed, *trimmed* engine roster (which of the 6 we actually build, and where
  Sync/Notification/Asset live) exists.
- The `engines/` layer placement is reflected in AGENTS.md and the boundary checks.
- Per-engine tickets are split out **from the settled decisions**, each with its
  Mermaid doc requirement (D7).

---

## Decision log (append as rounds happen)

- _(empty — to be filled during Round 0 and subsequent iteration)_
