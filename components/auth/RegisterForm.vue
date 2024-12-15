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
              :color="errors.lastName ? 'red' : undefined"
            />
            <FormError :error="errors.lastName" />
          </UFormGroup>
        </div>
        <div>
          <UFormGroup label="Prénom">
            <UInput
              v-model="form.firstName"
              placeholder="Prénom"
              :color="errors.firstName ? 'red' : undefined"
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
          :color="errors.email ? 'red' : undefined"
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
        />
        <FormError :error="errors.phoneNumber" />
      </div>

      <!-- Password -->
      <div>
        <Password
          v-model="form.password"
          :type="showPassword ? 'text' : 'password'"
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
import type { RegisterData } from '~/types'
import { useAuthStore } from '~/stores/auth'
import { useFormValidation } from '~/composables/useFormValidation'
import { registerSchema } from '~/utils/validation'

const router = useRouter()
const authStore = useAuthStore()

const form = ref<RegisterData>({
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  countryCode: '+225',
  password: '',
  role: 'client'
})

const { errors, validate } = useFormValidation(registerSchema)
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
      phoneNumber: rawPhone.value
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