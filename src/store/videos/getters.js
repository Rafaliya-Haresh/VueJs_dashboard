const getters = {
  video(state) {
    return state.video;
  },
  step1Complete(state) {
    return state.video.name !== null;
  },
  step2Complete(state) {
    return state.video.thumbnail_upload_id !== null;
  },
  step3Complete(state) {
    return state.video.video_upload_id !== null;
  },
  step4Complete(state) {
    return state.video.subject !== null;
  },
};

export default getters;
