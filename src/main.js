import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'

import store from './store/store'
import router from './router'
import axios from 'axios'
import moment from 'moment'


axios.defaults.baseURL = 'http://localhost:8080/spweb/rest'

Vue.prototype.moment = moment

Vue.filter('truncate', function (value) {
    if (!value) return ''
    value = value.toString()
    if(value.length > 50)
      return value.substring(0, 49) + "..."
    return value
  }
)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')