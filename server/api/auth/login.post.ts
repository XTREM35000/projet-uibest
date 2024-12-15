import { User } from '~/server/models/User';
import { generateToken } from '~/server/utils/auth';
import { validateEmail } from '~/server/utils/validators';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { email, password } = body;

    // Vérification des champs requis
    if (!email || !password) {
      throw createError({
        statusCode: 400,
        message: 'Email et mot de passe requis',
      });
    }

    // Validation du format de l'email
    if (!validateEmail(email)) {
      throw createError({
        statusCode: 400,
        message: 'Email invalide',
      });
    }

    // Recherche de l'utilisateur par email
    const user = await User.findOne({ email });
    if (!user) {
      throw createError({
        statusCode: 401,
        message: 'Email ou mot de passe incorrect',
      });
    }

    // Vérification du mot de passe
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      throw createError({
        statusCode: 401,
        message: 'Email ou mot de passe incorrect',
      });
    }

    // Génération du token JWT
    const token = generateToken(user._id.toString());

    // Ajout du cookie de session sécurisé
    setCookie(event, 'auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 24 heures
      path: '/',
    });

    // Réponse avec les informations utilisateur
    return {
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    };
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Erreur interne du serveur',
    });
  }
});
