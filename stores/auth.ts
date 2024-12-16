import { defineStore } from 'pinia';
import { toast } from 'vue3-toastify';

// Définir le type pour l'utilisateur
interface User {
  id: string;
  fullPhoneNumber?: string;
  name?: string;
  role: string;
  avatar?: string;
  username?: string;
  email: string;
  lastName?: string;
  firstName?: string;
}

// Définir le type pour la réponse de connexion
interface LoginResponse {
  user: User;
  token: string;
}

// Définir l'état de l'authentification
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  error: string;
}

// Définir les données de connexion
interface LoginCredentials {
  fullPhoneNumber: string;
  password: string;
}

// Définir les données d'inscription
interface RegisterData extends LoginCredentials {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  countryCode: string;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    isAuthenticated: false,
    isAdmin: false,
    loading: false,
    error: ''
  }),

  actions: {
    // Connexion
    async login(fullPhoneNumber: string, password: string) {
      this.loading = true;
      this.error = '';

      try {
        const response: LoginResponse = await $fetch('/api/auth/login', {
          method: 'POST',
          body: { fullPhoneNumber, password }
        });

        if (response?.user) {
          this.user = {
            id: response.user.id,
            email: response.user.email,
            role: response.user.role,
            username: response.user.firstName, // Assurez-vous que 'firstName' est correct
            fullPhoneNumber: response.user.fullPhoneNumber,
            avatar: response.user.avatar,
          };

          this.isAuthenticated = true;
          this.isAdmin = response.user.role === 'admin';
          toast.success('Connexion réussie');
        }
      } catch (err) {
        this.error = 'Échec de la connexion';
        toast.error('Échec de la connexion');
      } finally {
        this.loading = false;
      }
    },

    // Inscription
    async register(data: RegisterData) {
      this.loading = true;
      this.error = '';

      try {
        const response = await $fetch<{ user: User, token: string }>('/api/auth/register', {
          method: 'POST',
          body: data
        });

        if (response?.user && response.user.id && response.user.role && response.user.email) {
          this.user = response.user;
          this.isAuthenticated = true;
          this.isAdmin = response.user.role === 'admin';
          return true;
        } else {
          throw new Error('Invalid user data received from server');
        }
      } catch (error) {
        this.error = 'Erreur lors de l\'inscription';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // Déconnexion
    async logout() {
      this.user = null;
      this.isAuthenticated = false;
      this.isAdmin = false;
      toast.success('Déconnexion réussie');
    }
  },

  getters: {
    // Vérifier si l'utilisateur est authentifié
    isUserAuthenticated: (state) => state.isAuthenticated,

    // Vérifier si l'utilisateur est un administrateur
    isAdminAuthenticated: (state) => state.isAdmin
  }
});
