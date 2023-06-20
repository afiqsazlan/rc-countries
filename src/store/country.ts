import {defineStore} from 'pinia'
import axios from "axios";
import {convertStringToUrlFriendly} from "@/utils/country";


interface CountryProp {
    name: {
        common: string,
    },
    capital: string,
    region: string,
    population: number,
    flags: {
        png: string,
        alt: string
    }
}

interface Country {
    name: string;
    population?: number;
    region?: string;
    capital?: string;
    flag_image_url?: string;
    flag_image_alt?: string;
    slug?: string;
}

interface CountryDetails{
    name_common: string,
    name_native: string,
    population?: number;
    region?: string;
    sub_region?: string;
    capital?: string;
    top_level_domain: string;
    flag_image_url: string;
    flag_image_alt: string;
    currencies: Array<string>;
    languages: Array<string>;
    bordering_countries: Array<{ name: string, slug?: string }>;
}

interface FetchCountriesResponse {
    success: Boolean,
    data: Country[],
}

interface FindCountryResponse {
    success: Boolean,
    data: CountryDetails
}

const apiUrl = 'https://restcountries.com/v3.1'
export const useStore = defineStore('country', {

    state: () => {
        return {
            isFetching: true,
            countries: []
        }
    },

    actions: {
        async fetchAllCountries(): Promise<FetchCountriesResponse> {
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

        async searchCountriesByName(name: string): Promise<FetchCountriesResponse> {

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

        async searchCountriesByRegion(region: string): Promise<FetchCountriesResponse> {


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


        mapCountriesDetails(countries: CountryProp[]) {
            return countries.map((country: CountryProp): Country => {
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

