<script setup lang="ts">

defineProps({
  label: String,
  value: String
})
</script>

<template>
  <div class="space-x-2 items-start  ">
    <span class="font-bold">{{ label }}:</span>
    <span class="text-base font-regular text-blue-900 dark:text-white dark:text-opacity-80">{{ value }}</span>
  </div>
</template>

<style scoped>

</style>
