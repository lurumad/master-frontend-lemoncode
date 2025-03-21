import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query'

import App from './App.vue'
import router from './router'

import './assets/styles.css'

async function prepareApp() {
  const { worker } = await import('./mocks/browser')
  return worker.start()
}

const app = createApp(App)

const queryClient = new QueryClient()

app.use(VueQueryPlugin, { queryClient, enableDevtoolsV6Plugin: true })
app.use(createPinia())
app.use(router)

prepareApp().then(() => {
  app.mount('#app')
})
