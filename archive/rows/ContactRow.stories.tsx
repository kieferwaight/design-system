import type { StoryFn } from "@storybook/react-vite";
import { mockContacts } from "../../examples/mocks/contacts";
import { ContactRow } from "./ContactRow";

export default { title: "Archive/Rows / Contact" };

export const Default: StoryFn = () => (
  <div className="max-w-md mx-auto bg-bg-elevated">
    {mockContacts.map((c, i, arr) => (
      <ContactRow key={c.id} item={c} separator={i < arr.length - 1} />
    ))}
  </div>
);
