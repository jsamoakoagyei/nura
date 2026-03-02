/**
 * Wraps an async function in a consistent error-handling pattern.
 * Returns a tuple of [data, null] on success or [null, Error] on failure.
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
