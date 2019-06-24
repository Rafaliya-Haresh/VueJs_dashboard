import Vue from 'vue';
import Vuex from 'vuex';
import people from './people';
import campaigns from './campaigns';
import importStore from './people/import';
import videos from './videos';

Vue.use(Vuex);

/* eslint-disable no-param-reassign */

export default new Vuex.Store({
  state: {
    modal: null,
  },
  getters: {
    /* returns Modal | null */
    modal(state) {
      return state.modal;
    },
  },
  mutations: {
    /* modal: Modal | null */
    SET_MODAL(state, modal) {
      state.modal = modal;
    },
  },
  actions: {},
  modules: {
    people,
    import: importStore,
    campaigns,
    videos,
  },
});
