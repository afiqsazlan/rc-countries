<script setup lang="ts">
import {useStore} from "@/stores/app";

const store = useStore()
</script>

<template>
  <div class="flex flex-row justify-between items-center bg-white dark:bg-blue-700 px-6 py-4 drop-shadow-sm border-b-2 border-gray-100">
    <div class="font-bold text-lg">
      Where in the world?
    </div>
    <button @click="store.toggleAppearanceMode()"
            class="capitalize font-semibold text-sm"
    >
      {{ store.appearanceMode }} Mode
    </button>
  </div>
</template>

<style scoped>

</style>