<script setup lang="ts">
import {onMounted, ref, watch} from 'vue'
import debounce from 'lodash.debounce'
import SearchInput from "@/components/SearchInput.vue";
import SelectInput from "@/components/SelectInput.vue";
import CountryCard from "@/components/CountryCard.vue";
import FetchingDataScreen from "@/components/FetchingDataScreen.vue";
import NotFoundScreen from "@/components/NotFoundScreen.vue";
import {useStore} from "@/store/country";

interface Country {
  name: string;
  population?: number;
  region?: string;
  capital?: string;
  flag_image_url?: string;
  flag_image_alt?: string;
  slug?: string;
}

const filteredCountries = ref<Country[]>([]);
const search = ref('');
const selectedRegion = ref('');

// Store
const store = useStore()

const regions = [
  {value: 'Asia', label: 'Asia'},
  {value: 'Oceania', label: 'Oceania'},
  {value: 'Americas', label: 'Americas'},
  {value: 'Europe', label: 'Europe'},
  {value: 'Antarctic', label: 'Antarctic'},
  {value: 'Africa', label: 'Africa'},
]

onMounted(async () => {
  const countriesFetched = await store.fetchAllCountries()
  if (countriesFetched.success) {
    store.countries = countriesFetched.data
    filteredCountries.value = store.countries;
  }
})

// Handle search
watch(search, debounce(async (search) => {

  // If search is not reset due to region selected, restore all countries
  if (!search) {
    if (!selectedRegion.value) {
      filteredCountries.value = store.countries;
    }
    return;
  }

  resetSelectedRegion();

  const countriesFetched = await store.searchCountriesByName(search)

  if (countriesFetched.success) {
    filteredCountries.value = countriesFetched.data
  } else {
    filteredCountries.value = []
  }
}, 500))

// Handle selectedRegion
watch(selectedRegion, debounce(async (region) => {

  // If region is not reset due to search updated, restore all countries
  if (!region) {
    if (!search.value) {
      filteredCountries.value = store.countries;
    }
    return;
  }

  resetSearch();

  const countriesFetched = await store.searchCountriesByRegion(region)

  if (countriesFetched.success) {
    filteredCountries.value = countriesFetched.data
  } else {
    filteredCountries.value = []
  }
}, 500))


function resetSelectedRegion() {
  selectedRegion.value = ''
}

function resetSearch() {
  search.value = ''
}

</script>

<template>
  <div class=" flex  flex-col justify-center items-center">
    <div
        class="w-full px-4 md:px-12 lg:px-16 flex justify-center py-16 bg-gradient-to-r from-[#4f46e5] dark:from-[#312e81] dark:to-[#0284c7] to-sky-500 dark:bg-white text-white dark:text-white ">
      <div class="w-full md:max-w-5xl">
        <h1 class="text-5xl lg:text-7xl font-bold ">
          Where in the world?
        </h1>
        <h2 class="mt-2 text-lg lg:text-xl font-semibold lg:px-2">
          Discover, Learn, and Experience the World
        </h2>
        <p class="mt-6 lg:mt-8 lg:px-2 text-sm w-full lg:w-1/2 leading-5">
          Unveil essential facts and information about countries around the world.
          Whether you're a student, a traveler, or simply curious about the world, our website provides a convenient
          resource to access the basic facts you need. From official languages to currency and time zones, we have
          gathered the key details to help you gain a better understanding of different countries.
        </p>
      </div>
    </div>
    <div class="w-full md:max-w-5xl mt-24">
      <!-- Search and Filter -->
      <div class="flex px-4 w-full md:px-12 flex-col space-y-4 md:space-y-0 md:flex-row md:justify-between">
        <SearchInput v-model="search" class="w-full md:w-1/2"
                     placeholder="Search for a country..."
        />
        <SelectInput v-model="selectedRegion"
                     :options="regions"
                     placeholder="Select a region"
        />
      </div>

      <div class="mt-24 md:mt-12">
        <FetchingDataScreen v-if="store.isFetching"/>
        <NotFoundScreen v-else-if="!filteredCountries.length"/>
        <div v-else
             class="px-4 md:px-12"
        >
          <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8  ">
            <li v-for="(country, index) in filteredCountries"
                :key="`country-${index}`"
                class=" h-auto lg:min-h-[22rem] "
            >
              <router-link :to="{name: 'countries.show', params: {country:country.slug}}">
                <CountryCard :country="country"/>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
