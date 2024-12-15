// tests/auth.test.ts
import { describe, it, expect, vi } from 'vitest'
import jwt from 'jsonwebtoken'
import { generateToken, verifyToken } from '../server/utils/auth'

const JWT_SECRET = 'test-secret'

describe('Auth Utils', () => {
  
  it('should generate a valid JWT token', () => {
    const userId = '12345'
    const token = generateToken(userId, JWT_SECRET)

    expect(token).toBeDefined()
    expect(typeof token).toBe('string')

    const decoded = verifyToken(token, JWT_SECRET)
    expect(decoded).toBeDefined()
    expect(decoded?.userId).toBe(userId)
  })

  it('should verify a valid token', () => {
    const userId = '12345'
    const token = generateToken(userId, JWT_SECRET)

    const decoded = verifyToken(token, JWT_SECRET)
    expect(decoded).toBeDefined()
    expect(decoded?.userId).toBe(userId)
  })

  it('should return null for an invalid token', () => {
    const decoded = verifyToken('invalid-token', JWT_SECRET)
    expect(decoded).toBeNull()
  })
})
