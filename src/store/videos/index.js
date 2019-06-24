import getters from './getters';
import mutations from './mutations';
import actions from './actions';

const people = {
  namespaced: true,
  state: {
    video: {
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
    },
  },
  getters,
  mutations,
  actions,
};

export default people;
