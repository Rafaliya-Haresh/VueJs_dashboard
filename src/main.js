import Vue from 'vue';
import axios from 'axios';
import moment from 'moment';
import { mixin as clickaway } from 'vue-clickaway';
import VSelect from 'vue-select';
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';
import VueQuillEditor from 'vue-quill-editor';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import videojs from 'video.js';
import 'video.js/dist/video-js.min.css';
import 'videojs-record/dist/css/videojs.record.css';
import 'webrtc-adapter';
import 'videojs-record/dist/videojs.record';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

axios.defaults.baseURL = process.env.VUE_APP_BASE_API_URL || 'http://localhost:3000/v1';
axios.interceptors.response.use((res) => res.data);

Vue.prototype.$moment = moment;
Vue.prototype.$videojs = videojs;
Vue.mixin(clickaway);
Vue.component('v-select', VSelect);
Vue.component('ctk-date-time-picker', VueCtkDateTimePicker);
Vue.use(VueQuillEditor);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
