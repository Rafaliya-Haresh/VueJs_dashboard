import getters from './getters';
import mutations from './mutations';
import actions from './actions';

const importStore = {
  namespaced: true,
  state: {
    mapping: [],
    uploadId: -1,
    preview: {
      headers: [],
      rows: [],
    },
    headers: [],
  },
  getters,
  mutations,
  actions,
};

export default importStore;
