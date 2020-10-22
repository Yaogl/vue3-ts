import type { App } from 'vue'
import { createStore } from 'vuex'
import { config } from 'vuex-module-decorators'
import persistedState from 'vuex-persistedstate'
import User from './modules/user'
import Question from './modules/question'
config.rawError = true

const store = createStore({modules: {User, Question}, plugins: [persistedState()]})
export function setupStore(app: App<Element>) {
  app.use(store)
}
export default store;