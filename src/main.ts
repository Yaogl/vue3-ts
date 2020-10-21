import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { setupStore } from './store';
import Vant from 'vant';
import 'vant/lib/index.css';
import 'lib-flexible/flexible.js'
const app = createApp(App)
  app.use(router)
  app.use(Vant)
  setupStore(app)
  app.mount('#app')
