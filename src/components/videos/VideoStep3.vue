<template>
  <div class="video-step-3">
    <video
      id="video-player"
      class="video-js vjs-default-skin"></video>
    <div class="step-form-buttons">
      <p
        class="message"
        v-if="!watched && recordingFinished">Play the video to make sure everything
        looks the way you intended. You will be able to proceed after watching the
        entire video</p>
      <template v-if="recordingFinished">
        <button
          :disabled="!watched || uploading"
          class="primary"
          @click="upload">Save &amp; Continue</button>
        <button
          :disabled="!watched || uploading"
          class="secondary"
          @click="retakeVideo">Retake Video</button>
        <button
          :disabled="!watched || uploading"
          class="secondary"
          @click="upload($event, true)">Save &amp; Exit</button>
      </template>
      <button
        v-else-if="!recording"
        class="primary large"
        @click="startRecording">
        <img
          src="@/assets/icons/start-recording.svg"
          alt="Start recording icon">
        Start Recording
      </button>
      <button
        v-else-if="recording"
        class="primary large"
        @click="stopRecording">
        <img
          src="@/assets/icons/stop-recording.svg"
          alt="Stop recording icon">
        Stop Recording
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

const namespace = 'videos';

export default {
  name: 'VideoStep3',
  data() {
    return {
      uploading: false,
      recording: false,
      recordingFinished: false,
      watched: false,
      videoPlayer: null,
      videoPlayerOptions: {
        controls: true,
        autoplay: false,
        loop: false,
        fluid: true,
        controlBar: {
          recordToggle: false,
          fullscreenToggle: false,
        },
        plugins: {
          record: {
            maxLength: 180,
            msDisplayMax: 2,
            audio: true,
            video: {
              width: { min: 640, ideal: 1280, max: 1920 },
              height: { min: 480, ideal: 720, max: 1080 },
            },
            debug: true,
          },
        },
      },
    };
  },
  mounted() {
    this.videoPlayer = this.$videojs('video-player', this.videoPlayerOptions);
    this.videoPlayer.record().getDevice();
    document.body.onkeyup = (evt) => {
      if (evt.keyCode === 32 && this.recording) {
        this.stopRecording();
      }
    };
  },
  beforeDestroy() {
    this.videoPlayer.record().destroy();
  },
  methods: {
    ...mapActions(namespace, ['uploadVideo']),
    startRecording() {
      this.videoPlayer.record().start();
      this.recording = true;
    },
    stopRecording() {
      this.videoPlayer.record().stop();
      this.recording = false;
      this.recordingFinished = true;
      this.videoPlayer.on('ended', () => {
        this.watched = true;
      });
    },
    retakeVideo() {
      this.videoPlayer.record().getDevice();
      this.recordingFinished = false;
      this.watched = false;
    },
    upload(evt, save = false) {
      this.uploading = true;
      this.uploadVideo(this.videoPlayer.recordedData)
        .then(({ id }) => {
          if (save) {
            this.$emit('save', id);
          } else {
            this.$emit('continue', id);
          }
        }).catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
</style>
