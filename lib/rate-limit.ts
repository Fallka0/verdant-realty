const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const globalRateLimitStore = globalThis as typeof globalThis & {
  inquiryRateLimitStore?: Map<string, RateLimitEntry>;
};

function getStore() {
  if (!globalRateLimitStore.inquiryRateLimitStore) {
    globalRateLimitStore.inquiryRateLimitStore = new Map<string, RateLimitEntry>();
  }

  return globalRateLimitStore.inquiryRateLimitStore;
}

export function consumeInquiryRateLimit(key: string) {
  const now = Date.now();
  const store = getStore();

  for (const [entryKey, entry] of store.entries()) {
    if (entry.resetAt <= now) {
      store.delete(entryKey);
    }
  }

  const current = store.get(key);

  if (!current || current.resetAt <= now) {
    store.set(key, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });

    return {
      allowed: true,
      remaining: RATE_LIMIT_MAX_REQUESTS - 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    } as const;
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: current.resetAt,
    } as const;
  }

  current.count += 1;
  store.set(key, current);

  return {
    allowed: true,
    remaining: RATE_LIMIT_MAX_REQUESTS - current.count,
    resetAt: current.resetAt,
  } as const;
}
