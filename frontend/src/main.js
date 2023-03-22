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
const app = createApp(App)
registerPlugins(app)

app.use(store).mount('#app')
