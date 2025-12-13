import "server-only"
import { kv } from "@vercel/kv"

/**
 * Returns the Vercel KV client if environment variables are configured.
 * KV_REST_API_URL and KV_REST_API_TOKEN are added automatically
 * when the Upstash KV (Vercel KV) integration is enabled.
 */
export function getKV() {
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    return kv
  }
  return null
}

/** Simple check to expose which backend is active (kv or memory). */
export function isKVConfigured(): boolean {
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN)
}

export type KVClient = typeof kv
