<script setup lang="ts">
import {useStore} from "@/store/app";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
const store = useStore()
</script>

<template>
  <button @click="store.toggleAppearanceMode()"
          class="capitalize font-semibold border border-white hover:border-gray-700 dark:border-blue-700  hover:dark:border-white text-sm space-x-2 flex items-center py-2 px-4 rounded-sm"
  >
    <font-awesome-icon v-if="store.appearanceMode === 'dark'"
                       :icon="['far', 'moon']"
    />
    <font-awesome-icon v-else-if="store.appearanceMode === 'light'"
                       :icon="['far', 'sun']"
                       class="text-blue-900"
    />
    <span>
      {{ store.appearanceMode }} Mode
      </span>
  </button>
</template>

<style scoped>

</style>
