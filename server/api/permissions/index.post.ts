import { Permission } from '~/server/models/Permission'
import { UserRole } from '~/server/models/User'
import { requireRole } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  await requireRole(event, [UserRole.ADMIN])
  
  const body = await readBody(event)
  const permission = new Permission(body)
  await permission.save()
  
  return permission
})