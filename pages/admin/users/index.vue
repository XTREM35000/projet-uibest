<template>
  <div class="max-w-7xl mx-auto py-6 px-4">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-semibold">Gestion des utilisateurs</h1> 
      <button
        @click="showCreateModal = true"
        class="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
      >
        Créer un utilisateur
      </button>
    </div>

    <div class="bg-white shadow-md rounded-lg overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nom
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Rôle
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="user in users" :key="user.id">
            <td class="px-6 py-4 whitespace-nowrap">
              {{ user.firstName }} {{ user.lastName }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              {{ user.email }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              {{ user.role }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <button
                @click="editUser(user)"
                class="text-primary-600 hover:text-primary-900 mr-3"
              >
                Modifier
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <UserFormModal
      v-if="showCreateModal"
      @close="showCreateModal = false"
      @submit="createUser"
    />
    
    <UserFormModal
      v-if="showEditModal"
      :user="selectedUser"
      @close="showEditModal = false"
      @submit="updateUser"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import UserFormModal from '~/components/users/UserFormModal.vue';

definePageMeta({
  middleware: ['auth'],
  meta: {
    requiresAuth: true,
    requiresAdmin: true
  }
})

const users = ref([])
const showCreateModal = ref(false)
const showEditModal = ref(false)
const selectedUser = ref(null)

const { $toast } = useNuxtApp()

onMounted(fetchUsers)

async function fetchUsers() {
  const { data } = await useFetch('/api/users')
  users.value = data.value
}

function editUser(user) {
  selectedUser.value = user
  showEditModal.value = true
}

async function createUser(userData) {
  try {
    await useFetch('/api/users', {
      method: 'POST',
      body: userData
    })
    await fetchUsers()
    showCreateModal.value = false
    $toast.success('Utilisateur créé avec succès')
  } catch (error) {
    $toast.error('Erreur lors de la création de l\'utilisateur')
  }
}

async function updateUser(userData) {
  try {
    await useFetch(`/api/users/${selectedUser.value.id}`, {
      method: 'PUT',
      body: userData
    })
    await fetchUsers()
    showEditModal.value = false
    $toast.success('Utilisateur mis à jour avec succès')
  } catch (error) {
    $toast.error('Erreur lors de la mise à jour de l\'utilisateur')
  }
}
</script>