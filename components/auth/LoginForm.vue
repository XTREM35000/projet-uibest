<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div class="space-y-4">
      <!-- Phone Input -->
      <div>
        <Phone
          v-model="form.phoneNumber"
          :selectedCountryCode="form.countryCode"
          @update:selectedCountryCode="form.countryCode = $event"
          @raw-phone="handleRawPhone"
        />
        <FormError :error="errors.phoneNumber" />
      </div>

      <!-- Password Input -->
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
        {{ loading ? 'Connexion...' : 'Se connecter' }}
      </UButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { toast } from 'vue3-toastify'
import type { LoginCredentials } from '~/types'
import { useAuthStore } from '~/stores/auth'
import { useFormValidation } from '~/composables/useFormValidation'
import { loginSchema } from '~/utils/validation'

const router = useRouter()
const authStore = useAuthStore()

const form = ref<LoginCredentials>({
  phoneNumber: '',
  countryCode: '+225',
  password: ''
})

const { errors, validate } = useFormValidation(loginSchema)
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
    const success = await authStore.login(rawPhone.value, form.value.password)
    if (success) {
      toast.success('Connexion réussie')
      router.push('/dashboard')
    }
  } catch (error: any) {
    toast.error(error.message || 'Erreur lors de la connexion')
  } finally {
    loading.value = false
  }
}
</script>