const state = {
    tab: 0,
    isNewMov: false
}

const mutations = {
    setTab(state, tab) {
        state.tab = tab
    },
    setIsNewMov(state, value) {
        state.isNewMov = value
    },
}

const actions = {
    setTab({ commit }, tab) {
        commit('setTab', tab)
    },
    setIsNewMov({ commit }, value) {
        commit('setIsNewMov', value)
    }
}

const getters = {
    getTab(state) {
        return state.tab
    },
    isNewMov(state) {
        return state.isNewMov
    },
}

export default {
    state,
    mutations,
    actions,
    getters
}