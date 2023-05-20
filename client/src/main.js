import App from './App.vue'
import { createApp, provide} from 'vue'
import { registerPlugins } from '@/plugins'
import eventbus from '@/plugins/eventBus'
import store from './stores/notification';
const app = createApp(App)

registerPlugins(app)

app.config.globalProperties.$eventbus = eventbus // เพิ่ม $eventbus เป็น global property
app.use(store);
app.mount('#app')
