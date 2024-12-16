// server/api/users/index.post.ts
import { User, UserRole } from '~/server/models/User'
import { requireRole } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  await requireRole(event, [UserRole.ADMIN])

  const body = await readBody(event)
  const user = new User(body)
  await user.save()

  return {
    id: user._id,
    avatar: user.avatar,
    email: user.email,
    role: user.role,
    firstName: user.firstName,
    lastName: user.lastName
  }
})