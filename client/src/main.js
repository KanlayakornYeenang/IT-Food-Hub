import App from './App.vue'
import { createApp } from 'vue'
import { registerPlugins } from '@/plugins'
import eventbus from '@/eventBus'

const app = createApp(App)

registerPlugins(app)

app.config.globalProperties.$eventbus = eventbus // เพิ่ม $eventbus เป็น global property

app.mount('#app')
