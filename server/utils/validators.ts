// server/utils/validators.ts
import { isValidPhoneNumber, CountryCode } from 'libphonenumber-js';

// Validation de l'email
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validation du numéro de téléphone complet
export const validatePhoneNumber = (fullPhoneNumber: string, countryCode: string): { isValid: boolean, message?: string } => {
  // Vérifier si le code du pays est valide (ex : 'FR', 'US', etc.)
  const validCountryCodes: CountryCode[] = ['US', 'FR', 'DE', 'GB']; // Liste des codes de pays valides
  if (!validCountryCodes.includes(countryCode as CountryCode)) {
    return { isValid: false, message: 'Code pays invalide' };
  }

  // Validation du numéro de téléphone
  const isValid = isValidPhoneNumber(fullPhoneNumber, countryCode as CountryCode);
  if (!isValid) {
    return { isValid: false, message: 'Le numéro de téléphone n\'est pas valide' };
  }

  return { isValid: true };
};

// Validation du mot de passe
export const validatePassword = (password: string): { isValid: boolean, message?: string } => {
  if (password.length < 8) {
    return {
      isValid: false,
      message: 'Le mot de passe doit contenir au moins 8 caractères'
    };
  }

  if (!/[A-Z]/.test(password)) {
    return {
      isValid: false,
      message: 'Le mot de passe doit contenir au moins une majuscule'
    };
  }

  if (!/[0-9]/.test(password)) {
    return {
      isValid: false,
      message: 'Le mot de passe doit contenir au moins un chiffre'
    };
  }

  return { isValid: true };
};
