import Vue from 'vue'
import Vuex from 'vuex'

import utente from './modules/utente'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        utente
    },
})