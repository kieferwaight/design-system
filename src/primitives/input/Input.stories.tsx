import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Box } from "../box";
import { Stack } from "../stack";
import { Checkbox } from "./Checkbox";
import { Input } from "./Input";
import { SearchInput } from "./SearchInput";
import { Switch } from "./Switch";

/**
 * Input Primitives — a suite of highly-accessible, standard-calibrated input elements (Text Input, Textarea,
 * iOS-style Search Fields, Toggle Switches, and Checkboxes) built using React Aria Components and styled strictly with design system tokens.
 */
const meta: Meta<typeof Input> = {
  title: "Primitives/Input",
  component: Input,
  tags: ["experimental"],
};
export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    label: "Username",
    placeholder: "Enter your username",
    description: "Must be a unique identifier.",
  },
};

/** Form fields demonstrating standard text states, description text, and validation error messages. */
export const FormTextFields: Story = {
  render: () => (
    <Stack gap="space-4" padding="space-5" bg="sunken" radius="layer-3" className="max-w-sm">
      <Input label="Email Address" type="email" placeholder="kwaight@internal.net" />
      <Input
        label="Password"
        type="password"
        placeholder="••••••••••••"
        description="Password must contain at least 8 characters."
      />
      <Input label="Feedback" multiline rows={4} placeholder="Tell us what you think..." />
      <Input
        label="Phone Number"
        type="tel"
        placeholder="+1 (555) 019-2834"
        isInvalid
        errorMessage="Please enter a valid phone number."
      />
    </Stack>
  ),
};

/** iOS-style Bottom Search inputs with clear buttons and active match result indicators. */
export const SearchInputs: Story = {
  render: () => {
    const [val1, setVal1] = useState("");
    const [val2, setVal2] = useState("kiefer");

    return (
      <Stack gap="space-4" padding="space-5" bg="sunken" radius="layer-3" className="max-w-sm">
        <div>
          <div className="mb-2 text-3xs font-mono text-fg-tertiary">SearchInput size="sm"</div>
          <SearchInput size="sm" value={val1} onChange={setVal1} placeholder="Small Search..." />
        </div>
        <div>
          <div className="mb-2 text-3xs font-mono text-fg-tertiary">
            SearchInput size="md" (Default)
          </div>
          <SearchInput size="md" value={val2} onChange={setVal2} liveCount={2834} />
        </div>
      </Stack>
    );
  },
};

/** iOS-style switches and toggles for single-tap binary state triggers. */
export const ToggleSwitches: Story = {
  render: () => {
    const [selected, setSelected] = useState(true);

    return (
      <Stack gap="space-4" padding="space-5" bg="sunken" radius="layer-3" className="max-w-sm">
        <Switch isSelected={selected} onChange={setSelected}>
          Enable Push Notifications
        </Switch>
        <Switch isSelected={false} isDisabled>
          Bluetooth Connection (Offline)
        </Switch>
      </Stack>
    );
  },
};

/** Accessible custom-calibrated checkbox states (unchecked, selected, indeterminate). */
export const CheckboxStates: Story = {
  render: () => (
    <Stack gap="space-4" padding="space-5" bg="sunken" radius="layer-3" className="max-w-sm">
      <Checkbox>Accept Terms & Conditions</Checkbox>
      <Checkbox defaultSelected>Remember Me on this device</Checkbox>
      <Checkbox isIndeterminate>Select All Conversations</Checkbox>
      <Checkbox isDisabled>Opt-out of marketing emails</Checkbox>
    </Stack>
  ),
};

/** Complete iOS PWA form mockup combining all input primitives into a single settings view. */
export const PwaSettingsForm: Story = {
  render: () => {
    const [search, setSearch] = useState("");
    const [sync, setSync] = useState(true);
    const [backup, setBackup] = useState(false);

    return (
      <Box padding="space-4" bg="elevated" radius="layer-3" border className="max-w-sm shadow-md">
        <Stack gap="space-5">
          <Stack gap="space-2">
            <h3 className="text-base font-bold text-fg">Account Settings</h3>
            <span className="text-xs text-fg-secondary">
              Configure your local device sync environment.
            </span>
          </Stack>

          <SearchInput value={search} onChange={setSearch} placeholder="Filter settings..." />

          <Stack gap="space-3" border="top" className="pt-4">
            <Input label="Display Name" placeholder="Kiefer Waight" />
            <Input label="Endpoint Target" placeholder="https://data-portal.tailscale.net" />
          </Stack>

          <Stack gap="space-4" border="top" className="pt-4">
            <Switch isSelected={sync} onChange={setSync}>
              Automatic Cloud Sync
            </Switch>
            <Switch isSelected={backup} onChange={setBackup}>
              Perform Nightly Backup
            </Switch>
          </Stack>

          <Stack gap="space-3" border="top" className="pt-4">
            <Checkbox defaultSelected>Enforce safe search classifications</Checkbox>
            <Checkbox>Include attachments in local cache</Checkbox>
          </Stack>
        </Stack>
      </Box>
    );
  },
};
