// server/api/brand/config.get.ts
import { Brand } from '~/server/models/Brand';

export default defineEventHandler(async (event) => {
  try {
    // Recherche de la configuration de la marque
    const brand = await Brand.findOne();

    // Retourne la configuration si elle existe, sinon une valeur par défaut
    return brand || { isConfigured: false };
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Erreur lors de la récupération des informations de la marque',
    });
  }
});
