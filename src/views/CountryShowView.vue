<script setup lang="ts">
import {onBeforeMount, onMounted, ref, watch} from "vue";
import {useRoute} from "vue-router";
import axios from "axios";
import {convertStringToUrlFriendly, convertUrlFriendlyToText} from "../utils/country";
import BackButton from "../components/BackButton.vue";
import FetchingDataScreen from "../components/FetchingDataScreen.vue";
import NotFoundScreen from "../components/NotFoundScreen.vue";
import CountryDetailsItem from "../components/CountryDetailsItem.vue";

const route = useRoute();

const countryParam = ref(null);
const countryFullName = ref(null);
const isFetching = ref(true)

let country = ref(null)

onMounted(async () => {

  // Get country name
  countryParam.value = route.params.country as string;

  countryFullName.value = convertUrlFriendlyToText(countryParam.value as string)

  // Set page title
  document.title = `${import.meta.env.VITE_APP_NAME} - ${countryFullName.value}`;

  setIsFetching();

  const countryFound = await searchCountryByFullName(countryFullName.value)

  console.log(countryFound)
  if (countryFound.success) {
    country.value = await mapCountryDetails(countryFound.data[0])
  }

  setIsFetching(false);

})


watch(
    () => route.params.country,
    async nextCountrySlug => {
      resetCountry();
      setIsFetching();

      const nextCountryName = convertUrlFriendlyToText(nextCountrySlug as string)
      const countryFound = await searchCountryByFullName(nextCountryName)

      if (countryFound.success) {
        country.value = await mapCountryDetails(countryFound.data[0])
      }

      console.log('Should set fetch false')

      setIsFetching(false);
    }
)

function getCountryCurrencies(currencies: Currency[]) {
  return Object.values(currencies).map((currency) => {
    return currency.name;
  })
}


function getCountryNativeName(nativeName) {
  const keys = Object.keys(nativeName);
  return nativeName[keys[0]]?.common;
}


async function searchCountryByFullName(name) {
  try {
    const response = await axios.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
    return {
      success: true,
      data: response.data
    }
  } catch (e) {
    return {
      success: false,
      errors: e
    }
  }
}

async function mapCountryDetails(details) {
  console.log(details)
  return {
    name_common: details.name?.common,
    name_native: details.name?.nativeName ? getCountryNativeName(details.name.nativeName) : 'N/A',
    population: details.population,
    region: details.region,
    sub_region: details.subregion,
    capital: details?.capital ? details.capital[0] : 'N/A',
    top_level_domain: details.tld,
    flag_image_url: details.flags?.png,
    flag_image_alt: details.flags?.alt,
    currencies: details.currencies ? getCountryCurrencies(details.currencies) : [],
    languages: details.languages ? Object.values(details.languages) : [],
    bordering_countries: await getCountriesFromCodes(details.borders)
  }
}

function resetCountry() {
  country.value = null;
}


async function getCountriesFromCodes(codes) {
  if (!codes) {
    return []
  }
  try {
    const response = await axios.get(`https://restcountries.com/v3.1/alpha?codes=${codes}&fields=name`)
    return response.data.map((country) => {
      return {
        name: country.name?.common,
        slug: convertStringToUrlFriendly(country.name?.common)
      };
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
  <div class="px-8 flex pt-8 flex-col justify-center items-center">
    <div class="w-full md:max-w-5xl">

      <div class="w-full ">
        <BackButton/>
      </div>
      <FetchingDataScreen v-if="isFetching"/>
      <NotFoundScreen v-else-if="!country"/>
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
                  <CountryDetailsItem label="Sub Region"
                                      :value="country.sub_region ?? 'N/A'"
                  />
                </li>
                <li>
                  <CountryDetailsItem label="Capital" :value="country.capital"/>
                </li>
              </ul>
              <ul class="space-y-2">
                <li>
                  <CountryDetailsItem label="Top Level Domain"
                                      :value="country.top_level_domain.length ? country.top_level_domain?.join(', ') : 'N/A' "
                  />
                </li>
                <li>
                  <CountryDetailsItem label="Currencies"
                                      :value="country.currencies.length ? country.currencies?.join(', ') : 'N/A' "
                  />
                </li>
                <li>
                  <CountryDetailsItem label="Languages"
                                      :value="country.languages.length ? country.languages?.join(', ') : 'N/A'"/>
                </li>
              </ul>
            </div>

            <div v-if="country.bordering_countries?.length"
                 class="mt-8 space-y-4"
            >
              <p class="font-bold">Border Countries:</p>
              <ul class="grid grid-cols-2 lg:grid-cols-3 gap-4">
                <li v-for="country in country.bordering_countries"
                    :key="`bordering-country-${country}`"
                >
                  <router-link :to="{name: 'countries.show', params: {country: country.slug }}">
                    <div
                        class=" w-full h-full flex justify-center items-center text-center bg-white dark:bg-blue-700 border hover:border-blue-900 border-gray-100 dark:border-blue-700 hover:dark:border-white transition duration-200 ease-in-out  px-6 py-2 space-x-2 rounded-sm drop-shadow">
                      <span class="line-clamp-2 text-sm">
                        {{ country.name }}
                      </span>
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
