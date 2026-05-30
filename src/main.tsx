import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./generated/css/theme.css";

/**
 * Phase 1 will replace this with the actual PWA shell + router.
 * For now this is a placeholder so `vite build` doesn't error.
 * Phase 0 (component review) uses Ladle — run `pnpm stories` instead.
 */
function App() {
  return (
    <div className="min-h-screen bg-bg text-text-primary flex items-center justify-center p-6">
      <div className="max-w-md text-center">
        <p className="text-text-secondary text-sm">
          The app shell lands in phase 1. Browse components at{" "}
          <code className="text-accent-blue">pnpm stories</code>.
        </p>
      </div>
    </div>
  );
}

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
