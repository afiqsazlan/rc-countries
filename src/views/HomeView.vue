<script setup lang="ts">
import axios from "axios";
import {onMounted, ref, watch} from 'vue'
import debounce from 'lodash.debounce'
import SearchInput from "@/components/SearchInput.vue";
import SelectInput from "@/components/SelectInput.vue";
import CountryCard from "@/components/CountryCard.vue";
import FetchingDataScreen from "@/components/FetchingDataScreen.vue";
import NotFoundScreen from "@/components/NotFoundScreen.vue";

let isFetching = ref(true);
let countries = ref([]);
const search = ref('');
const selectedRegion = ref('');

const regions = [
  {value: 'Asia', label: 'Asia'},
  {value: 'Oceania', label: 'Oceania'},
  {value: 'Americas', label: 'Americas'},
  {value: 'Europe', label: 'Europe'},
  {value: 'Antarctic', label: 'Antarctic'},
  {value: 'Africa', label: 'Africa'},
]

onMounted(async () => {
  const countriesFetched = await fetchCountries()
  if (countriesFetched.success) {
    countries.value = countriesFetched.data
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
    setIsFetching(false);

    return {
      success: true,
      data: mapCountriesDetails(response.data)
    }
  } catch (e) {
    setIsFetching(false);
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
    setIsFetching(false);

    return {
      success: true,
      data: mapCountriesDetails(response.data)
    }
  } catch (e) {
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
    setIsFetching(false);

    return {
      success: true,
      data: mapCountriesDetails(response.data)
    }
  } catch (e) {
    setIsFetching(false);

    return {
      success: false,
      errors: e
    }
  }
}

function mapCountriesDetails(countries) {
  return countries.map((country) => {
    return {
      name: country.name?.common ?? 'N/A',
      capital: country?.capital ? country?.capital[0] : 'N/A',
      region: country.region ?? 'N/A',
      population: country.population ?? 'N/A',
      flag_image_url: country.flags?.png ?? 'N/A',
      flag_image_alt: country.flags?.alt ?? 'N/A',
      slug: country.name?.common?.toLowerCase().replace(/\s+/g, "-")
    }
  })
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
        <FetchingDataScreen v-if="isFetching" />
        <NotFoundScreen v-else-if="!countries.length"/>
        <div v-else
             class="px-4 md:px-12"
        >
          <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8  ">
            <li v-for="(country, index) in countries"
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
