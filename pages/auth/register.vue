<!-- pages\auth\login.vue -->
<template>
  <div class="min-h-screen flex items-top justify-center bg-[#F5F7FA] p-8">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
      <div class="text-center">
        <h2 class="text-3xl font-bold text-red-900">Créer un compte</h2>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleRegister">
        <div class="space-y-4">
          <!-- Nom et Prénom -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Nom</label>
              <input
                v-model="form.lastName"
                type="text"
                placeholder="Nom"
                required
                class="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 focus:border-[#0070BA] focus:ring-[#0070BA]"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700"
                >Prénom</label
              >
              <input
                v-model="form.firstName"
                type="text"
                placeholder="Prénom"
                required
                class="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 focus:border-[#0070BA] focus:ring-[#0070BA]"
              />
            </div>
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Email</label>
            <input
              v-model="form.email"
              type="email"
              placeholder="email@gmail.com"
              required
              class="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 focus:border-[#0070BA] focus:ring-[#0070BA]"
            />
          </div>

          <!-- Téléphone -->
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Téléphone</label
            >
            <div class="bg-gray-50 p-4 rounded-md border border-gray-300">
              <Phone
                v-model="form.phoneNumber"
                :selectedCountryCode="form.countryCode"
                @update:selectedCountryCode="(val:any) => (form.countryCode = val)"
                @raw-phone="handleRawPhone"
                class="w-full"
              />
            </div>
          </div>

          <!-- Mot de passe -->
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Mot de passe</label
            >
            <div class="bg-gray-50 p-4 rounded-md border border-gray-300">
              <Password
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                class="w-full"
              />
            </div>
          </div>

          <!-- Rôle -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Rôle</label>
            <select
              v-model="form.role"
              required
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-3"
            >
              <option disabled value="">Sélectionner un rôle</option>
              <option value="superadmin">Super Admin</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
              <option value="client">Client</option>
            </select>
          </div>
        </div>

        <!-- Bouton d'inscription -->
        <div>
          <button
            type="submit"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#0070BA] hover:bg-[#003087] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0070BA]"
            :disabled="isLoading"
          >
            <span v-if="isLoading">S'inscrire...</span>
            <span v-else>S'inscrire</span>
          </button>
        </div>
      </form>

      <!-- Lien vers la page de connexion -->
      <div class="text-center">
        <p class="text-sm text-gray-600">
          Déjà inscrit ?
          <NuxtLink
            to="/auth/login"
            class="font-medium text-[#0070BA] hover:text-[#003087]"
          >
            Se connecter
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import Phone from "../../components/form/Phone.vue";
import Password from "../../components/form/PassWord.vue";
import { useAuthStore } from "~/stores/auth";

// Données du formulaire
const form = ref({
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "", // Ajout du champ phoneNumber
  countryCode: "+225", // Ajout du countryCode
  role: "",
  password: "",
});

const confirmPassword = ref("");
const rawPhone = ref("");
const isLoading = ref(false);

// Gestion du numéro brut
const handleRawPhone = (value: string) => {
  rawPhone.value = value;
};

const showPassword = ref(false);

// Gestion de l'inscription
const handleRegister = async () => {
  if (
    !form.value.firstName ||
    !form.value.lastName ||
    !form.value.email ||
    !form.value.password ||
    !form.value.phoneNumber
  ) {
    toast.error("Veuillez remplir tous les champs");
    return;
  }

  if (form.value.password !== confirmPassword.value) {
    toast.error("Les mots de passe ne correspondent pas");
    return;
  }

  isLoading.value = true;

  try {
    const authStore = useAuthStore();
    await authStore.register(
      form.value.firstName,
      form.value.lastName,
      form.value.email,
      rawPhone.value,
      form.value.password,
      form.value.phoneNumber,
      { email: form.value.email, password: form.value.password, username: `${form.value.firstName} ${form.value.lastName}` }
    );
    toast.success("Inscription réussie");
  } catch (error: any) {
    toast.error("Erreur lors de l'inscription : " + error.message);
  } finally {
    isLoading.value = false;
  }
};
</script>
