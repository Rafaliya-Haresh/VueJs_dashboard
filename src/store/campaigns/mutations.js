/* eslint-disable no-param-reassign */

const mutations = {
  /* campaigns: Campaign[] */
  SET_CAMPAIGNS(state, campaigns) {
    state.campaigns = campaigns;
  },
  /* campaign: Campaign */
  SET_CAMPAIGN(state, campaign) {
    state.campaign = campaign;
  },
};

export default mutations;
