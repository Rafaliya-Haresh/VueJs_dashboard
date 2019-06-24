const getters = {
  /* returns true | boolean */
  clickedNext(state) {
    return state.clickedNext;
  },
  /* returns null | string */
  currentPage(state) {
    return state.currentPage;
  },
  /* returns null | string */
  nextPage(state) {
    return state.nextPage;
  },
  /* returns null | string */
  previousPage(state) {
    return state.previousPage;
  },
  /* returns number */
  pageIndex(state) {
    return state.pageIndex;
  },
  /* returns number */
  totalCount(state) {
    return state.totalCount;
  },
  /* returns TaggedCount[] */
  taggedCounts(state) {
    return state.taggedCounts;
  },
  /* returns number | null */
  tagId(state) {
    return state.tagId;
  },
  /* returns ContactFilter[] */
  filters(state) {
    return state.filters;
  },
  /* returns Contact | null */
  contact(state) {
    return state.contact;
  },
  /* returns number[] */
  selectedContacts(state) {
    return state.selectedContacts;
  },
  /* returns number[] */
  selectedHeaders(state) {
    return state.selectedHeaders;
  },
  /* returns { headers: Header[]; contacts: Contact[] } */
  contacts(state) {
    return state.contacts;
  },
  /* returns Tag[] */
  tags(state) {
    return state.tags;
  },
};

export default getters;
