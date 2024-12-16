<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div class="space-y-4">
      <!-- Name Fields -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <UFormGroup label="Nom">
            <UInput
              v-model="form.lastName"
              placeholder="Nom"
              :color="errors.lastName ? 'red' : 'gray'"
              class="input-field"
            />
            <FormError :error="errors.lastName" />
          </UFormGroup>
        </div>
        <div>
          <UFormGroup label="Prénom">
            <UInput
              v-model="form.firstName"
              placeholder="Prénom"
              :color="errors.firstName ? 'red' : 'gray'"
              class="input-field"
            />
            <FormError :error="errors.firstName" />
          </UFormGroup>
        </div>
      </div>

      <!-- Email -->
      <UFormGroup label="Email">
        <UInput
          v-model="form.email"
          type="email"
          placeholder="email@example.com"
          :color="errors.email ? 'red' : 'gray'"
          class="input-field"
        />
        <FormError :error="errors.email" />
      </UFormGroup>

      <!-- Phone -->
      <div>
        <Phone
          v-model="form.phoneNumber"
          :selectedCountryCode="form.countryCode"
          @update:selectedCountryCode="form.countryCode = $event"
          @raw-phone="handleRawPhone"
          class="input-field"
        />
        <FormError :error="errors.phoneNumber" />
      </div>

      <!-- Password -->
      <div>
        <Password
          v-model="form.password"
          :type="showPassword ? 'text' : 'password'"
          class="input-field"
        />
        <FormError :error="errors.password" />
      </div>
    </div>

    <div>
      <UButton
        type="submit"
        color="blue"
        block
        :loading="loading"
      >
        {{ loading ? 'Inscription...' : 'S\'inscrire' }}
      </UButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { toast } from 'vue3-toastify'
import type { RegisterData } from '../../types'
import { useAuthStore } from '~/stores/auth'
import { formValidation } from '~/composables/useFormValidation'
import { z } from 'zod'

const router = useRouter()
const authStore = useAuthStore()

const registerSchema = z.object({
  firstName: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  lastName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  phoneNumber: z.string().min(8, 'Numéro de téléphone invalide'),
  countryCode: z.string(),
  password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
  role: z.enum(['client', 'admin'])
})

const form = ref<RegisterData>({
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  countryCode: '+225',
  password: '',
  role: 'client'
})

const { errors, validate } = formValidation(registerSchema)
const loading = ref(false)
const showPassword = ref(false)
const rawPhone = ref('')

const handleRawPhone = (value: string) => {
  rawPhone.value = value
}

const handleSubmit = async () => {
  if (!validate(form.value)) return

  loading.value = true
  try {
    const success = await authStore.register({
      ...form.value,
      phoneNumber: rawPhone.value,
      fullPhoneNumber: ''
    })
    if (success) {
      toast.success('Inscription réussie')
      router.push('/dashboard')
    }
  } catch (error: any) {
    toast.error(error.message || 'Erreur lors de l\'inscription')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.input-field {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 8px;
  width: 100%;
  transition: border-color 0.3s ease;
}

.input-field:focus {
  border-color: #4F9BFE;
  outline: none;
}

.input-field.error {
  border-color: #FF4D4F;
}

.form-error {
  color: #FF4D4F;
  font-size: 12px;
  margin-top: 4px;
}
</style>
