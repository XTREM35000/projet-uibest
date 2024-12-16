import { ref } from "vue";
import { z } from "zod";
import { toast } from "vue3-toastify";

export function formValidation<T extends z.ZodType>(schema: T) {
  const errors = ref<Record<string, string>>({});

  // Méthode de validation
  const validate = (data: unknown): data is z.infer<T> => {
    try {
      schema.parse(data);
      errors.value = {}; // Si la validation réussit, on réinitialise les erreurs
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        // On transforme les erreurs en un objet avec des clés correspondant aux champs
        errors.value = error.errors.reduce((acc, curr) => {
          const path = curr.path.join("."); // Création du nom du champ à partir du chemin
          acc[path] = curr.message;
          return acc;
        }, {} as Record<string, string>);

        toast.error(Object.values(errors.value)[0]); // Affichage du premier message d'erreur avec toast
      }
      return false;
    }
  };

  // Méthode pour vider les erreurs
  const clearErrors = () => {
    errors.value = {};
  };

  // Nouvelle méthode pour récupérer l'erreur d'un champ
  const getError = (field: string): string | null => {
    return errors.value[field] || null;
  };

  // Nouvelle méthode pour vérifier si un champ a une erreur
  const hasError = (field: string): boolean => {
    return errors.value.hasOwnProperty(field);
  };

  return {
    errors,
    validate,
    clearErrors,
    getError, // Retourne la méthode getError
    hasError, // Retourne la méthode hasError
  };
}
