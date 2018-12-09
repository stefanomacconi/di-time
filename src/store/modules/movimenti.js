import axios from 'axios'

const state = {
    movimenti: [],
    causali: [],
    elencoCdl: [],
    elencoCdc: [],
    definizioniNotaSpese: []
}

const mutations = {
    clearMovimentiData(state) {
        state.movimenti = [],
        state.elencoCdc = [],
        state.elencoCdl = [],
        state.causali = [],
        state.definizioniNotaSpese = []
    },
    setMovimenti(state, movimenti) {
        state.movimenti = movimenti
    },
    addMovimenti(state, movimenti) {
        movimenti.forEach(movimento => {
            state.movimenti.push(movimento)
        });
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
}

const getters = {
    getMovimenti(state) {
        return state.movimenti
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
}

export default {
    state,
    mutations,
    actions,
    getters
}