const state = {
    tab: 0,
    isNewMov: false,
    movimento: {
        times: {
            timeA1: null,
            timeA2: null,
            timeA3: null,
            timeA4: null,
            timeG1: null,
            timeG2: null,
            timeG3: null,
            timeG4: null,
        },
        nota: "",
        causale: null,
        cdl: null,
        cdc: null,
        posizione: null
    }
}

const mutations = {
    setTab(state, tab) {
        state.tab = tab
    },
    setIsNewMov(state, value) {
        state.isNewMov = value
    },
    clearMov(state) {
        state.movimento.times.timeG1 = null 
        state.movimento.times.timeG2 = null 
        state.movimento.times.timeG3 = null 
        state.movimento.times.timeG4 = null 
        state.movimento.times.timeA1 = null 
        state.movimento.times.timeA2 = null 
        state.movimento.times.timeA3 = null 
        state.movimento.times.timeA4 = null 
        state.movimento.nota = "" 
        state.movimento.causale = null 
        state.movimento.posizione = null 
        state.movimento.cdl = null 
        state.movimento.cdc = null 
    },
    clearMovData(state) {
        state.nota = "",
        state.causale = null,
        state.cdl = null,
        state.cdc = null,
        state.posizione = null
    },
    setTimeG1(state, value) {
        state.movimento.times.timeG1 = value
    },
    setTimeG2(state, value) {
        state.movimento.times.timeG2 = value
    },
    setTimeG3(state, value) {
        state.movimento.times.timeG3 = value
    },
    setTimeG4(state, value) {
        state.movimento.times.timeG4 = value
    },
    setTimeA1(state, value) {
        state.movimento.times.timeA1 = value
    },
    setTimeA2(state, value) {
        state.movimento.times.timeA2 = value
    },
    setTimeA3(state, value) {
        state.movimento.times.timeA3 = value
    },
    setTimeA4(state, value) {
        state.movimento.times.timeA4 = value
    },
    setNota(state, value) {
        state.movimento.nota = value
    },
    setCausale(state, value) {
        state.movimento.causale = value
    },
    setPosizione(state, value) {
        state.movimento.posizione = value
    },
    setCdl(state, value) {
        state.movimento.cdl = value
    },
    setCdc(state, value) {
        state.movimento.cdc = value
    },
}

const actions = {
    setTab({ commit }, tab) {
        commit('setTab', tab)
    },
    setIsNewMov({ commit }, value) {
        commit('setIsNewMov', value)
    },
    clearMov({ commit }, value) {
        commit('clearMov', value)
    },
    setTimeG1({ commit }, value) {
        commit('setTimeG1', value)
    },
    setTimeG2({ commit }, value) {
        commit('setTimeG2', value)
    },
    setTimeG3({ commit }, value) {
        commit('setTimeG3', value)
    },
    setTimeG4({ commit }, value) {
        commit('setTimeG4', value)
    },
    setTimeA1({ commit }, value) {
        commit('setTimeA1', value)
    },
    setTimeA2({ commit }, value) {
        commit('setTimeA2', value)
    },
    setTimeA3({ commit }, value) {
        commit('setTimeA3', value)
    },
    setTimeA4({ commit }, value) {
        commit('setTimeA4', value)
    },
    setNota({ commit }, value) {
        commit('setNota', value)
    },
    setCausale({ commit }, value) {
        commit('setCausale', value)
    },
    setPosizione({ commit }, value) {
        commit('setPosizione', value)
    },
    setCdl({ commit }, value) {
        commit('setCdl', value)
    },
    setCdc({ commit }, value) {
        commit('setCdc', value)
    }
}

const getters = {
    getTab(state) {
        return state.tab
    },
    isNewMov(state) {
        return state.isNewMov
    },
    getTimeG1(state) {
        return state.movimento.times.timeG1
    },
    getTimeG2(state) {
        return state.movimento.times.timeG2
    },
    getTimeG3(state) {
        return state.movimento.times.timeG3
    },
    getTimeG4(state) {
        return state.movimento.times.timeG4
    },
    getTimeA1(state) {
        return state.movimento.times.timeA1
    },
    getTimeA2(state) {
        return state.movimento.times.timeA2
    },
    getTimeA3(state) {
        return state.movimento.times.timeA3
    },
    getTimeA4(state) {
        return state.movimento.times.timeA4
    },
    getNota(state) {
        return state.movimento.nota
    },
    getCausale(state) {
        return state.movimento.causale
    },
    getPosizione(state) {
        return state.movimento.posizione
    },
    getCdl(state) {
        return state.movimento.cdl
    },
    getCdc(state) {
        return state.movimento.cdc
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}