type Bucket = { count: number; resetAt: number };

export type RateLimitResult = { allowed: boolean; remaining: number; resetAt: number };

export function createRateLimiter(limit: number, windowMs: number) {
  const buckets = new Map<string, Bucket>();

  return (key: string, now = Date.now()): RateLimitResult => {
    for (const [bucketKey, bucket] of buckets) {
      if (bucket.resetAt <= now) buckets.delete(bucketKey);
    }

    const current = buckets.get(key);
    if (!current || current.resetAt <= now) {
      const bucket = { count: 1, resetAt: now + windowMs };
      buckets.set(key, bucket);
      return { allowed: true, remaining: limit - 1, resetAt: bucket.resetAt };
    }

    if (current.count >= limit) {
      return { allowed: false, remaining: 0, resetAt: current.resetAt };
    }

    current.count += 1;
    return { allowed: true, remaining: limit - current.count, resetAt: current.resetAt };
  };
}

export const contactRateLimiter = createRateLimiter(5, 60_000);
