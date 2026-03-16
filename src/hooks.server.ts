// hooks.server.ts
// Allow self-signed SSL certificates for internal GitLab instance
import type { Handle } from '@sveltejs/kit';

// Bypass SSL certificate validation for internal/self-signed certificates
// This is needed for private GitLab instances with self-signed SSL certs
(globalThis as Record<string, unknown>)['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

export const handle: Handle = async ({ event, resolve }) => {
  return resolve(event);
};
