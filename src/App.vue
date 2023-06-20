<script setup lang="ts">
import { RouterView } from 'vue-router'

import {useStore} from "@/store/app";
const store = useStore()

</script>

<template>
  <div :class="store.appearanceMode">
    <component :is="$route.meta.layout || 'div'">
      <RouterView/>
    </component>
  </div>
</template>
