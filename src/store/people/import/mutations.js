/* eslint-disable no-param-reassign */

const mutations = {
  /* uploadId: number */
  SET_UPLOAD_ID(state, uploadId) {
    state.uploadId = uploadId;
  },
  /* headers: Header[] */
  SET_HEADERS(state, headers) {
    state.headers = headers;
  },
  /* preview: { headers: string[]; rows: string[][] } */
  SET_PREVIEW(state, preview) {
    state.preview = preview;
  },
  SET_MAPPING(state) {
    state.preview.headers.forEach(() => {
      state.mapping.push({
        dropdownOpen: false,
        value: null,
      });
    });
  },
  CLEAR_MAPPING(state) {
    state.preview = {
      headers: [],
      rows: [],
    };
    state.mapping = [];
  },
  /*  mappingIdx: number */
  TOGGLE_HEADER_DROPDOWN(state, mappingIdx) {
    const wasClosed = !state.mapping[mappingIdx].dropdownOpen;
    state.mapping.forEach((item) => { item.dropdownOpen = false; });
    if (wasClosed) {
      state.mapping[mappingIdx].dropdownOpen = !state.mapping[mappingIdx]
        .dropdownOpen;
    }
  },
  /* payload: { idx: number; value: { id: number | null }; } */
  MAP_COLUMN(state, { idx, value }) {
    state.mapping[idx].value = value;
  },
};

export default mutations;
