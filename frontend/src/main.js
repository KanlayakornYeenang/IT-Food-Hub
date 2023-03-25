/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

// pinia
import { createPinia } from 'pinia'
const store = createPinia()

// fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHouse, faBasketShopping, faReceipt, faStore, faHand } from '@fortawesome/free-solid-svg-icons'
library.add(faHouse, faBasketShopping, faReceipt, faStore, faHand)

const app = createApp(App).component('font-awesome-icon', FontAwesomeIcon)

registerPlugins(app)

app.use(store).mount('#app')
