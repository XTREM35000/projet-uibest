import { vi } from 'vitest'

vi.mock('#app', () => ({
  useRuntimeConfig: () => ({
    jwtSecret: 'test-secret',
  }),
}))
