import type { Meta, StoryObj } from "@storybook/react-vite";
import { Grid, Stack, Surface } from "@/primitives";
import { EnvironmentProvider } from "./EnvironmentProvider";
import { useEnvironment } from "./use-environment";

const meta: Meta = {
  title: "Environments/EnvironmentEngine",
  decorators: [
    (Story) => (
      <EnvironmentProvider>
        <Story />
      </EnvironmentProvider>
    ),
  ],
  tags: ["experimental"],
};
export default meta;

function EngineConsole() {
  const env = useEnvironment();

  return (
    <Surface
      level={1}
      className="p-[var(--space-6)] rounded-[var(--radius-layer-4)] max-w-4xl mx-auto"
    >
      <Stack gap="space-4">
        <Stack gap="space-1">
          <h2 className="text-xl font-bold text-fg">Environment Engine Console</h2>
          <p className="text-sm text-fg-muted">
            Real-time resolved EnvironmentProfile facts, capabilities, and device attributes.
          </p>
        </Stack>

        <Grid cols={3} gap="space-4">
          {/* Platform Classifications */}
          <Surface
            level={2}
            className="p-[var(--space-4)] rounded-[var(--radius-layer-5)] border border-separator"
          >
            <Stack gap="space-3">
              <h3 className="text-base font-semibold text-accent">Platform</h3>
              <Stack gap="space-2">
                <div>
                  <span className="block text-xs text-fg-muted uppercase tracking-wider">
                    DEVICE TYPE
                  </span>
                  <span className="text-sm font-medium text-fg">{env.device}</span>
                </div>
                <div>
                  <span className="block text-xs text-fg-muted uppercase tracking-wider">
                    VIEWPORT CLASS
                  </span>
                  <span className="text-sm font-medium text-fg">{env.viewport}</span>
                </div>
                <div>
                  <span className="block text-xs text-fg-muted uppercase tracking-wider">
                    ORIENTATION
                  </span>
                  <span className="text-sm font-medium text-fg">{env.orientation}</span>
                </div>
              </Stack>
            </Stack>
          </Surface>

          {/* Input & Primary */}
          <Surface
            level={2}
            className="p-[var(--space-4)] rounded-[var(--radius-layer-5)] border border-separator"
          >
            <Stack gap="space-3">
              <h3 className="text-base font-semibold text-accent">Input & Primary</h3>
              <Stack gap="space-2">
                <div>
                  <span className="block text-xs text-fg-muted uppercase tracking-wider">
                    PRIMARY INPUT
                  </span>
                  <span className="text-sm font-medium text-fg">{env.input.primary}</span>
                </div>
                <div className="flex gap-2">
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-semibold ${env.input.touch ? "bg-success/20 text-success" : "bg-bg-sunken text-fg-muted"}`}
                  >
                    Touch
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-semibold ${env.input.hover ? "bg-success/20 text-success" : "bg-bg-sunken text-fg-muted"}`}
                  >
                    Hover
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-semibold ${env.input.finePointer ? "bg-success/20 text-success" : "bg-bg-sunken text-fg-muted"}`}
                  >
                    Fine
                  </span>
                </div>
              </Stack>
            </Stack>
          </Surface>

          {/* Launch Context */}
          <Surface
            level={2}
            className="p-[var(--space-4)] rounded-[var(--radius-layer-5)] border border-separator"
          >
            <Stack gap="space-3">
              <h3 className="text-base font-semibold text-accent">Launch & PWA</h3>
              <Stack gap="space-2">
                <div>
                  <span className="block text-xs text-fg-muted uppercase tracking-wider">
                    LAUNCH MODE
                  </span>
                  <span className="text-sm font-medium text-fg">{env.launch.mode}</span>
                </div>
                <div>
                  <span className="block text-xs text-fg-muted uppercase tracking-wider">
                    DISPLAY MODE
                  </span>
                  <span className="text-sm font-medium text-fg">{env.launch.displayMode}</span>
                </div>
                <div>
                  <span className="block text-xs text-fg-muted uppercase tracking-wider">
                    WINDOW MODE
                  </span>
                  <span className="text-sm font-medium text-fg">
                    {env.capabilities.windowingMode}
                  </span>
                </div>
              </Stack>
            </Stack>
          </Surface>
        </Grid>

        {/* Layout Decisions & Navigation Insets */}
        <Grid cols={2} gap="space-4">
          <Surface
            level={2}
            className="p-[var(--space-4)] rounded-[var(--radius-layer-5)] border border-separator"
          >
            <Stack gap="space-3">
              <h3 className="text-base font-semibold text-accent">Layout Intent Resolutions</h3>
              <table className="w-full text-sm border-collapse text-left">
                <tbody>
                  <tr className="border-b border-separator">
                    <th className="py-1 text-fg-muted font-normal">Layout Mode</th>
                    <td className="py-1 font-semibold">{env.layout.mode}</td>
                  </tr>
                  <tr className="border-b border-separator">
                    <th className="py-1 text-fg-muted font-normal">Density</th>
                    <td className="py-1 font-semibold">{env.layout.density}</td>
                  </tr>
                  <tr className="border-b border-separator">
                    <th className="py-1 text-fg-muted font-normal">Sidebar Mode</th>
                    <td className="py-1 font-semibold">{env.layout.sidebar}</td>
                  </tr>
                  <tr className="border-b border-separator">
                    <th className="py-1 text-fg-muted font-normal">List View</th>
                    <td className="py-1 font-semibold">{env.layout.list}</td>
                  </tr>
                  <tr className="border-b border-separator">
                    <th className="py-1 text-fg-muted font-normal">Content Mode</th>
                    <td className="py-1 font-semibold">{env.layout.content}</td>
                  </tr>
                  <tr>
                    <th className="py-1 text-fg-muted font-normal">Inspector Mode</th>
                    <td className="py-1 font-semibold">{env.layout.inspector}</td>
                  </tr>
                </tbody>
              </table>
            </Stack>
          </Surface>

          <Surface
            level={2}
            className="p-[var(--space-4)] rounded-[var(--radius-layer-5)] border border-separator"
          >
            <Stack gap="space-3">
              <h3 className="text-base font-semibold text-accent">Navigation & Insets</h3>
              <table className="w-full text-sm border-collapse text-left">
                <tbody>
                  <tr className="border-b border-separator">
                    <th className="py-1 text-fg-muted font-normal">Nav Mode</th>
                    <td className="py-1 font-semibold">{env.navigation.mode}</td>
                  </tr>
                  <tr className="border-b border-separator">
                    <th className="py-1 text-fg-muted font-normal">Transition</th>
                    <td className="py-1 font-semibold">{env.navigation.transition}</td>
                  </tr>
                  <tr className="border-b border-separator">
                    <th className="py-1 text-fg-muted font-normal">Back Behavior</th>
                    <td className="py-1 font-semibold">{env.navigation.backBehavior}</td>
                  </tr>
                  <tr className="border-b border-separator">
                    <th className="py-1 text-fg-muted font-normal">Gesture Owner</th>
                    <td className="py-1 font-semibold">{env.navigation.gestureOwner}</td>
                  </tr>
                  <tr className="border-b border-separator">
                    <th className="py-1 text-fg-muted font-normal">Safe Area Insets</th>
                    <td className="py-1 font-semibold">
                      T:{env.surface.safeArea.top}px B:{env.surface.safeArea.bottom}px L:
                      {env.surface.safeArea.left}px R:{env.surface.safeArea.right}px
                    </td>
                  </tr>
                  <tr>
                    <th className="py-1 text-fg-muted font-normal">Soft Keyboard</th>
                    <td className="py-1 font-semibold">
                      {env.surface.keyboard.visible
                        ? `Height: ${env.surface.keyboard.height}px`
                        : "Closed"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </Stack>
          </Surface>
        </Grid>

        {/* API Capabilities list */}
        <Surface
          level={2}
          className="p-[var(--space-4)] rounded-[var(--radius-layer-5)] border border-separator"
        >
          <Stack gap="space-3">
            <h3 className="text-base font-semibold text-accent">
              Raw Web Capabilities & API Support
            </h3>
            <div className="flex flex-wrap gap-2">
              <CapabilityTag label="ServiceWorker" supported={env.capabilities.serviceWorker} />
              <CapabilityTag label="OfflineCache" supported={env.capabilities.offlineCache} />
              <CapabilityTag label="PushAPI" supported={env.capabilities.push} />
              <CapabilityTag label="Notifications" supported={env.capabilities.notifications} />
              <CapabilityTag label="Clipboard" supported={env.capabilities.clipboard} />
              <CapabilityTag label="WebShare" supported={env.capabilities.canShare} />
              <CapabilityTag
                label="WebKit Bridge"
                supported={env.capabilities.bridgeType === "webkit"}
              />
            </div>
          </Stack>
        </Surface>
      </Stack>
    </Surface>
  );
}

interface CapabilityTagProps {
  label: string;
  supported: boolean;
}

function CapabilityTag({ label, supported }: CapabilityTagProps) {
  return (
    <span
      className={`px-2.5 py-1 rounded text-xs font-semibold border ${supported ? "bg-success/15 border-success/35 text-success" : "bg-bg-sunken border-separator text-fg-muted"}`}
    >
      {label}: {supported ? "SUPPORTED" : "UNAVAILABLE"}
    </span>
  );
}

export const Console: StoryObj = {
  render: () => <EngineConsole />,
};
