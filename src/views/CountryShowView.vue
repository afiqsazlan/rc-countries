<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import BackButton from "@/components/BackButton.vue";

const countryParam = ref<string | null>(null);
const countryFullName = ref<string | null>(null);
const isFetching = ref<boolean>(true)

let country = ref<object | null>(null)

onMounted(async () => {

  // Get country name
  const route = useRoute();
  countryParam.value = route.params.country as string;

  // Convert to
  countryFullName.value = countryParam.value.toString().replaceAll('-', ' ')

  const countryFound = await searchCountryByFullName(countryFullName.value)

  console.log(`success: ${countryFound.success}`)
  if (countryFound.success) {
    const details = countryFound.data[0]

    console.log({details})
    country.value = {
      name_common: details.name?.common,
      name_native: getCountryNativeName(details.name?.nativeName),
      population: details.population,
      region: details.region,
      sub_region: details.subregion,
      capital: details?.capital ? details.capital[0] : null,
      top_level_domain: details.tld,
      flag_image_url: details.flags?.png,
      flag_image_alt: details.flags?.alt,
      currencies: getCountryCurrencies(details.currencies),
      languages: Object.values(details.languages),
      bordering_countries: await getCountriesFromCodes(details.borders)
    }

    console.log({country: country})
  }
})

function getCountryCurrencies(currencies) {
  return Object.values(currencies).map((currency) => {
    return currency.name;
  })
}

function getCountryNativeName(nativeName) {

  if (!nativeName) {
    return 'N/A';
  }

  const keys = Object.keys(nativeName);

  return nativeName[keys[0]]?.common;
}


async function searchCountryByFullName(name) {
  try {
    setIsFetching()

    const response = await axios.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
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


async function getCountriesFromCodes(codes) {
  try {
    const response = await axios.get(`https://restcountries.com/v3.1/alpha?codes=${codes}&fields=name`)
    return response.data.map((country) => {
      return country.name?.common;
    })
  } catch (e) {
    return []
  }
}


function setIsFetching(value = true) {
  isFetching.value = value;
}


</script>

<template>
  <div class="px-8 flex  flex-col justify-center items-center">
    <div class="w-full md:max-w-5xl">
      <div v-if="isFetching">
        Is fetching...
      </div>
      <div v-else-if="!country">
        No country found
      </div>
      <div v-else>
        <div>
          <BackButton/>
        </div>

        <div class="mt-8">
          <img :src="country.flag_image_url"
               :alt="country.flag_image_alt"
          />
          <h1>{{ country.name_common }}</h1>
          <ul>
            <li><span>Native Name:</span> {{ country.name_native }}</li>
            <li><span>Population:</span> {{ country.population }}</li>
            <li><span>Region:</span> {{ country.region }}</li>
            <li><span>Sub Region:</span> {{ country.sub_region }}</li>
            <li><span>Capital:</span> {{ country.capital }}</li>
          </ul>
          <ul class="mt-8">
            <li><span>Top Level Domain:</span> {{ country.top_level_domain?.join(', ') }}</li>
            <li><span>Currencies:</span> {{ country.currencies?.join(', ') }}</li>
            <li><span>Languages:</span> {{ country.languages?.join(', ') }}</li>
          </ul>
        </div>

        <div v-if="country.bordering_countries.length" class="space-y-4">
          <p>Border Countries:</p>
          <ul class="grid grid-cols-3 gap-4">
            <li v-for="country in country.bordering_countries"
                :key="`bordering-country-${country}`"
            >
              <router-link :to="{name: 'countries.show', params: {country: country}}"
                           class="flex justify-center py-2 rounded-sm bg-blue-700 hover:bg-opacity-80 drop-shadow"
              >
                {{ country }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    </div>

</template>

<style scoped>

</style>
