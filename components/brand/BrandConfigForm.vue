<template>
  <div class="space-y-8">
    <form @submit.prevent="submitForm" class="space-y-6">
      <FormField
        v-model="form.companyName"
        label="Nom de l'entreprise"
        type="text"
        required
      />

      <FormField
        v-model="form.logo"
        label="Logo URL"
        type="url"
        required
      />

      <div class="grid grid-cols-2 gap-4">
        <FormField
          v-model="form.primaryColor"
          label="Couleur principale"
          type="color"
        />

        <FormField
          v-model="form.secondaryColor"
          label="Couleur secondaire"
          type="color"
        />
      </div>

      <FormField
        v-model="form.welcomeMessage"
        label="Message de bienvenue"
        type="textarea"
        required
        :rows="3"
      />

      <div class="flex justify-end">
        <button
          type="submit"
          class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Sauvegarder la configuration
        </button>
      </div>
    </form>

    <BrandPreview v-bind="form" />
  </div>
</template>

<script setup>
import { useBrandForm } from '~/composables/useBrandForm'
import FormField from '~/components/ui/FormField.vue'
import BrandPreview from './BrandPreview.vue'

const { form, initForm, submitForm } = useBrandForm()

onMounted(initForm)
</script>