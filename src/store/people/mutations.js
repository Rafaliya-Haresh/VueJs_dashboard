/* eslint-disable no-param-reassign */

const mutations = {
  /* clicked: boolean | true */
  SET_CLICKED_NEXT(state, clicked) {
    state.clickedNext = clicked;
  },
  /* current: string | null */
  SET_CURRENT_PAGE(state, current) {
    state.currentPage = current;
  },
  /* next: string | null */
  SET_NEXT_PAGE(state, next) {
    state.nextPage = next;
  },
  /* previous: string | null */
  SET_PREVIOUS_PAGE(state, previous) {
    state.previousPage = previous;
  },
  /* idx: number */
  SET_PAGE_INDEX(state, idx) {
    state.pageIndex = idx;
  },
  /* count: number */
  SET_TOTAL_COUNT(state, count) {
    state.totalCount = count;
  },
  /* counts: TaggedCount[] */
  SET_TAGGED_COUNTS(state, counts) {
    state.taggedCounts = counts;
  },
  /* tagId: number | null */
  SET_TAG_ID(state, tagId) {
    state.tagId = tagId;
  },
  /* filters: ContactFilter[] */
  SET_FILTERS(state, filters) {
    state.filters = filters;
  },
  /* contact: Contact | null */
  SET_CONTACT(state, contact) {
    state.contact = contact;
  },
  DESELECT_ALL_CONTACTS(state) {
    state.selectedContacts = [];
  },
  /* id: number */
  DESELECT_CONTACT(state, id) {
    state.selectedContacts.splice(state.selectedContacts.indexOf(id), 1);
  },
  /* id: number */
  SELECT_CONTACT(state, id) {
    state.selectedContacts.push(id);
  },
  /*  headerIds: number[] */
  SET_SELECTED_HEADERS(state, headerIds) {
    state.selectedHeaders = headerIds;
  },
  /* tags: Tag[] */
  SET_TAGS(state, tags) {
    state.tags = tags;
  },
  /* payload: { headers: Header[]; contacts: Contact[] } */
  SET_CONTACTS(state, { contacts, headers }) {
    state.contacts = { contacts, headers };
  },
};

export default mutations;
