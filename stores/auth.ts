import { defineStore } from 'pinia';
import { toast } from 'vue3-toastify';

interface User {
  id: string;
  fullPhoneNumber?: string; // Optionnel si vous n'obtenez pas ce champ
  name?: string; // Optionnel si vous n'obtenez pas ce champ
  role: string;
  avatar?: string;
  username?: string; // Ajout de username si c'est ce qui est renvoyé par l'API
  email: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  error: string;
}

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
        const response = await $fetch('/api/auth/login', {
          method: 'POST',
          body: { fullPhoneNumber, password }
        });

        this.user = {
          id: response.user.id,
          email: response.user.email,
          role: response.user.role,
          username: response.user.firstName,
          // Si vous avez besoin de fullPhoneNumber et name, vous pouvez les ajouter ici si l'API les envoie
        };
        this.isAuthenticated = true;
        this.isAdmin = response.user.role === 'admin';
        toast.success('Connexion réussie');
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
        const response = await $fetch('/api/auth/register', {
          method: 'POST',
          body: data
        });

        if (response) {
          // Mettre à jour l'état avec les données de l'utilisateur
          this.user = response.user;
          this.isAuthenticated = true;
          this.isAdmin = response.user.role === 'admin';
          return true;
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
      try {
        await $fetch('/api/auth/logout', { method: 'POST' });
        this.user = null;
        this.isAuthenticated = false;
        this.isAdmin = false;
        toast.success('Déconnexion réussie');
      } catch (err) {
        toast.error('Erreur lors de la déconnexion');
      }
    }
  },

  getters: {
    // Vérifier si l'utilisateur est authentifié
    isAuthenticated: (state) => !!state.user,

    // Vérifier si l'utilisateur est un administrateur
    isAdmin: (state) => state.user?.role === 'admin'
  }
});
