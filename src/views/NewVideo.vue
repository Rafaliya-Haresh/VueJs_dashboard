<template>
  <div class="new-video">
    <div class="container">
      <Breadcrumbs :crumbs="[
        { name: 'Home', link: '/people' },
        { name: 'Videos', link: '/videos' },
        { name: 'New Video', link: '' }]"/>
      <PageHeading title="New Video"/>
      <div class="new-video-container">
        <div class="form">
          <div
            id="first-step"
            :class="{ active: activeStep === 1 }"
            class="step step-1">
            <h3>
              <span>
                <span class="step-number">1</span>
                Setup
              </span>
              <button
                v-if="activeStep !== 1 && step1Complete"
                @click="activeStep = 1">Edit</button>
            </h3>
            <div
              v-if="activeStep === 1"
              class="step-form">
              <VideoStep1
                @continue="SET_STEP_1($event); activeStep = 2"
                @save="SET_STEP_1($event); save()"/>
            </div>
          </div>
          <div
            class="step step-2"
            :class="{ active: activeStep === 2 }">
            <h3>
              <span>
                <span class="step-number">2</span>
                Thumbnail
              </span>
              <button
                v-if="activeStep !== 2 && step2Complete"
                @click="activeStep = 2">Edit</button>
            </h3>
            <div
              v-if="activeStep === 2"
              class="step-form">
              <VideoStep2
                @continue="SET_STEP_2($event); activeStep = 3"/>
            </div>
          </div>
          <div
            class="step step-3"
            :class="{ active: activeStep === 3 }">
            <h3>
              <span>
                <span class="step-number">3</span>
                Record Video
              </span>
              <button
                v-if="activeStep !== 3 && step3Complete"
                @click="activeStep = 3">Edit</button>
            </h3>
            <div
              v-if="activeStep === 3"
              class="step-form">
              <VideoStep3
                @continue="SET_STEP_3($event); activeStep = 4"
                @save="SET_STEP_3($event); save()"/>
            </div>
          </div>
          <div
            class="step step-4"
            :class="{ active: activeStep === 4 }">
            <h3>
              <span>
                <span class="step-number">4</span>
                Send
              </span>
              <button
                v-if="activeStep !== 4 && step4Complete"
                @click="activeStep = 4">Edit</button>
            </h3>
            <div
              v-if="activeStep === 4"
              class="step-form">
              <VideoStep4
                @send-now="sendNow"/>
            </div>
          </div>
        </div>
        <div class="preview">
          <h4>
            <span>Email Preview</span>
            <router-link to="/">
              Preview video landing page
              <img
                src="@/assets/icons/preview-icon.svg"
                alt="Redirect icon">
            </router-link>
          </h4>
          <div class="email">
            <EmailPreview/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import PageHeading from '@/components/PageHeading.vue';
import VideoStep1 from '@/components/videos/VideoStep1.vue';
import VideoStep2 from '@/components/videos/VideoStep2.vue';
import VideoStep3 from '@/components/videos/VideoStep3.vue';
import VideoStep4 from '@/components/videos/VideoStep4.vue';
import EmailPreview from '@/components/EmailPreview.vue';

const namespace = 'videos';

export default {
  name: 'NewVideo',
  components: {
    Breadcrumbs,
    PageHeading,
    VideoStep1,
    VideoStep2,
    VideoStep3,
    VideoStep4,
    EmailPreview,
  },
  data() {
    return {
      activeStep: 1,
    };
  },
  computed: {
    ...mapGetters(namespace, [
      'step1Complete',
      'step2Complete',
      'step3Complete',
      'step4Complete',
    ]),
  },
  beforeDestroy() {
    this.RESET_VIDEO();
  },
  methods: {
    ...mapMutations(namespace, [
      'SET_STEP_1',
      'SET_STEP_2',
      'SET_STEP_3',
      'SET_STEP_4',
      'SET_SEND_TIME',
      'RESET_VIDEO',
    ]),
    ...mapActions(namespace, ['createVideo']),
    save() {
      this.createVideo().then(() => {
        this.$router.push('/videos');
      }).catch((err) => {
        console.log(err);
      });
    },
    sendNow(data) {
      this.SET_STEP_4(data);
      this.SET_SEND_TIME(new Date().toISOString());
      this.createVideo().then(() => {
        this.$router.push('/videos');
      }).catch((err) => {
        console.log(err);
      });
    },
  },
};
</script>

