// imports

import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store/store'
import './registerServiceWorker'
import axios from 'axios'
import 'vue-event-calendar/dist/style.css' //^1.1.10, CSS has been extracted as one file, so you can easily update it.
import vueEventCalendar from 'vue-event-calendar'
import VeeValidate from 'vee-validate';
import '@/assets/scss/main.scss'
import * as VueGoogleMaps from 'vue2-google-maps'
import FullCalendar from 'vue-full-calendar'
import VueClipboard from 'vue-clipboard2'
import SocialSharing from 'vue-social-sharing';
 
Vue.use(SocialSharing);

Vue.use(VueClipboard)
// Axios

axios.defaults = {
  credentials: true,
  origin: 'http://localhost:3000'
}

// Vue 

Vue.config.productionTip = false

// Vue use

Vue.use(VeeValidate);
Vue.use(vueEventCalendar, {
  locale: 'en'
})
Vue.use(require('vue-moment'));
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDoi7G5B3YG0m2gZ_mxK_uTd7OmkRYvaWE',
    libraries: 'places',
  },
})
Vue.use(FullCalendar)

// Vue filter

Vue.filter('validTime', (num) => {
  var str = num.toString();
  return str.length === 1 ? "0" + str : str;
})

// Vue.filter('dateMoment', (time) => {
// return moment(time).format()
// })

// New Vue

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')