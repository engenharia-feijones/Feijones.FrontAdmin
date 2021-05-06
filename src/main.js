import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import VueTheMask from 'vue-the-mask'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.config.productionTip = false
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyD-tYZPzEoP3t1R_0vKXy6epwDSFsh8yMU',
    libraries: 'places'
  }
})
Vue.use(VueTheMask)

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
