<template>
  <Modal :title="user ? 'Modifier l\'utilisateur' : 'Créer un utilisateur'" @close="$emit('close')">
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <FormField
        v-model="form.firstName"
        label="Prénom"
        required
      />
      
      <FormField
        v-model="form.lastName"
        label="Nom"
        required
      />
      
      <FormField
        v-model="form.email"
        type="email"
        label="Email"
        required
      />
      
      <FormField
        v-if="!user"
        v-model="form.password"
        type="password"
        label="Mot de passe"
        required
      />
      
      <div>
        <label class="block text-sm font-medium text-gray-700">Rôle</label>
        <select
          v-model="form.role"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        >
          <option value="admin">Administrateur</option>
          <option value="client">Client</option>
          <option value="partner">Partenaire</option>
        </select>
      </div>
      
      <div class="flex justify-end space-x-3">
        <button
          type="button"
          class="px-4 py-2 border rounded-md hover:bg-gray-50"
          @click="$emit('close')"
        >
          Annuler
        </button>
        <button
          type="submit"
          class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
        >
          {{ user ? 'Mettre à jour' : 'Créer' }}
        </button>
      </div>
    </form>
  </Modal>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Modal from '~/components/ui/Modal.vue'

const props = defineProps({
  user: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close', 'submit'])

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  role: 'client'
})

onMounted(() => {
  if (props.user) {
    form.value = { ...props.user }
  }
})

function handleSubmit() {
  emit('submit', form.value)
}
</script>