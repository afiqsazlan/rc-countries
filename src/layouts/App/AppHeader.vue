<script setup lang="ts">

import ToggleAppearanceModeButton from "@/components/ToggleAppearanceModeButton.vue";
</script>

<template>
  <div class="flex flex-row justify-center bg-white dark:bg-blue-700  px-4 md:px-6 py-4   drop-shadow-sm border-b-2 border-gray-100 dark:border-0 ">
    <div
        class=" flex flex-row w-full max-w-5xl justify-between  items-center">
      <router-link :to="{name: 'home'}"
                   class="font-bold text-lg hover:opacity-90 transition duration-200 ease-in-out px-1 md:px-6 py-2 rounded-sm"
      >
        Where in the world?
      </router-link>
      <ToggleAppearanceModeButton/>
    </div>
  </div>

</template>

<style scoped>

</style>
