import Login from './components/Login'
import Error from './components/Error'
import Movimenti from './components/Movimenti'
import Movimento from './components/Movimento'
import Nuovo from './components/Nuovo'
import ToolbarLogin from './components/Toolbars/ToolbarLogin'
import ToolbarMovimenti from './components/Toolbars/ToolbarMovimenti'
import ToolbarMovimento from './components/Toolbars/ToolbarMovimento'
import ToolbarNuovo from './components/Toolbars/ToolbarNuovo'

import store from './store/store'

export const routes = [
    { name: "login", path: '/login', components: {
        default: Login,
        toolbar: ToolbarLogin
      } },
    { path: '/', beforeEnter(to, from, next) {
            if (store.getters.getToken) {
                next('/movimenti')
            } else {
                next('/login')
            }
        }
    },
    { name: "movimenti", path: '/movimenti',  components: {
        default: Movimenti,
        toolbar: ToolbarMovimenti
      }, beforeEnter(to, from, next) {
            if (store.getters.getToken) {
                next()
            } else {
                next('/login')
            }
        }
    },
    { name: "movimento", path: '/movimento/:id',  components: {
        default: Movimento,
        toolbar: ToolbarMovimento
      }, beforeEnter(to, from, next) {
            if (store.getters.getToken) {
                next()
            } else {
                next('/login')
            }
        }
    },
    { name: "nuovo", path: '/nuovo',  components: {
        default: Nuovo,
        toolbar: ToolbarNuovo
      }, beforeEnter(to, from, next) {
            if (store.getters.getToken) {
                next()
            } else {
                next('/login')
            }
        }
    },
    {path: "/error", name:"error",  component: Error,  props: true}  
]