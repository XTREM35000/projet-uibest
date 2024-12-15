<template>
  <div class="max-w-2xl mx-auto">
    <h1 class="text-2xl font-bold mb-6">Configuration de la marque</h1>
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          v-model="brandData.name"
          label="Nom de l'entreprise"
          :error="errors.name"
        />
        <Input
          v-model="brandData.logo"
          label="URL du logo"
          :error="errors.logo"
        />
        <Input
          v-model="brandData.primaryColor"
          label="Couleur primaire"
          type="color"
          :error="errors.primaryColor"
        />
        <Input
          v-model="brandData.secondaryColor"
          label="Couleur secondaire"
          type="color"
          :error="errors.secondaryColor"
        />
      </div>

      <div class="space-y-4">
        <h2 class="text-lg font-semibold">Informations de contact</h2>
        <Input
          v-model="brandData.contact.email"
          label="Email"
          type="email"
          :error="errors.email"
        />
        <Input
          v-model="brandData.contact.phone"
          label="Téléphone"
          :error="errors.phone"
        />
        <Input
          v-model="brandData.contact.address"
          label="Adresse"
          :error="errors.address"
        />
      </div>

      <div class="flex justify-end space-x-4">
        <Button variant="secondary" type="button" @click="resetForm">
          Réinitialiser
        </Button>
        <Button type="submit" :loading="loading">
          Enregistrer
        </Button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useBrand } from '../../composables/useBrand';
import { validateEmail } from '~/server/utils/validators';

const { brand, loading, fetchBrand, updateBrand } = useBrand();
const errors = ref<Record<string, string>>({});

const brandData = ref({
  name: '',
  logo: '',
  primaryColor: '#1E40AF',
  secondaryColor: '#60A5FA',
  contact: {
    email: '',
    phone: '',
    address: '',
  },
});

onMounted(async () => {
  await fetchBrand();
  if (brand.value) {
    brandData.value = { ...brand.value };
  }
});

const validateForm = () => {
  errors.value = {};
  let isValid = true;

  if (!brandData.value.name) {
    errors.value.name = 'Le nom est requis';
    isValid = false;
  }

  if (!brandData.value.logo) {
    errors.value.logo = 'Le logo est requis';
    isValid = false;
  }

  if (
    brandData.value.contact.email &&
    !validateEmail(brandData.value.contact.email)
  ) {
    errors.value.email = 'Email invalide';
    isValid = false;
  }

  return isValid;
};

const handleSubmit = async () => {
  if (!validateForm()) return;

  try {
    await updateBrand(brandData.value);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la marque :', error);
  }
};

const resetForm = () => {
  if (brand.value) {
    brandData.value = { ...brand.value };
  }
};

definePageMeta({
  middleware: ['auth'],
});
</script>
