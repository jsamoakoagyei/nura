/**
 * Wraps an async function in a Go-style [data, error] tuple pattern.
 *
 * Instead of wrapping every async call in try/catch (which creates deeply
 * nested blocks), callers can destructure the result and handle errors inline:
 *
 *   const [data, err] = await safeAsync(() => fetchSomething());
 *   if (err) return showError(err.message);
 *   // data is guaranteed non-null here
 *
 * This keeps control flow flat and makes error handling explicit at every call
 * site, which is especially valuable in UI code where different errors need
 * different user-facing feedback.
 */
export async function safeAsync<T>(
  fn: () => Promise<T>
): Promise<[T, null] | [null, Error]> {
  try {
    const data = await fn();
    return [data, null];
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err));
    return [null, error];
  }
}
