<script setup lang="ts">
import axios from "axios";
import {onMounted, ref, watch} from 'vue'
import debounce from 'lodash.debounce'

let isFetching = ref(true);
let countries = ref([]);
const search = ref('');

onMounted(async () => {
  const countriesFetched = await fetchCountries()
  // const countriesFetched = await fetchCountries()
  if (countriesFetched.success) {
    countries.value = countriesFetched.data
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


watch(search, async (search) => {

})

async function fetchCountries() {

  try {
    setIsFetching()
    const response = await axios.get("https://restcountries.com/v3.1/all")
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

    const response = await axios.get(`https://restcountries.com/v3.1/name/${name}`)
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

function setIsFetching(value = true) {
  isFetching.value = value;
}

</script>

<template>
  <main>
    <div class="">
      <div class="flex flex-row justify-between">
        <input v-model="search"
               placeholder="Search for a country..."
        />
        <select>
          <option>Filter by Region</option>
        </select>
      </div>

      <div v-if="isFetching">
        Is fetching..
      </div>
      <div v-else-if="!countries.length">
        No countries found.
      </div>
      <div v-else
           class="px-8"
      >
        <ul class="grid grid-cols-4 gap-8 ">
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
  </main>
</template>
