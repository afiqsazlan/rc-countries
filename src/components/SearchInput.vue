<script setup lang="ts">
defineProps(['modelValue', 'placeholder'])
defineEmits(['update:modelValue'])
</script>

<template>
  <label class="relative w-full">
    <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-700 dark:text-white">
      <svg xmlns="http://www.w3.org/2000/svg"
           viewBox="0 0 20 20"
           fill="currentColor"
           class="w-5 h-5"
      >
        <path fill-rule="evenodd"
              d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
              clip-rule="evenodd"
        />
      </svg>
    </span>
    <input :value="modelValue"
           @input="$emit('update:modelValue',($event.target as HTMLInputElement)?.value)"
           :placeholder="placeholder"
           class="text-gray-700 w-full dark:text-white bg-white dark:placeholder:text-white dark:bg-blue-700 pl-10 pr-4 py-2 rounded-md shadow-md "
    />
  </label>
</template>

<style scoped>

</style>
