<template>
  <div class="video-step-1">
    <div class="step-form-field">
      <label for="video-name">Video Name*</label>
      <input
        id="video-name"
        v-model="step1.name"
        type="text"
        placeholder="My First Video">
    </div>
    <div class="step-form-field">
      <label for="video-name">Video Notes</label>
      <quill-editor
        id="notes"
        v-model="step1.notes"
        :options="editorOptions"
        :class="{ focused: quillFocused }"
        @focus="quillFocused = true"
        @blur="quillFocused = false"/>
    </div>
    <div class="step-form-field">
      <label for="due-date">Due Date &amp; Time</label>
      <ctk-date-time-picker
        v-model="step1.due_date"
        without-header
        time-format="h:mm A"
        formatted="MMM D, YYYY hh:mmA"
        label="Select a date &amp; time..."/>
    </div>
    <div class="step-form-buttons">
      <button
        class="primary"
        @click="saveAndContinue">Save &amp; Continue</button>
      <button
        class="secondary"
        @click="saveAsDraft">Save as Draft &amp; Exit</button>
      <button class="secondary">Cancel</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

const namespace = 'videos';

export default {
  name: 'VideoStep1',
  data() {
    return {
      step1: {
        name: '',
        notes: '',
        due_date: '',
      },
      dueDate: null,
      quillFocused: false,
      editorOptions: {
        placeholder: 'Start your message...',
        bounds: '#notes',
        modules: {
          toolbar: {
            container: [
              ['bold', 'italic', 'underline'],
              ['blockquote'],
              [{ list: 'ordered' }, { list: 'bullet' }],
            ],
          },
        },
      },
    };
  },
  computed: {
    ...mapGetters(namespace, ['video']),
  },
  created() {
    this.step1.name = this.video.name;
    this.step1.notes = this.video.notes;
    this.step1.due_date = this.video.due_date;
  },
  methods: {
    saveAndContinue() {
      if (this.step1.name) {
        this.$emit('continue', this.step1);
      } else {
        window.alert('Please give the video a name');
      }
    },
    saveAsDraft() {
      if (this.step1.name) {
        this.$emit('save', this.step1);
      } else {
        window.alert('Please give the video a name');
      }
    },
  },
};
</script>

<style scoped>
</style>
