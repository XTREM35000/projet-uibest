import { describe, test, expect, beforeEach } from 'vitest'
import { Permission } from '../server/models/Permission'
import { UserRole } from '../server/models/User'
import { clearDatabase } from '../server/utils/test-utils'

const mockPermissionData = {
  role: UserRole.ADMIN,
  resource: 'users',
  actions: ['create', 'read', 'update', 'delete']
}

describe('Permission Model', () => {
  beforeEach(async () => {
    await clearDatabase()
  })

  test('should create permission', async () => {
    const permission = new Permission(mockPermissionData)
    await permission.save()

    const savedPermission = await Permission.findOne()
    expect(savedPermission).toBeDefined()
    expect(savedPermission?.role).toBe(mockPermissionData.role)
    expect(savedPermission?.resource).toBe(mockPermissionData.resource)
    expect(savedPermission?.actions).toEqual(mockPermissionData.actions)
  })

  test('should require valid role', async () => {
    const invalidPermission = new Permission({
      ...mockPermissionData,
      role: 'invalid'
    })
    await expect(invalidPermission.save()).rejects.toThrow()
  })

  test('should require valid actions', async () => {
    const invalidPermission = new Permission({
      ...mockPermissionData,
      actions: ['invalid']
    })
    await expect(invalidPermission.save()).rejects.toThrow()
  })
})