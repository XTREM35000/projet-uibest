import { User } from '~/server/models/User';
import { generateToken } from '~/server/utils/auth';
import { validateEmail } from '~/server/utils/validators';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { username, email, password } = body;

    if (!username || !email || !password) {
      throw createError({
        statusCode: 400,
        message: 'Tous les champs sont requis'
      });
    }

    if (!validateEmail(email)) {
      throw createError({
        statusCode: 400,
        message: 'Email invalide'
      });
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      throw createError({
        statusCode: 400,
        message: passwordValidation.message
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw createError({
        statusCode: 400,
        message: 'Cet email est déjà utilisé'
      });
    }

    const user = await User.create({
      username,
      email,
      password
    });

    const token = generateToken(user._id.toString());
    setCookie(event, 'auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24,
      path: '/'
    });

    return {
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    };
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Erreur interne du serveur'
    });
  }
});