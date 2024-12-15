<!-- pages\auth\login.vue -->
<template>
  <div class="min-h-screen flex items-center justify-center bg-[#F5F7FA] p-8">
    <div class="max-w-md w-full bg-white p-8 rounded-lg shadow-lg space-y-8">
      <div class="text-center">
        <h2 class="text-3xl font-bold text-red-900">Se connecter</h2>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <!-- Section Téléphone -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Téléphone</label
          >
          <div class="bg-gray-50 p-4 rounded-md border border-gray-300 mb-6">
            <Phone
              v-model="phoneNumber"
              :selectedCountryCode="countryCode"
              @update:selectedCountryCode="(val) => (countryCode = val)"
              @raw-phone="handleRawPhone"
              class="w-full"
            />
          </div>
        </div>

        <!-- Section Mot de passe -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Mot de passe</label
          >
          <div class="bg-gray-50 p-4 rounded-md border border-gray-300 mb-6">
            <Password
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              class="w-full"
            />
          </div>
        </div>

        <!-- Bouton Connexion -->
        <div>
          <button
            type="submit"
            class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#0070BA] hover:bg-[#003087] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0070BA]"
            :disabled="isLoading"
          >
            <span v-if="isLoading">Connexion...</span>
            <span v-else>Se connecter</span>
          </button>
        </div>
      </form>

      <div class="text-center mt-4">
        <p class="text-sm text-gray-600">
          Pas encore inscrit ?
          <NuxtLink
            to="/auth/register"
            class="font-medium text-[#0070BA] hover:text-[#003087]"
          >
            Créer un compte
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
import { useAuthStore } from "../../stores/auth";
import Phone from "../../components/form/Phone.vue";
import Password from "../../components/form/PassWord.vue";
// Définition des états du formulaire
const form = ref({
  PhoneNumber: "",
  countryCode: "+225",
  password: "",
});

const countryCode = ref("+225");
const phoneNumber = ref("");
const rawPhone = ref("");

// Gestion du numéro brut
const handleRawPhone = (value: string) => {
  rawPhone.value = value;
};

const password = ref("");
const confirmPassword = ref("");
// console.log("Mot de passe :", password.value);
// console.log("Confirmation :", confirmPassword.value);

// if (password.value !== confirmPassword.value) {
//   console.error("Les mots de passe ne correspondent pas.");
// } else {
//   console.log("Formulaire soumis avec succès.");
// }
// Définition de l'état pour gérer le chargement
const isLoading = ref(false);
const showPassword = ref(false);

// // Masquage des numéros de téléphone
// onMounted(() => {
//   if (phoneInput.value) {
//     IMask(phoneInput.value, {
//       mask: "00 00 00 00 00",
//       lazy: false,
//     });
//   }
// });

// Connexion de l'utilisateur
const handleLogin = async () => {
  if (form.value.PhoneNumber === "" || form.value.password === "") {
    toast.error("Veuillez remplir tous les champs");
    return;
  }

  isLoading.value = true;

  const authStore = useAuthStore();

  try {
    await authStore.login(form.value.PhoneNumber, form.value.password, form.value.countryCode);
    toast.success("Connexion réussie");
  } catch (error: any) {
    toast.error("Erreur lors de la connexion : " + error.message);
  } finally {
    isLoading.value = false;
  }
};
</script>
