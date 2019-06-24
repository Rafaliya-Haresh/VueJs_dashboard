/* eslint-disable no-param-reassign */

const mutations = {
  /* { name: string, notes: string, due_date: string } */
  SET_STEP_1(state, { name, notes, due_date: due }) {
    state.video.name = name;
    state.video.notes = notes;
    state.video.due_date = due;
  },
  SET_STEP_2(state, thumbnailUploadId) {
    state.video.thumbnail_upload_id = thumbnailUploadId;
  },
  SET_STEP_3(state, videoUploadId) {
    state.video.video_upload_id = videoUploadId;
  },
  SET_STEP_4(state, { subject, headline, text }) {
    state.video.subject = subject;
    state.video.headline = headline;
    state.video.text = text;
  },
  SET_SEND_TIME(state, sendTime) {
    state.video.send_time = sendTime;
  },
  RESET_VIDEO(state) {
    state.video = {
      name: null,
      notes: null,
      headline: null,
      video_upload_id: null,
      thumbnail_upload_id: null,
      subject: null,
      text: null,
      assignee_id: null,
      due_date: null,
      send_time: null,
      sender_id: null,
    };
  },
};

export default mutations;
