<template>
  <div class="min-h-screen flex flex-col">
    <LayoutHeader />
    <main class="flex-grow pt-0">
      <slot />
    </main>
    <LayoutFooter />
  </div>
</template>

<script setup>
import LayoutHeader from '~/components/layout/Header.vue';
import LayoutFooter from '~/components/layout/Footer.vue';
</script>