import axios from 'axios';

const actions = {
  createVideo({ state }) {
    return axios.post('/videos.json', state.video);
  },
  /* image: Blob */
  uploadThumbnail(context, image) {
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
  /* video: Blob */
  uploadVideo(context, video) {
    return new Promise((resolve, reject) => {
      axios
        .post('/videos/uploads.json')
        .then((data) => {
          axios
            .put(data.presigned_url, video)
            .then(() => {
              resolve(data);
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
};

export default actions;
