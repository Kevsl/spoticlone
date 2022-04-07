import { createStore } from 'vuex'

export default createStore({
    state: {
        totalFromVueX: 10,
    },
    getters: {
        doubleDuTotal(state) {
            return state.totalFromVueX * 2;
        },
    },
    mutations: {
        setTotalFromVueX(state, nouvelle_valeur) {
            state.totalFromVueX = nouvelle_valeur;
        },
    },
    actions: {},
    modules: {},
});
