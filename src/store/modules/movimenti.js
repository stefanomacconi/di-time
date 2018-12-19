import axios from 'axios'

const state = {
    date: [],
    offset: 0,
    causali: [],
    elencoCdl: [],
    elencoCdc: [],
    definizioniNotaSpese: [],
    giorniWarning: [],
    giorniError: [],
    pickedData: new Date().getTime(),
    movimentiSelezionati: []
}

const mutations = {
    clearMovimentiData(state) {
        state.date = [],
        state.offset = 0,
        state.giorniError = [],
        state.giorniWarning = [],
        state.elencoCdc = [],
        state.elencoCdl = [],
        state.causali = [],
        state.definizioniNotaSpese = [],
        state.pickedData = new Date().getTime(),
        state.movimentiSelezionati = []
    },
    clearGiorniColor(state) {
        state.giorniError = [],
        state.giorniWarning = []
    },
    setDate(state, date) {
        state.date = date
    },
    addDate(state, date) {
        const last = state.date[state.date.length-1]
        if (date.length > 0) {
            const first = date[0]
            if (last.data == first.data) {
                state.date[state.date.length-1].movimenti.concat(date[0].movimenti)
            }
        }
        for (let index = 1; index < date.length; index++) {
            state.date.push(date[index])
        }
    },
    setCausali(state, causali) {
        causali.forEach(causale => {
           const data = {
               codice: causale.codice,
               descrizione: causale.descrizione
           } 
           state.causali.push(data)
        })
    },
    setElencoCdl(state, elencoCdl) {
        elencoCdl.forEach(cdl => {
            const data = {
                codice: cdl.codice,
                descrizione: cdl.descrizione
            } 
            state.elencoCdl.push(data)
         })
    },
    setElencoCdc(state, elencoCdc) {
        elencoCdc.forEach(cdc => {
            const data = {
                codice: cdc.codice,
                descrizione: cdc.descrizione
            } 
            state.elencoCdc.push(data)
         })
    },
    setDefinizioniNotaSpese(state, definizioni) {
        definizioni.forEach(definizione => {
            const data = {
                codice: definizione.codice,
                descrizione: definizione.descrizione,
                codiceTipoMovimento: definizione.codiceTipoMovimento
            }
            state.definizioniNotaSpese.push(data)
        })
    },
    addToGiorniWarning(state, data) {
        if (state.giorniWarning.indexOf(data) === -1) 
            state.giorniWarning.push(data)
    },
    addToGiorniError(state, data) {
        if (state.giorniError.indexOf(data) === -1) 
            state.giorniError.push(data)
    },
    setPickedData(state, data) {
        state.pickedData = data
    },
    setOffset(state, offset) {
        state.offset = offset
    },
    addToMovimentiSelezionati(state, movimento) {
        state.movimentiSelezionati.push(movimento)
    },
    removeToMovimentiSelezionati(state, index) {
        if (index > -1)
            state.movimentiSelezionati.splice(index, 1)
    },
    clearMovimentiSelezionati(state) {
        state.movimentiSelezionati = []
    }
}

const actions = {
    fetchMovimenti({ commit, dispatch, rootState }, offset) {
        return new Promise((resolve, reject) => {
            var path = '/movimento/lavorazione/' 
            + rootState.utente.dipendente + "/"
            + 50 + "/" //fixed limit //TODO Abbassare? Alzare?
            if (offset) {
               path = path + offset 
            }
            axios.get(path)
            .then(res => {
                // eslint-disable-next-line
                console.log(res)
                if (offset) {
                    commit('addDate', res.data)
                } else {
                    commit('setDate', res.data)
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
    fetchCausali({ commit, dispatch }) {
        axios.get("/causale/lavorazione")
            .then(res => {
                // eslint-disable-next-line
                console.log(res)
                commit('setCausali', res.data)
            }).catch(error => {
                // eslint-disable-next-line
                console.log(error)
                dispatch('handleError', error.response.data)
        })
    },
    fetchElencoCdl({ commit, dispatch }) {
        axios.get("/cdl")
            .then(res => {
                // eslint-disable-next-line
                console.log(res)
                commit('setElencoCdl', res.data)
            }).catch(error => {
                // eslint-disable-next-line
                console.log(error)
                dispatch('handleError', error.response.data)
        })
    },
    fetchElencoCdc({ commit, dispatch }) {
        axios.get("/cdc")
            .then(res => {
                // eslint-disable-next-line
                console.log(res)
                commit('setElencoCdc', res.data)
            }).catch(error => {
                // eslint-disable-next-line
                console.log(error)
                dispatch('handleError', error.response.data)
        })

    },
    fetchDefinizioneNotaSpese({ commit, dispatch }) {
        axios.get("/movimento/supplementare")
            .then(res => {
                // eslint-disable-next-line
                console.log(res)
                commit('setDefinizioniNotaSpese', res.data)
            }).catch(error => {
                // eslint-disable-next-line
                console.log(error)
                dispatch('handleError', error.response.data)
        })

    },
    clearGiorniColor({commit}) {
        commit('clearGiorniColor')
    },
    addToGiorniWarning({commit}, data) {
        commit('addToGiorniWarning', data)
    },
    addToGiorniError({commit}, data) {
        commit('addToGiorniError', data)
    },
    setPickedData({commit}, data) {
        commit('setPickedData', data)
    },
    setOffset({commit}, offset) {
        commit('setOffset', offset)
    },
    incrementOffset({dispatch, state}) {
      var offset = state.offset + 50
      dispatch('setOffset', offset)
    },
    addToMovimentiSelezionati({commit}, movimento) {
        commit('addToMovimentiSelezionati', movimento)
    },
    removeToMovimentiSelezionati({commit}, movimento) {
        commit('removeToMovimentiSelezionati', movimento)
    },
    clearMovimentiSelezionati({commit}) {
        commit('clearMovimentiSelezionati')
    }
}

const getters = {
    getMovimenti(state) {
        return state.date.movimenti
    },
    getDate(state) {
        return state.date
    },
    getCausali(state) {
        return state.causali
    },
    getElencoCdl(state) {
        return state.elencoCdl
    },
    getElencoCdc(state) {
        return state.elencoCdc
    },
    getDefinizioniNotaSpese(state) {
        return state.definizioniNotaSpese
    },
    getGiorniWarning(state) {
        return state.giorniWarning
    },
    getGiorniError(state) {
        return state.giorniError
    },
    getPickedData(state) {
        return state.pickedData
    },
    getOffset(state) {
        return state.offset
    },
    getMovimentiSelezionati(state) {
        return state.movimentiSelezionati
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}