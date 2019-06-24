<template>
  <div class="video-step-4">
    <div class="step-email-field">
      <label for="subject">Subject: </label>
      <input
        id="subject"
        v-model="step4.subject"
        placeholder="Add subject here...">
    </div>
    <div class="step-email-field">
      <label for="headline">Headline: </label>
      <input
        id="headline"
        v-model="step4.headline"
        placeholder="Add headline here...">
    </div>
    <div class="additional-text-field">
      <label for="additional-text">Additional Text</label>
      <!-- eslint-disable max-len -->
      <textarea
        id="additional-text"
        v-model="step4.text"
        placeholder="This is additional text that explains what the video is about. It gives more context about the video and it can help users with disabilities as well"/>
    </div>
    <div class="step-form-buttons">
      <button
        class="primary"
        @click="$emit('send-now', step4)">Send Now</button>
      <button class="secondary">Schedule</button>
      <button class="secondary">Save as Draft and Exit</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VideoStep4',
  data() {
    return {
      step4: {
        subject: '',
        headline: '',
        text: '',
      },
    };
  },
};
</script>

<style scoped>
</style>
