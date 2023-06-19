<script setup lang="ts">

</script>

<template>
  <div class=" bg-blue-900 min-h-screen text-white">
    <div class="flex justify-between bg-blue-700 px-6 py-4">
      <div>
        Where in the world?
      </div>
      <button>
        Dark Mode
      </button>
    </div>
    <div class="py-8 ">
      <slot></slot>

    </div>
  </div>
</template>

<style scoped>

</style>