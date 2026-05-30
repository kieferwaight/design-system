/**
 * Compact timestamp formatter for list rows. Mirrors `fmt_short_time` from the
 * Python side: today → HH:MM, this year → Mon D, else → YYYY-MM-DD.
 */
export function shortTime(ts: number | undefined | null): string {
  if (ts == null) return "";
  const d = new Date(ts * 1000);
  if (Number.isNaN(d.getTime())) return "";
  const now = new Date();
  const sameDay =
    d.getDate() === now.getDate() &&
    d.getMonth() === now.getMonth() &&
    d.getFullYear() === now.getFullYear();
  if (sameDay) {
    return d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit", hour12: false });
  }
  if (d.getFullYear() === now.getFullYear()) {
    return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  }
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate(),
  ).padStart(2, "0")}`;
}

/** Relative time for content panes: "2 min ago", "yesterday", "3 days ago", "Mar 14". */
export function relativeTime(ts: number | undefined | null): string {
  if (ts == null) return "";
  const seconds = Math.floor(Date.now() / 1000 - ts);
  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`;
  if (seconds < 86_400) return `${Math.floor(seconds / 3600)} hr ago`;
  if (seconds < 86_400 * 2) return "yesterday";
  if (seconds < 86_400 * 7) return `${Math.floor(seconds / 86_400)} days ago`;
  return shortTime(ts);
}
