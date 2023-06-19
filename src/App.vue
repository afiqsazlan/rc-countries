<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <header>

  </header>
    <component :is="$route.meta.layout || 'div'">
      <RouterView/>
    </component>
</template>