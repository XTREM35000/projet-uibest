// server/api/brand/config.post.ts
import { Brand } from '~/server/models/Brand';
import { validateEmail } from '~/server/utils/validators';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    // Validation des champs requis
    if (!body.companyName || !body.logo) {
      throw createError({
        statusCode: 400,
        message: 'Le nom de l’entreprise et le logo sont requis',
      });
    }

    // Validation de l'email de contact si présent
    if (body.contact?.email && !validateEmail(body.contact.email)) {
      throw createError({
        statusCode: 400,
        message: 'Email de contact invalide',
      });
    }

    // Recherche de la configuration existante
    let brand = await Brand.findOne();
    if (brand) {
      // Mise à jour de la configuration existante
      Object.assign(brand, body);
      await brand.save();
    } else {
      // Création d'une nouvelle configuration si elle n'existe pas
      brand = await Brand.create(body);
    }

    return brand;
  } catch (error: any) {
    throw createError({
      statusCode: error?.statusCode || 500,
      message: error?.message || 'Erreur lors de la sauvegarde de la configuration de la marque',
    });
  }
});
