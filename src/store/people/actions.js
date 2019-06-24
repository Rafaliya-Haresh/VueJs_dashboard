import axios from 'axios';

const actions = {
  /* payload: { campaignId: number, contactIds: number[] } */
  addRecipientsToCampaign(context, { campaignId, contactIds }) {
    return axios.post(`/campaigns/${campaignId}/recipients.json`, {
      contact_ids: contactIds,
    });
  },
  /*
  fetchData: {
    previous: string | null;
    next: string | null;
    total_count: number;
    tagged_counts: TaggedCount[];
    contacts: Contact[];
    headers: Header[];
  }
  */
  setContacts({ commit, dispatch }, {
    index,
    previous,
    next,
    total_count: total,
    tagged_counts: tagged,
    contacts,
    headers,
  }) {
    dispatch('setPage', { index, previous, next });
    dispatch('setCounts', { total, tagged });
    commit('SET_CONTACTS', { headers, contacts });
  },
  /* payload: { total: number, tagged: TaggedCount[] } */
  setCounts({ commit }, { total, tagged }) {
    commit('SET_TOTAL_COUNT', total);
    commit('SET_TAGGED_COUNTS', tagged);
  },
  /* payload: { previous: string | null, next: string | null } */
  setPage({ commit }, { index, previous, next }) {
    commit('SET_PAGE_INDEX', index);
    commit('SET_PREVIOUS_PAGE', previous);
    commit('SET_NEXT_PAGE', next);
  },
  /* payload: { current: string | null,  } */
  setCurrentPage({ commit }, { current, clicked }) {
    commit('SET_CURRENT_PAGE', current);
    commit('SET_CLICKED_NEXT', clicked);
  },
  /* tags: string[] */
  tagContacts({ state }, tags) {
    return axios.post('/contacts/tags.json', {
      contact_ids: state.selectedContacts,
      tags,
    });
  },
  /* payload: { before: string | null, after: string | null, query: string } */
  searchContacts({ state }, { before, after, query }) {
    return axios.post('/contacts/search.json', {
      tag_id: state.tagId,
      query,
      before,
      after,
    });
  },
  /* payload: { before: string | null, after: string | null } */
  fetchContacts({ state }, { before, after } = { before: null, after: null }) {
    return axios.post('/contacts/filters.json', {
      tag_id: state.tagId,
      filters: state.filters,
      before,
      after,
    });
  },
  /* payload: { tagId: number, contactId: number } */
  deleteTagFromContact(context, { tagId, contactId }) {
    return axios.delete(`/tags/${tagId}/contacts/${contactId}`);
  },
  /* contactId: number */
  fetchTagsForContact(context, contactId) {
    return axios.get(`/contacts/${contactId}/tags.json`);
  },
  fetchTags() {
    return axios.get('/tags.json');
  },
  /* payload: { columns: [], tags: [] } */
  createContact(context, { columns, tags }) {
    return axios.post('/contacts.json', {
      contact: { columns, tags },
    });
  },
  /* payload: { id: number, columns: [], tags: [] } */
  updateContact(context, { id, columns, tags }) {
    return axios.patch(`/contacts/${id}.json`, {
      contact: { columns, tags },
    });
  },
  /* id: number */
  deleteContact(context, id) {
    return axios.delete(`/contacts/${id}.json`);
  },
};

export default actions;
