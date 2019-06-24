<template>
  <div class="video-step-2">
    <h4>Let's take a picture for the video thumbnail</h4>
    <div class="image-player-container">
      <video
        id="image-player"
        class="video-js vjs-default-skin"></video>
      <div
        v-if="takingPhoto"
        class="countdown">{{ countdown }}</div>
    </div>
    <div class="step-form-buttons">
      <button
        v-if="cameraRecording"
        :disabled="takingPhoto"
        class="primary large"
        @click="takePhoto">
        <img
          src="@/assets/icons/camera.svg"
          alt="Camera icon"/>
        Take Photo
      </button>
      <template v-else>
        <button
          :disabled="uploadingThumbnail"
          class="primary"
          @click="generateThumbnail">
          {{ uploadingThumbnail ? 'Saving...' : 'Save & Continue' }}
        </button>
        <button
          :disabled="uploadingThumbnail"
          class="secondary"
          @click="retakePhoto">Retake Photo</button>
      </template>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

const namespace = 'videos';

export default {
  name: 'VideoStep2',
  data() {
    return {
      image: null,
      cameraRecording: true,
      takingPhoto: false,
      countdown: 3,
      uploadingThumbnail: false,
      imagePlayer: null,
      imagePlayerOptions: {
        controls: false,
        width: 1280,
        height: 720,
        fluid: true,
        controlBar: {
          volumePanel: false,
          fullscreenToggle: false,
        },
        plugins: {
          record: {
            image: {
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
    this.imagePlayer = this.$videojs('image-player', this.imagePlayerOptions);
    this.imagePlayer.record().getDevice();
    this.imagePlayer.on('finishRecord', () => {
      this.image = this.imagePlayer.recordedData;
    });
  },
  beforeDestroy() {
    this.imagePlayer.record().destroy();
  },
  methods: {
    ...mapActions(namespace, ['uploadThumbnail']),
    takePhoto() {
      this.takingPhoto = true;
      const interval = window.setInterval(() => {
        this.countdown = this.countdown - 1;
        if (this.countdown === 0) {
          window.clearInterval(interval);
          this.takingPhoto = false;
          this.countdown = 3;
          this.imagePlayer.record().createSnapshot();
          this.cameraRecording = false;
        }
      }, 1000);
    },
    retakePhoto() {
      this.imagePlayer.record().getDevice();
      this.cameraRecording = true;
    },
    generateThumbnail() {
      this.uploadingThumbnail = true;
      const c = document.createElement('canvas');
      c.height = 720;
      c.width = 1280;
      const ctx = c.getContext('2d');
      const img = new Image();
      const playButton = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
        const grd = ctx.createLinearGradient(0, 200, 0, 0);
        grd.addColorStop(0, 'rgba(230, 1, 34, 0.7)');
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, 1280, 720);
        playButton.onload = () => {
          ctx.drawImage(
            playButton,
            c.width / 2 - playButton.width / 2,
            c.height / 2 - playButton.height / 2,
          );
          c.toBlob((blob) => {
            this.uploadThumbnail(blob)
              .then(({ id }) => {
                this.uploadingThumbnail = false;
                this.$emit('continue', id);
              }).catch((err) => {
                console.log(err);
              });
          }, 'image/png');
        };
        /* eslint-disable-next-line global-require */
        playButton.src = require('../../assets/icons/play-button.svg');
      };
      img.src = this.image;
    },
  },
};
</script>

<style scoped>
</style>
