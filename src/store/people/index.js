import getters from './getters';
import mutations from './mutations';
import actions from './actions';

const people = {
  namespaced: true,
  state: {
    contacts: {
      headers: [],
      contacts: [],
    },
    tags: [],
    selectedHeaders: [],
    selectedContacts: [],
    contact: null,
    filters: [],
    tagId: null,
    totalCount: 0,
    taggedCounts: [],
    pageIndex: 0,
    clickedNext: true,
    currentPage: null,
    nextPage: null,
    previousPage: null,
  },
  getters,
  mutations,
  actions,
};

export default people;
