import Vuex from 'vuex';
import Vue from 'vue';
import lookups from './modules/lookups';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        lookups,
    }
});