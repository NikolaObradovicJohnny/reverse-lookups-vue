import Api from '../../services/Api';

const state = {
    claim: {
        claimid: '',
        userid: '',
        created_at: '',
        gender: '',
        firstname: '',
        lastname: '',
        email: '',
        claimdetails: '',
        claimamount: 0,
        accountowner: '',
        iban: '',
        bic: '',
        internetaddress: '',
    },
    lookups: {}
};

const getters = {
    getClaim: (state) => state.claim,
    getLookups: (state) => state.lookups,
};

const actions = {
    async postClaim({ commit }, payload) {
        const response = await Api.post('claim', payload);

        commit('setClaim', response.data);
    },
    async fetchClaim({ commit }, id) {
        const response = await Api.getSingle('claim', id);

        commit('setClaim', response.data);
    },
    async fetchLookups({ commit }, args) {
        const response = await Api.getWithArguments('reverse-lookups', args);

        console.log(response.data);
        commit('setLookups', response.data);
    },
    async fetchLookupsSecond({ commit }, args) {
        const response = await Api.getWithArguments('reverse-lookups/second', args);

        console.log(response.data);
        commit('setLookups', response.data);
    },
    async fetchLookupsAsync({ commit }, args) {
        const response = await Api.getWithArguments('reverse-lookups/async', args);

        console.log(response.data);
        commit('setLookups', response.data);
    }
};

const mutations = {
    setClaim: (state, claim) => (state.claim = claim),
    setLookups: (state, lookups) => (state.lookups = lookups),
};

export default {
    state,
    getters,
    actions,
    mutations
}