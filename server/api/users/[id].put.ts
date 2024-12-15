import { User, UserRole } from '~/server/models/User'
import { requireRole } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  await requireRole(event, [UserRole.ADMIN])
  
  const id = event.context.params.id
  const body = await readBody(event)
  
  const user = await User.findByIdAndUpdate(id, body, { new: true })
  if (!user) {
    throw createError({
      statusCode: 404,
      message: 'Utilisateur non trouvé'
    })
  }
  
  return {
    id: user._id,
    email: user.email,
    role: user.role,
    firstName: user.firstName,
    lastName: user.lastName
  }
})