<script setup lang="ts">
import axios from "axios";
import {onMounted, ref, watch} from 'vue'
import debounce from 'lodash.debounce'

let isFetching = ref(true);
let countries = ref([]);
const search = ref('');
const selectedRegion = ref('');

const regions = [
  'Asia',
  'Oceania',
  'Americas',
  'Europe',
  'Antarctic',
  'Africa',
]

onMounted(async () => {
  const countriesFetched = await fetchCountries()
  // const countriesFetched = await fetchCountries()
  if (countriesFetched.success) {
    countries.value = countriesFetched.data
    console.log(countries.value)
  } else {
    console.log(countriesFetched)
  }
})


watch(search, debounce(async (search) => {
  let countriesFetched = [];
  if (search) {
    countriesFetched = await searchCountriesByName(search)
  } else {
    countriesFetched = await fetchCountries()
  }

  if (countriesFetched.success) {
    countries.value = countriesFetched.data
  } else {
    countries.value = []
  }
}, 500))

watch(selectedRegion, debounce(async (region) => {
  let countriesFetched = [];
  if (region) {
    countriesFetched = await searchCountriesByRegion(region)
  } else {
    countriesFetched = await fetchCountries()
  }

  if (countriesFetched.success) {
    countries.value = countriesFetched.data
  } else {
    countries.value = []
  }
}, 500))

async function fetchCountries() {

  try {
    setIsFetching()
    const response = await axios.get("https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags")
    console.log(response.data[0])
    setIsFetching(false);

    return {
      success: true,
      data: response.data
    }
  } catch (e) {
    setIsFetching(false);
    console.log(e)
    return {
      success: false,
      errors: e
    }
  }
}

async function searchCountriesByName(name) {
  try {
    setIsFetching()

    const response = await axios.get(`https://restcountries.com/v3.1/name/${name}?fields=name,population,region,capital,flags`)
    console.log(response.data[0])
    setIsFetching(false);

    return {
      success: true,
      data: response.data
    }
  } catch (e) {
    console.log(e)
    setIsFetching(false);

    return {
      success: false,
      errors: e
    }
  }
}

async function searchCountriesByRegion(region) {
  try {
    setIsFetching()

    const response = await axios.get(`https://restcountries.com/v3.1/region/${region}?fields=name,population,region,capital,flags`)
    console.log(response.data[0])
    setIsFetching(false);

    return {
      success: true,
      data: response.data
    }
  } catch (e) {
    console.log(e)
    setIsFetching(false);

    return {
      success: false,
      errors: e
    }
  }
}

function resetSelectedRegion() {
  selectedRegion.value = ''
}

function resetSearch() {
  search.value = ''
}

function setIsFetching(value = true) {
  isFetching.value = value;
}

</script>

<template>
  <div class=" flex  flex-col justify-center items-center">
    <div class="max-w-5xl">
      <div class="flex px-4 w-full md:px-12 flex-col space-y-4 md:space-y-0 md:flex-row md:justify-between">
        <input v-model="search"
               placeholder="Search for a country..."
               class="bg-blue-700 md:w-1/2 px-4 py-2 rounded-md"
        />
        <select v-model="selectedRegion" class="bg-blue-700 px-4 py-2 rounded-md"

        >
          <option selected :value="null">Filter by Region</option>
          <option v-for="region in regions"
                  :key="`region-${region}`"
          >
            {{ region }}
          </option>
        </select>
      </div>

      <div class="mt-24 md:mt-12">
        <div v-if="isFetching">
          Is fetching..
        </div>
        <div v-else-if="!countries.length">
          No countries found.
        </div>
        <div v-else
             class="px-4 md:px-12"
        >
          <ul class="grid grid-cols-1 md:grid-cols-4 gap-8 ">
            <li v-for="(country, index) in countries"
                :key="`country-${index}`"
            >
              <div class="bg-blue-700 h-full w-full">
                <div>
                  <img :src="country.flags.png"
                       :alt="country.flags.alt"
                  >
                </div>
                <div class="p-4">
                  <p class="font-bold py-2">
                    {{ country.name?.common }}
                  </p>
                  <ul class="text-xs py-2">
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
                      <span>{{ country?.capital ? country?.capital[0] : 'N/A' }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
