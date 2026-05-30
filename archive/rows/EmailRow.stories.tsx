import type { StoryFn } from "@storybook/react-vite";
import { mockEmails } from "../../examples/mocks/emails";
import { EmailRow } from "./EmailRow";

export default { title: "Archive/Rows / Email" };

export const Default: StoryFn = () => (
  <div className="max-w-md mx-auto bg-bg-elevated">
    {mockEmails.map((e, i, arr) => (
      <EmailRow key={e.id} item={e} separator={i < arr.length - 1} />
    ))}
  </div>
);

export const Selected: StoryFn = () => (
  <div className="max-w-md mx-auto bg-bg-elevated">
    {mockEmails.slice(0, 3).map((e, i, arr) => (
      <EmailRow key={e.id} item={e} selected={i === 1} separator={i < arr.length - 1} />
    ))}
  </div>
);
