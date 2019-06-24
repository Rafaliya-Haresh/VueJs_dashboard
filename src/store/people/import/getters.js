const getters = {
  /* returns Array<{ dropdownOpen: boolean; value: { id: number | null } | null; }> */
  mapping(state) {
    return state.mapping;
  },
  /* returns : { headers: string[]; rows: string[][] } */
  preview(state) {
    return state.preview;
  },
  /* returns Header[] */
  headers(state) {
    return state.headers;
  },
};

export default getters;
