// composables/useAuth.ts
import { useAuthStore } from '~/stores/auth'; // Importer le store Pinia centralisé
import { ref } from 'vue';
import { toast } from 'vue3-toastify';

interface LoginCredentials {
  fullPhoneNumber: string;
  password: string;
}

interface RegisterData extends LoginCredentials {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  countryCode: string;
}

export const useAuth = () => {
  const authStore = useAuthStore(); // Utilisation du store Pinia
  const loading = ref(false);
  const error = ref('');

  const login = async (credentials: LoginCredentials) => {
    loading.value = true;
    error.value = '';

    try {
      await authStore.login(credentials.fullPhoneNumber, credentials.password); // Appel à la méthode login du store Pinia

      // Si la connexion réussit
      toast.success('Connexion réussie');
      return true;
    } catch (err) {
      error.value = 'Échec de la connexion';
      toast.error('Échec de la connexion');
      return false;
    } finally {
      loading.value = false;
    }
  };

  const register = async (data: RegisterData) => {
    loading.value = true;
    error.value = '';

    try {
      await authStore.register(data); // Appel à la méthode register du store Pinia

      // Si l'inscription réussit
      toast.success('Inscription réussie');
      return true;
    } catch (err) {
      error.value = 'Échec de l\'inscription';
      toast.error('Échec de l\'inscription');
      return false;
    } finally {
      loading.value = false;
    }
  };

  const logout = async () => {
    try {
      await authStore.logout(); // Appel à la méthode logout du store Pinia
      toast.success('Déconnexion réussie');
    } catch (err) {
      toast.error('Erreur lors de la déconnexion');
    }
  };

  return {
    user: authStore.user,
    loading,
    error,
    isAuthenticated: authStore.isAuthenticated,
    isAdmin: authStore.isAdmin,
    login,
    register,
    logout
  };
};
