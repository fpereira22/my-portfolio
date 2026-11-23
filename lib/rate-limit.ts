// Rate limiter en memoria (ventana deslizante) por clave, normalmente la IP.
// Limitación conocida: en serverless cada instancia tiene su propio contador, así que
// es una defensa "best effort" contra abuso casual, no un límite global estricto.

const hits = new Map<string, number[]>()
const MAX_KEYS = 5000

export function rateLimit(key: string, limit: number, windowMs: number): { ok: boolean; retryAfterSec: number } {
  const now = Date.now()
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs)

  if (recent.length >= limit) {
    hits.set(key, recent)
    return { ok: false, retryAfterSec: Math.ceil((windowMs - (now - recent[0])) / 1000) }
  }

  recent.push(now)
  hits.set(key, recent)

  // Evita crecimiento ilimitado del mapa: purga claves vencidas cuando se llena.
  if (hits.size > MAX_KEYS) {
    for (const [k, times] of hits) {
      if (times.every((t) => now - t >= windowMs)) hits.delete(k)
    }
  }

  return { ok: true, retryAfterSec: 0 }
}

export function getClientIp(headers: Headers): string {
  return headers.get("x-forwarded-for")?.split(",")[0]?.trim() || headers.get("x-real-ip") || "unknown"
}
