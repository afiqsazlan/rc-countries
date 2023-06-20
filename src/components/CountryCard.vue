<script setup lang="ts">
interface Country {
  name: string;
  population?: string;
  region?: string;
  capital?: string;
  flag_image_url?: string;
  flag_image_alt?: string;
}

defineProps({
  country: {
    type: Object as () => Country,
    required: true
  }
})
</script>

<template>
  <div class="bg-white dark:bg-blue-700 border border-white hover:border-gray-700 dark:border-blue-700 hover:dark:border-gray-100 transition duration-200 hover:dark:bg-white hover:dark:bg-opacity-10 ease-in-out h-full w-full shadow  rounded-sm">
    <div class=" items-center flex flex-col px-1 lg:px-2 pt-4 lg:pt-2 justify-center overflow-hidden h-1/2 ">
      <img :src="country.flag_image_url"
           :alt="country.flag_image_alt"
           class="object-contain h-full border border-gray-100 dark:border-0"
      >
    </div>
    <div class="p-4 space-y-2 mt-4 lg:mt-0">
      <p class="text-xl lg:text-base font-bold lg:line-clamp-3 lg:min-h-[3rem]">
        {{ country.name }}
      </p>
      <ul class="text-sm py-4 lg:py-2 space-y-1">
        <li>
          <span class="font-semibold">Population: </span>
          <span>{{ country.population }}</span>
        </li>
        <li>
          <span class="font-semibold">Region: </span>
          <span>{{ country.region }}</span>
        </li>
        <li>
          <span class="font-semibold">Capital: </span>
          <span>{{ country.capital }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>

</style>
