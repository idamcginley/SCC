import { useEffect, useRef, useCallback } from "react";
import { useWatch, useFormContext } from "react-hook-form";

const DEBOUNCE_MS = 1000;

/**
 * Persists react-hook-form values to localStorage with debounced writes.
 * Hydrates on mount from localStorage, with error recovery for corrupt data.
 *
 * @param key - Storage key (each framework gets its own key)
 * @returns Object with clearSavedData function for explicit clear
 */
export function useLocalStorageForm(key: string) {
  const { reset } = useFormContext();
  const values = useWatch({ name: undefined });
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isHydratedRef = useRef(false);

  // Hydrate on mount
  useEffect(() => {
    const stored = localStorage.getItem(key);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Record<string, unknown>;
        reset(parsed);
      } catch {
        // Corrupt JSON -- remove and continue with defaults
        localStorage.removeItem(key);
      }
    }
    isHydratedRef.current = true;
  }, [key, reset]);

  // Persist on change (debounced) -- only after initial hydration
  useEffect(() => {
    if (!isHydratedRef.current) return;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      try {
        localStorage.setItem(key, JSON.stringify(values));
      } catch {
        // localStorage quota exceeded -- silently fail
        // In a production app you might show a warning toast here
        console.warn(
          `[useLocalStorageForm] Failed to persist data for key "${key}". Storage may be full.`
        );
      }
    }, DEBOUNCE_MS);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [key, values]);

  const clearSavedData = useCallback(() => {
    localStorage.removeItem(key);
  }, [key]);

  return { clearSavedData };
}
