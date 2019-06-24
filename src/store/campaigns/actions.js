import axios from 'axios';

const actions = {
  /* payload: contactIds: number[] */
  addRecipients({ state }, contactIds) {
    return axios.post(`/campaigns/${state.campaign.id}/recipients.json`, {
      contact_ids: contactIds,
    });
  },
  /* payload: recipientId: number */
  removeRecipient({ state }, recipientId) {
    return axios.delete(`/campaigns/${state.campaign.id}/recipients/${recipientId}`);
  },
  /* payload: { before: string | null, after: string | null } */
  fetchListRecipients({ state, rootState }, { before, after, query } = {
    before: null,
    after: null,
    query: null,
  }) {
    return axios.post(`/campaigns/${state.campaign.id}/list_recipients.json`, {
      tag_id: rootState.people.tagId,
      filters: rootState.people.filters,
      before,
      after,
      query,
    });
  },
  /* payload: { before: string | null, after: string | null } */
  fetchNewRecipients({ state, rootState }, { before, after, query } = {
    before: null,
    after: null,
    query: null,
  }) {
    return axios.post(`/campaigns/${state.campaign.id}/new_recipients.json`, {
      tag_id: rootState.people.tagId,
      filters: rootState.people.filters,
      before,
      after,
      query,
    });
  },
  activateCampaign(context, campaignId) {
    return axios.post(`/campaigns/${campaignId}/resume.json`);
  },
  deactivateCampaign(context, campaignId) {
    return axios.post(`/campaigns/${campaignId}/pause.json`);
  },
  /* name: string */
  createCampaign(context, name) {
    return axios.post('/campaigns.json', { name });
  },
  /* payload: { campaignId: number, name: string } */
  updateCampaign(context, { campaignId, name }) {
    return axios.patch(`/campaigns/${campaignId}.json`, {
      name,
    });
  },
  /* campaignId: number */
  deleteCampaign(context, campaignId) {
    return axios.delete(`/campaigns/${campaignId}.json`);
  },
  fetchCampaigns() {
    return axios.get('/campaigns.json');
  },
  /* campaignId: number */
  fetchCampaignAnalytics(context, campaignId) {
    return axios.post(`/campaigns/${campaignId}/analytics.json`);
  },
  /* campaignId: number */
  fetchCampaign(context, campaignId) {
    return axios.get(`/campaigns/${campaignId}.json`);
  },
  /* payload: { campaignId: number, messageId: number } */
  fetchMessageAnalytics(context, { campaignId, messageId }) {
    return axios.post(`/campaigns/${campaignId}/messages/${messageId}/analytics.json`);
  },
  /* payload: { campaignId: number, messageId: number } */
  deleteMessage(context, { campaignId, messageId }) {
    return axios.delete(`/campaigns/${campaignId}/messages/${messageId}.json`);
  },
  /* payload: { campaignId: number, message: Message } */
  createMessage(context, { campaignId, message }) {
    return axios.post(`/campaigns/${campaignId}/messages.json`, message);
  },
  /*  payload: { campaignId: number, message: Message } */
  updateMessage(context, { campaignId, message }) {
    return axios.patch(`/campaigns/${campaignId}/messages/${message.id}.json`, message);
  },
  /* image: File */
  uploadImage(context, image) {
    return new Promise((resolve, reject) => {
      axios
        .post('/images/uploads.json')
        .then((data) => {
          axios
            .put(data.presigned_url, image)
            .then(() => {
              resolve(data);
            })
            .catch((err) => {
              reject(err);
            });
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

export default actions;
