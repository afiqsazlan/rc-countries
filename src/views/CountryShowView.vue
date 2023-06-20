<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import axios from "axios";
import BackButton from "@/components/BackButton.vue";
import CountryDetailsItem from "@/components/CountryDetailsItem.vue";

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
  <div class="px-8 flex flex-col justify-center items-center">
    <div class="w-full md:max-w-5xl">

      <div class="w-full ">
        <BackButton/>
      </div>
      <div v-if="isFetching">
        Is fetching...
      </div>
      <div v-else-if="!country">
        No country found
      </div>
      <div v-else>
        <div class="mt-12 lg:mt-24 grid grid-cols-1 lg:grid-cols-2 items-center gap-16">

          <!-- Flag -->
          <div class="w-full ">
            <img :src="country.flag_image_url"
                 :alt="country.flag_image_alt"
                 class="object-contain w-full h-auto"
            />
          </div>

          <!--  Details -->
          <div>
            <h1 class="text-2xl font-bold">{{ country.name_common }}</h1>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start mt-6 lg:mt-9">
              <ul class="space-y-2">
                <li>
                  <CountryDetailsItem label="Native Name" :value="country.name_native"/>
                </li>
                <li>
                  <CountryDetailsItem label="Population" :value="country.population"/>
                </li>
                <li>
                  <CountryDetailsItem label="Region" :value="country.region"/>
                </li>
                <li>
                  <CountryDetailsItem label="Sub Region" :value="country.sub_region"/>
                </li>
                <li>
                  <CountryDetailsItem label="Capital" :value="country.capital"/>
                </li>
              </ul>
              <ul class="space-y-2">
                <li>
                  <CountryDetailsItem label="Top Level Domain" :value="country.top_level_domain?.join(', ')"/>
                </li>
                <li>
                  <CountryDetailsItem label="Currencies" :value="country.currencies?.join(', ')"/>
                </li>
                <li>
                  <CountryDetailsItem label="Languages" :value="country.languages?.join(', ')"/>
                </li>
              </ul>
            </div>

            <div v-if="country.bordering_countries.length"
                 class="mt-8 space-y-4"
            >
              <p class="font-bold">Border Countries:</p>
              <ul class="grid grid-cols-2 lg:grid-cols-3 gap-4">
                <li v-for="country in country.bordering_countries"
                    :key="`bordering-country-${country}`"
                >
                  <router-link :to="{name: 'countries.show', params: {country: country}}">
                    <div class=" w-full h-full flex justify-center items-center text-center bg-white dark:bg-blue-700 border hover:border-blue-900 border-gray-100 dark:border-blue-700 hover:dark:border-white transition duration-200 ease-in-out  px-6 py-2 space-x-2 rounded-sm drop-shadow">
                      <span class="line-clamp-2 text-sm">{{ country }}</span>
                    </div>
                  </router-link>
                </li>
              </ul>
            </div>
          </div>


        </div>


      </div>
    </div>
  </div>

</template>

<style scoped>

</style>
