import './assets/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'


import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {faMoon, faSun} from '@fortawesome/free-regular-svg-icons'
import {faArrowLeft, faMagnifyingGlass, faPersonRunning, faPersonCircleExclamation} from '@fortawesome/free-solid-svg-icons'

library.add(faMoon, faSun, faArrowLeft, faMagnifyingGlass, faPersonRunning, faPersonCircleExclamation)

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
