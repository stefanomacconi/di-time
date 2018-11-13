import axios from 'axios'

const state = {
    movimenti: [],
    movimento: null
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
    },
    addMovimenti(state, movimenti) {
        movimenti.forEach(movimento => {
            state.movimenti.push(movimento)
        });
    }
}

const actions = {
    fetchMovimenti({ commit, dispatch, rootState }, offset) {
        return new Promise((resolve, reject) => {
            var path = '/movimento/lavorazione/' 
            + rootState.utente.dipendente + "/"
            + 50 + "/" //fixed limit
            if (offset) {
               path = path + offset 
            }
            axios.get(path)
            .then(res => {
                // eslint-disable-next-line
                console.log(res)
                if (offset) {
                    commit('addMovimenti', res.data)
                } else {
                    commit('setMovimenti', res.data)
                }
                resolve(res)
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