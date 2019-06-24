import axios from 'axios';

const actions = {
  /* header: { type: HeaderType; name: string } */
  createHeader(context, header) {
    return axios.post('/headers.json', header);
  },
  importContacts({ state }) {
    return axios.post(`/contacts/uploads/${state.uploadId}/import`, {
      headers: state.mapping.map((item) => item.value),
    });
  },
  /* payload: { file: File; fileType: 'csv' | 'xlsx' } */
  uploadSpreadsheet({ commit }, { file, fileType }) {
    return new Promise((resolve, reject) => {
      axios
        .post('/contacts/uploads.json', { file_type: fileType })
        .then(({ presigned_url: presignedUrl, id }) => {
          axios
            .put(presignedUrl, file)
            .then(() => {
              commit('SET_UPLOAD_ID', id);
              axios
                .post(`/contacts/uploads/${id}/parse.json`)
                .then((parseData) => {
                  resolve(parseData);
                })
                .catch((parseErr) => {
                  reject(parseErr);
                });
            })
            .catch((awsErr) => {
              reject(awsErr);
            });
        })
        .catch((uploadsErr) => {
          reject(uploadsErr);
        });
    });
  },
  fetchHeaders() {
    return axios.get('/headers.json');
  },
};

export default actions;
