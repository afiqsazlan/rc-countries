<script setup lang="ts">
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
</script>

<template>
  <router-link :to="{name:'home'}"
               class=" bg-white dark:bg-blue-700 border hover:border-blue-900 border-gray-100 dark:border-blue-700 hover:dark:border-white transition duration-200 ease-in-out  px-6 py-2 space-x-2 rounded-sm drop-shadow"
  >
    <font-awesome-icon :icon="['fas', 'arrow-left']"/>
    <span>
            Back
          </span>
  </router-link>
</template>

<style scoped>

</style>
