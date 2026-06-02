// Thin $fetch wrapper. Reserved for when the Rails API lands — currently a
// stub so call-sites can already import it.
export function useApi() {
  const config = useRuntimeConfig()
  const base = config.public.apiBase as string

  const request = <T = unknown>(path: string, opts: Record<string, unknown> = {}): Promise<T> => {
    const headers: Record<string, string> = { Accept: 'application/json', ...(opts.headers as Record<string, string> || {}) }
    if (import.meta.client) {
      const token = localStorage.getItem('yd:token')
      if (token) headers.Authorization = `Bearer ${token}`
    }
    return $fetch<T>(path, { baseURL: base, ...opts, headers })
  }

  return { request }
}
