import axios from 'axios'

const state = {
    movimenti: [],
    movimento: null,
}

const mutations = {
    clearData(state) {
        state.movimenti = [],
        state.movimento = null
    },
    setMovimento(state, movimento) {
        state.movimento = movimento
    },
    setMovimenti(state, movimenti) {
        state.movimenti = movimenti
    }
}

const actions = {
    fetchMovimenti({ commit, dispatch, rootState }) {
        return new Promise((resolve, reject) => {
            axios.get('/movimento/lavorazione/' 
                + rootState.utente.dipendente)
            .then(res => {
                // eslint-disable-next-line
                console.log(res)
                commit('setMovimenti', res.data)
                resolve()
            }).catch(error => {
                // eslint-disable-next-line
                console.log(error)
                dispatch('handleError', error.response.data)
                reject()
            })
        })
    },
    setMovimento({ commit }, movimento) {
        commit('setMovimento', movimento)
    }
}

const getters = {
    getMovimento(state) {
        return state.movimento
    },
    getMovimenti(state) {
        return state.movimenti
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}