<!-- pages\auth\login.vue -->
<!-- pages\auth\login.vue -->
<template>
  <div class="max-h-screen flex items-center justify-center bg-[#F5F7FA] px-4">
    <div class="bg-white p-6 rounded-lg shadow-lg w-full sm:max-w-md">
      <div class="text-center mb-4">
        <h2 class="text-3xl font-extrabold text-red-900">
          Guide pour transfert
        </h2>
      </div>
      Guide pour transfert des colis chez Gogo Express 2.0
      <div class="py-4 bg-gray-100">
        <Phone />
      </div>
      <div class="py-4 bg-gray-100">
        <PassWord />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import "vue3-toastify/dist/index.css";
import Phone from "../components/form/Phone.vue";
</script>
