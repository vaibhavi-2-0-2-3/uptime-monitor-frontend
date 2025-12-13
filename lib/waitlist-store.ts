import "server-only"
import { getKV } from "./upstash"

export type WaitlistRole = "investor" | "talent" | "supporter"

export interface WaitlistEntry {
  email: string
  role: WaitlistRole
  ts: number
}

export interface WaitlistStore {
  addIfNotExists(entry: WaitlistEntry): Promise<{ created: boolean; count: number }>
  getCount(): Promise<number>
}

const EMAIL_SET_KEY = "waitlist:emails"

class KVWaitlist implements WaitlistStore {
  async addIfNotExists(entry: WaitlistEntry): Promise<{ created: boolean; count: number }> {
    const kv = getKV()
    if (!kv) throw new Error("KV not configured")
    const userKey = `waitlist:user:${entry.email}`

    // Add email to the set. Returns 1 if newly added, 0 if it already existed.
    const added = (await kv.sadd(EMAIL_SET_KEY, entry.email)) as number

    // Store/overwrite entry details (idempotent).
    await kv.hset(userKey, { role: entry.role, ts: entry.ts })

    const count = (await kv.scard(EMAIL_SET_KEY)) as number
    return { created: added === 1, count: typeof count === "number" ? count : 0 }
  }

  async getCount(): Promise<number> {
    const kv = getKV()
    if (!kv) throw new Error("KV not configured")
    const count = (await kv.scard(EMAIL_SET_KEY)) as number
    return typeof count === "number" ? count : 0
  }
}

class MemoryWaitlist implements WaitlistStore {
  private map = new Map<string, WaitlistEntry>()

  async addIfNotExists(entry: WaitlistEntry): Promise<{ created: boolean; count: number }> {
    const existed = this.map.has(entry.email)
    if (!existed) this.map.set(entry.email, entry)
    return { created: !existed, count: this.map.size }
  }

  async getCount(): Promise<number> {
    return this.map.size
  }
}

let memorySingleton: MemoryWaitlist | null = null

export function createWaitlistStore(): WaitlistStore {
  const kv = getKV()
  if (kv) return new KVWaitlist()
  if (!memorySingleton) memorySingleton = new MemoryWaitlist()
  return memorySingleton
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase()
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
