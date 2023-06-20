<script setup lang="ts">
import {onMounted, ref, watch} from 'vue'
import debounce from 'lodash.debounce'
import SearchInput from "@/components/SearchInput.vue";
import SelectInput from "@/components/SelectInput.vue";
import CountryCard from "@/components/CountryCard.vue";
import FetchingDataScreen from "@/components/FetchingDataScreen.vue";
import NotFoundScreen from "@/components/NotFoundScreen.vue";
import {useStore} from "@/store/country";

let filteredCountries = ref([]);
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
    store.countries = countriesFetched?.data
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
    <div class="w-full md:max-w-5xl">

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
