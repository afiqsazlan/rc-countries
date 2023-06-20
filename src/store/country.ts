import {defineStore} from 'pinia'
import axios from "axios";
import {state} from "vue-tsc/out/shared";

const apiUrl = 'https://restcountries.com/v3.1'
export const useStore = defineStore('country', {

    state: () => {
        return {
            isFetching: true,
            countries: []
        }
    },

    actions: {
        async fetchAllCountries() {
            let countriesFetched;
            this.setIsFetching()
            try {
                const response = await axios.get(`${apiUrl}/all?fields=name,population,region,capital,flags`)
                countriesFetched = {
                    success: true,
                    data: this.mapCountriesDetails(response.data)
                }
            } catch (e) {
                countriesFetched = {
                    success: false,
                    errors: e
                }
            }
            this.setIsFetching(false)
            return countriesFetched;
        },

        async searchCountriesByName(name: string) {

            let countriesFetched;
            this.setIsFetching()

            try {
                const response = await axios.get(`${apiUrl}/name/${name}?fields=name,population,region,capital,flags`)
                countriesFetched = {
                    success: true,
                    data: this.mapCountriesDetails(response.data)
                }
            } catch (e) {
                countriesFetched = {
                    success: false,
                    errors: e
                }
            }

            this.setIsFetching(false)
            return countriesFetched;
        },

        async searchCountriesByRegion(region: string) {


            let countriesFetched;
            this.setIsFetching()

            try {
                const response = await axios.get(`${apiUrl}/region/${region}?fields=name,population,region,capital,flags`)
                countriesFetched = {
                    success: true,
                    data: this.mapCountriesDetails(response.data)
                }
            } catch (e) {
                countriesFetched = {
                    success: false,
                    errors: e
                }
            }

            this.setIsFetching(false)
            return countriesFetched;

        },

        setIsFetching(value = true) {
            this.isFetching = value;
        },

        mapCountriesDetails(countries: Array<any>) {
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
    }
})
