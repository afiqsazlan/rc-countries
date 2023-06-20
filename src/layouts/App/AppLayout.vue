<script setup lang="ts">
import AppHeader from "@/layouts/App/AppHeader.vue";
</script>

<template>
  <div class=" bg-gray-100 dark:bg-blue-800 min-h-screen text-blue-900 dark:text-white">
    <app-header></app-header>
    <div class="py-8  pb-16 ">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>

</style>