<style lang="scss">
.new-video {
  .new-video-container {
    display: flex;
  }
  .preview h4 {
    border-bottom: 2px solid #e1e1e1;
    padding-bottom: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    font-size: 14px;
  }
  .preview h4 span {
    font-family: 'Neue Haas Grotesk Disp W05_65M';
    letter-spacing: 1px;
    text-transform: uppercase;
    font-size: 12px;
  }
  .preview .email {
    border: 1px solid #DDDFE2;
    border-radius: 4px;
    padding: 16px;
  }
  video {
    width: 100%;
  }
  .form {
    max-width: 500px;
    width: 50%;
    margin-right: 48px;
  }
  .step {
    padding: 16px;
    border-bottom: 1px solid #f4f2fb;
  }
  #first-step {
    border-top: 1px solid #f4f2fb;
  }
  .step h3 {
    font-family: 'Neue Haas Grotesk Disp W05_65M';
    color: #8d8d8d;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .step.active h3 {
    color: #000;
    margin-bottom: 24px;
  }
  .step h3 button {
    font-family: 'Neue Haas Grotesk Disp W05_55R';
    color: #5736bb;
  }
  .step.active .step-number {
    background: #5736bb;
    color: #fff;
  }
  .step-number {
    margin-right: 16px;
    border-radius: 50%;
    font-family: 'Neue Haas Grotesk Disp W05_75B';
    display: inline-block;
    height: 28px;
    width: 28px;
    line-height: 28px;
    text-align: center;
  }
  .step-form {
    padding-left: 44px;
  }
  .step-form-field {
    margin-bottom: 28px;
  }
  .step-form-field label,
  .step-form-field input {
    display: block;
  }
  .step-form-field label {
    margin-bottom: 8px;
    font-family: 'Neue Haas Grotesk Disp W05_65M';
  }
  .step-form-field input {
    padding: 4px 0;
  }
  .step-form h4 {
    text-align: center;
    font-family: 'Neue Haas Grotesk Disp W05_65M';
    margin-bottom: 16px;
  }
  .step-form .message {
    font-size: 14px;
    margin-bottom: 16px;
  }
  .step-form .video-js {
    margin-bottom: 16px;
  }
  .step-form-buttons button {
    margin-right: 8px;
  }
  .step-form-buttons button.large {
    font-size: 16px;
    width: 100%;
    padding: 16px;
  }
  .step-form-buttons button.large img {
    vertical-align: middle;
    margin-right: 4px;
  }
  .step-email-field {
    padding: 16px 0;
    border-bottom: 1px solid #f4f2fb;
  }
  .step-email-field:first-of-type {
    border-top: 1px solid #f4f2fb;
  }
  .step-email-field label {
    color: #515151;
  }
  .step-email-field input {
    margin-left: 4px;
    width: 75%;
    border: none;
    font-size: 16px;
  }
  .step-form #additional-text {
    transition: 0.2s border-color ease;
    display: block;
    border: none;
    border-bottom: 2px solid #e1e1e1;
    width: 100%;
    height: 100px;
    font-size: 16px;
    padding: 8px 0;
    margin-bottom: 16px;
  }
  .step-form #additional-text:focus {
    outline: none;
    border-color: #5736bb;
  }
  .additional-text-field {
    padding-top: 16px;
  }
  .additional-text-field label {
    font-family: 'Neue Haas Grotesk Disp W05_65M';
  }
  .step-4.active {
    border-bottom: none;
  }
  .image-player-container {
    position: relative;
  }
  .image-player-container .countdown {
    height: 75px;
    width: 75px;
    line-height: 75px;
    font-size: 32px;
    font-family: 'Neue Haas Grotesk Disp W05_75B';
    text-align: center;
    border-radius: 50%;
    background: #fff;
    opacity: 0.75;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .vjs-control-bar {
    background: rgba(87, 54, 187, 0.6);
  }
  .quill-editor.focused .ql-container.ql-snow {
    border-color: #5736bb;
  }
  .ql-editor {
    padding-left: 0;
    padding-right: 0;
  }
  .ql-toolbar.ql-snow {
    border-color: #f4f2fb;
    border-left: none;
    border-right: none;
    padding-left: 0;
    padding-right: 0;
  }
  .ql-toolbar.ql-snow button {
    padding-left: 0;
  }
  .ql-container.ql-snow {
    transition: 0.2s border-color ease;
    font-family: 'Neue Haas Grotesk Disp W05_55R';
    font-size: 16px;
    height: 150px;
    border: none;
    border-bottom: 2px solid #e1e1e1;
  }
  .ql-editor.ql-blank::before {
    left: 0;
    font-style: normal;
    font-size: 16px;
    font-family: 'Neue Haas Grotesk Disp W05_55R';
    color: #999;
    -webkit-font-smoothing: auto;
  }
  label[for='DateTimePicker'].field-label {
    display: none;
  }
  input#CtkDateTimePicker {
    -webkit-font-smoothing: auto;
    font-family: sans-serif;
    font-family: 'Neue Haas Grotesk Disp W05_55R';
    height: auto;
    min-height: unset;
    padding: 4px 0;
    transition: 0.2s border-color ease;
    margin: 0;
    border-radius: 0;
    color: #000;
    font-size: 16px;
    border: none;
    border-bottom: 2px solid #e1e1e1;
  }
  input#CtkDateTimePicker:focus {
    border-color: #5736bb;
  }
  div#CtkDateTimePicker {
    width: unset;
    display: inline-block;
    -webkit-font-smoothing: auto;
    .timepicker-container .time-container.hours-container {
      border-left: 1px solid #e1e1e1;
    }
    .time-label,
    .field-label {
      display: none;
    }
    .datetimepicker .datepicker {
      box-shadow: 0px 2px 4px #d7d7d7;
    }
    .datepicker-label {
      font-family: 'Neue Haas Grotesk Disp W05_75B';
    }
    #CtkDatePicker.datepicker-container
      .datepicker-days
      .datepicker-day
      .datepicker-day-effect,
    .timepicker-container
      .time-container
      .numbers-container
      .item
      .timepicker-day-effect {
      background: #f37366;
    }
    #CtkDatePicker.datepicker-container
      .datepicker-days
      .datepicker-day:hover
      .datepicker-day-effect,
    #CtkDatePicker.datepicker-container .datepicker-days .datepicker-day-effect,
    .timepicker-container
      .time-container
      .numbers-container
      .item:hover
      .timepicker-day-effect,
    .timepicker-container
      .time-container
      .numbers-container
      .item
      .timepicker-day-effect,
    .timepicker-container .time-container .numbers-container .item:hover {
      transition: none;
    }
    .button-validate .datepicker-button-effect {
      display: none;
    }
    .button-validate .datepicker-button {
      background: #fff;
      border: none;
    }
    .button-validate {
      display: none !important;
    }
  }
}
</style>
