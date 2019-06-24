import getters from './getters';
import mutations from './mutations';
import actions from './actions';

const campaigns = {
  namespaced: true,
  state: {
    campaigns: [],
    campaign: {},
  },
  getters,
  mutations,
  actions,
};

export default campaigns;
