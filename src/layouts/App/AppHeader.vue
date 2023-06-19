<script setup lang="ts">
import {useStore} from "@/stores/app";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

const store = useStore()
</script>

<template>
  <div
      class="flex flex-row justify-between items-center bg-white dark:bg-blue-700 px-6 py-4 drop-shadow-sm border-b-2 border-gray-100 dark:border-0">
    <router-link :to="{name: 'home'}"
                 class="font-bold text-lg hover:opacity-80 px-6 py-2 rounded-sm"
    >
      Where in the world?
    </router-link>
    <button @click="store.toggleAppearanceMode()"
            class="capitalize font-semibold  text-sm space-x-2 flex items-center"
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
  </div>
</template>

<style scoped>

</style>
