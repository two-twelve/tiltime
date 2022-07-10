import { createApp } from 'vue'
import App from './App.vue'

import { store, key } from './store'
store.commit('initialiseStore')

import router from './router'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import './plugins/fontawesome'

createApp(App).use(store, key).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
