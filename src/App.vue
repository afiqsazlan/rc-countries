<script setup lang="ts">
import { RouterView } from 'vue-router'

import {useStore} from "@/stores/app";
const store = useStore()

</script>

<template>
  <header>

  </header>
  <div :class="store.appearanceMode">
    <component :is="$route.meta.layout || 'div'">
      <RouterView/>
    </component>
  </div>
</template>