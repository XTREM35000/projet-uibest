<!-- pages\auth\login.vue -->
<template>
  <div class="max-h-screen flex items-center justify-center bg-[#F5F7FA] px-4">
    <div class="bg-white p-6 rounded-lg shadow-lg w-full sm:max-w-md">
      <div class="text-center mb-4">
        <h2 class="text-3xl font-extrabold text-red-900">
          Expédier vos colis maintenant
        </h2>
      </div>
      Expédier vos colis maintenant
      <div class="py-4 bg-gray-100">
        <Phone />
      </div>
      <div class="py-4 bg-gray-100">
        <Password />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import "vue3-toastify/dist/index.css";
import Phone from "../components/form/Phone.vue";
import Password from "../components/form/PassWord.vue";
</script>
