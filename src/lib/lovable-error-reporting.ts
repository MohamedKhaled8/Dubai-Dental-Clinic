// Global client-side error reporter
export function reportError(error: unknown, context: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  console.error("[App Error]", error, context);
}

// Backward-compatible alias
export const reportLovableError = reportError;
