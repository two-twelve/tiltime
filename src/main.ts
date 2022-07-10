import { createApp } from 'vue'
import App from './App.vue'

import { store, key } from './store'
store.commit('initialiseStore')

import router from './router'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faDownload as pwaInstall,
  faSyncAlt as pwaUpdate,
  faUserCircle as user,
  faHourglassStart as startTime,
  faHourglassEnd as endTime,
  // faCheckCircle as selectedCheckbox,
  faDotCircle as selectedRadioButton,
  faShareNodes as share,
  faTimes as cross,
  faPlus as plus,
  faArrowCircleLeft as arrowLeft,
  faArrowCircleRight as arrowRight,
  faCogs as settings,
  faGlobeEurope as globeEurope,
  faExclamationCircle as warning,
} from '@fortawesome/free-solid-svg-icons'
import {
  faUserCircle as userSelected,
  faCircle as unselectedRadioOrCheckbox,
} from '@fortawesome/free-regular-svg-icons'
import { faTwitter as twitter } from '@fortawesome/free-brands-svg-icons'
library.add(
  pwaInstall,
  pwaUpdate,
  user,
  userSelected,
  startTime,
  endTime,
  unselectedRadioOrCheckbox,
  selectedRadioButton, //selectedCheckbox, // Currently no checkboxes in app
  share,
  cross,
  plus,
  arrowLeft,
  arrowRight,
  settings,
  globeEurope,
  warning,
  twitter
)

createApp(App).use(store, key).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
