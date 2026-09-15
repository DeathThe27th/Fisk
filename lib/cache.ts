type CacheEntry<T> = { value: T; expiresAt: number; storedAt: number };
const store = new Map<string, CacheEntry<unknown>>();
const pending = new Map<string, Promise<unknown>>();

export async function cached<T>(key: string, ttlMs: number, fetcher: () => Promise<T>): Promise<{ value: T; cached: boolean; storedAt: number }> {
  const hit = store.get(key) as CacheEntry<T> | undefined;
  if (hit && hit.expiresAt > Date.now()) return { value: hit.value, cached: true, storedAt: hit.storedAt };
  let promise = pending.get(key) as Promise<T> | undefined;
  if (!promise) {
    promise = fetcher().finally(() => pending.delete(key));
    pending.set(key, promise);
  }
  const value = await promise;
  const storedAt = Date.now();
  store.set(key, { value, expiresAt: storedAt + ttlMs, storedAt });
  return { value, cached: false, storedAt };
}

export function stale<T>(key: string): { value: T; storedAt: number } | null {
  const hit = store.get(key) as CacheEntry<T> | undefined;
  return hit ? { value: hit.value, storedAt: hit.storedAt } : null;
}
