const getters = {
  /* returns Campaign[] */
  campaigns(state) {
    return state.campaigns;
  },
  /* returns Campaign */
  campaign(state) {
    return state.campaign;
  },
};

export default getters;
