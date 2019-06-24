<template>
  <div class="message-modal">
    <Modal
      :title="`${(editableMessage.id) > -1 ? 'Update' : 'Create' } Message`"
      @close-modal="$emit('close-modal')">
      <div class="subject">
        <label
          class="inline"
          for="subject">Subject: </label>
        <input
          v-model="editableMessage.subject"
          id="subject"
          type="text"
          placeholder="Add subject here...">
      </div>
      <div class="send-time">
        <label
          class="inline">Scheduled date: </label>
        <ctk-date-time-picker
          v-model="editableMessage.send_time"
          without-header
          time-format="h:mm A"
          formatted="MMM D, YYYY hh:mmA"
          label="Select a date &amp; time..."/>
      </div>
      <div class="message">
        <div class="message-field">
          <div class="message-checkbox">
            <label
              class="inline"
              for="headline">Headline</label>
            <ToggleSwitch
              id="headline"
              :value="editableMessage.headline !== null"
              @change.native="toggleMessageField($event, 'headline')"/>
          </div>
          <div
            v-if="editableMessage.headline !== null"
            class="message-field-options">
            <input
              v-model="editableMessage.headline"
              class="headline"
              type="text"
              placeholder="Click Here to Edit Headline"/>
          </div>
        </div>
        <div class="message-field hero">
          <div class="message-checkbox">
            <label
              class="inline"
              for="hero">Hero image</label>
            <ToggleSwitch
              id="hero"
              :value="editableMessage.hero_image !== null"
              @change.native="toggleMessageField($event, 'hero_image')"/>
          </div>
          <div
            v-if="editableMessage.hero_image !== null"
            class="message-field-options">
            <div class="hero-preview">
              <img
                v-if="editableMessage.hero_image.length > 0"
                :src="editableMessage.hero_image"
                alt="Email hero image preview"
                class="hero-image">
              <div
                v-else
                class="hero-placeholder"/>
              <label
                v-if="!uploadingImage"
                class="hero-label">
                <img
                  src="@/assets/icons/pencil.svg"
                  alt="Edit hero image">
                <input
                  type="file"
                  @change="upload">
              </label>
            </div>
          </div>
        </div>
        <div class="message-field">
          <div class="message-checkbox">
            <label
              class="inline"
              for="button">Button</label>
            <ToggleSwitch
              id="button"
              :value="editableMessage.button.link !== null || editableMessage.button.text !== null"
              @change.native="toggleMessageField($event, 'button')"/>
          </div>
          <div
            v-if="editableMessage.button.link !== null || editableMessage.button.text !== null"
            class="message-field-options">
            <div
              v-on-clickaway="hideUrl"
              class="button-container">
              <div class="button">
                <input
                  v-model="editableMessage.button.text"
                  type="text"
                  placeholder="Click to Change Button Label/URL"
                  maxlength="35"
                  @focus="showUrl = true">
                <div
                  v-if="showUrl"
                  class="button-link">
                  <label for="url">URL</label>
                  <input
                    v-model="editableMessage.button.link"
                    id="url"
                    type="text"
                    placeholder="Add URL here...">
                </div>
              </div>
            </div>
          </div>
        </div>
        <label class="message-label">
          <span>Message</span>
          <button>Preview Message</button>
        </label>
        <quill-editor
          ref="quillEditor"
          id="message"
          v-model="editableMessage.text"
          :options="editorOptions"/>
        <div
          class="approval-status"
          :class="{ approved: editableMessage.approved }">
          <p>
            <img
              :src="approvalIcon"
              alt="Message is not approved">
            {{ approvalMessage }}
          </p>
          <button
            class="white"
            @click="editableMessage.approved = !editableMessage.approved">
            Mark as {{ (editableMessage.approved) ? 'In Progress' : 'Approved' }}
          </button>
        </div>
      </div>
      <div class="buttons">
        <button
          :disabled="uploadingImage"
          class="primary"
          @click="submitMessage">Save Message</button>
        <button
          class="secondary"
          @click="$emit('close-modal')">Cancel</button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Modal from '@/components/Modal.vue';
import ToggleSwitch from '@/components/ToggleSwitch.vue';
import { isFutureDate } from '@/helpers';
import warningIcon from '@/assets/icons/warning.svg';
import successIcon from '@/assets/icons/success.svg';

const namespace = 'campaigns';

export default {
  name: 'MessageModal',
  components: {
    Modal,
    ToggleSwitch,
  },
  props: ['message'],
  data() {
    return {
      showUrl: false,
      uploadingImage: false,
      editorOptions: {
        placeholder: 'Start your message...',
        bounds: '#message',
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
      editableMessage: null,
    };
  },
  computed: {
    approvalIcon() {
      if (this.editableMessage.approved) {
        return successIcon;
      }
      return warningIcon;
    },
    approvalMessage() {
      if (this.editableMessage.approved) {
        return 'This message will be sent because you marked it as "Approved."';
      }
      return 'This message will not be sent until you mark it as "Approved."';
    },
  },
  created() {
    this.editableMessage = { ...this.message };
  },
  methods: {
    ...mapActions(namespace, ['createMessage', 'updateMessage', 'uploadImage']),
    hideUrl() {
      this.showUrl = false;
    },
    toggleMessageField(evt, option) {
      if (option === 'button') {
        if (evt.target.checked) {
          this.editableMessage.button = { link: '', text: '' };
        } else {
          this.editableMessage.button = { link: null, text: null };
        }
      } else if (evt.target.checked) {
        this.editableMessage[option] = '';
      } else {
        this.editableMessage[option] = null;
      }
    },
    upload(evt) {
      this.uploadingImage = true;
      const image = evt.target.files[0];
      /* eslint-disable-next-line no-param-reassign */
      evt.target.value = '';
      this.uploadImage(image)
        .then((data) => {
          this.editableMessage.hero_image = data.public_url;
          this.uploadingImage = false;
        })
        .catch((err) => {
          console.log(err);
          window.alert('Unable to upload image');
        });
    },
    isValidMessage() {
      return (
        isFutureDate(this.editableMessage.send_time)
        && this.editableMessage.subject
        && this.editableMessage.text
      );
    },
    submitMessage() {
      if (this.isValidMessage()) {
        if (this.editableMessage.subject && this.editableMessage.text) {
          let promise;
          const campaignId = parseInt(this.$route.params.id, 10);
          const payload = {
            campaignId,
            message: this.editableMessage,
          };
          if (this.editableMessage.id > -1) {
            promise = this.updateMessage(payload);
          } else {
            promise = this.createMessage(payload);
          }
          promise
            .then(() => {
              this.$emit('save');
              this.$emit('close-modal');
            })
            .catch((err) => {
              console.log(err);
            });
        }
      } else {
        window.alert(
          "Invalid message. Please make sure that the subject and message fields aren't blank and the date is in the future",
        );
      }
    },
  },
};
</script>

<style lang="scss">
.message-modal {
  .modal-body {
    width: 800px;
  }
  .modal-header,
  .message {
    padding: 24px 48px;
  }
  .modal-content {
    padding-bottom: 32px;
  }
  .modal-content label,
  .modal-content input {
    font-size: 14px;
  }
  label {
    display: block;
    font-family: 'Neue Haas Grotesk Disp W05_65M';
  }
  label.inline {
    display: inline-block;
    margin-right: 8px;
  }
  .subject,
  .send-time {
    padding: 16px 48px;
    border-top: 1px solid #e1e1e1;
    border-bottom: 1px solid #e1e1e1;
  }
  .send-time {
    border-top: none;
  }
  input#subject {
    width: 80%;
    border: none;
  }
  input#subject:focus {
    border: none;
  }
  .message {
    height: 500px;
    overflow-y: scroll;
  }
  .message label {
    margin-bottom: 16px;
  }
  .message-field {
    margin-bottom: 16px;
    display: flex;
  }
  .message-field.hero {
    align-items: flex-start;
  }
  .message .message-field label {
    margin-bottom: 0;
    margin-left: 8px;
  }
  .message-field .message-checkbox {
    width: 25%;
    display: inline-flex;
    align-items: center;
  }
  .message-field .message-field-options {
    width: 75%;
    text-align: center;
  }
  .message-field-options input.headline {
    border: none;
    font-size: 24px;
    width: 100%;
    text-align: center;
    font-family: 'Neue Haas Grotesk Disp W05_65M';
    &::placeholder {
      color: #000;
      font-family: 'Neue Haas Grotesk Disp W05_65M';
    }
    &:focus::placeholder {
      color: #e1e1e1;
    }
  }
  .message-field-options .hero-preview {
    position: relative;
    display: inline-block;
  }
  .message-field-options .hero-image,
  .message-field-options .hero-placeholder {
    width: 500px;
  }
  .message-field-options .hero-image {
    height: auto;
  }
  .message-field-options .hero-placeholder {
    background: #EFEFEF;
    height: 400px;
  }
  .hero-label {
    background: #fff;
    position: absolute;
    top: 16px;
    right: 16px;
    display: inline-block;
    margin-left: 0;
    text-align: center;
    padding: 8px 12px;
  }
  .hero-label input {
    opacity: 0;
    position: absolute;
    left: -9999px;
    height: 1px;
    width: 1px;
  }
  .message-field-options .button-container {
    position: relative;
    width: 350px;
    display: inline-block;
  }
  .message-field-options .button {
    border-radius: 4px;
    background: #B50E0E;
    padding: 16px 0;
  }
  .message-field-options .button > input {
    background: transparent;
    border: none;
    font-size: 16px;
    width: 100%;
    text-align: center;
    color: #fff;
    &::placeholder {
      color: #fff;
      font-family: 'Neue Haas Grotesk Disp W05_65M';
    }
    &:focus::placeholder {
      color: rgba(255, 255, 255, 0.8);
    }
  }
  .message-field-options .button-link {
    position: absolute;
    top: 100%;
    margin-top: 8px;
    box-shadow: 0px 2px 4px #d7d7d7;
    padding: 16px;
    background: #fff;
    width: 100%;
    text-align: left;
    border-radius: 4px;
  }
  .message-field-options .button-link label {
    margin: 0;
    margin-bottom: 8px;
  }
  .message-field-options .button-link input {
    padding: 8px 0;
    width: 100%;
  }
  .message-field label.toggle-switch {
    margin-left: 0;
  }
  .message .message-label {
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .message-label button {
    color: #5736bb;
    font-family: 'Neue Haas Grotesk Disp W05_55R';
  }
  .buttons {
    padding: 0 48px;
  }
  .buttons button {
    margin-right: 16px;
    width: 100px;
  }
  .buttons button:first-of-type {
    width: 150px;
  }
  #quill-image {
    position: absolute;
    left: -999999px;
    opacity: 0;
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
    padding: 0;
    transition: 0.2s border-color ease;
    font-size: 14px;
    border: none;
    margin: 0;
    border-radius: 0;
    color: #000;
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
  .ql-container {
    min-height: 300px;
    max-height: 300px;
    overflow: auto;
  }
  .ql-editor {
    height: 100%;
  }
  .ql-editor.ql-blank::before {
    color: #999;
    font-style: normal;
    font-size: 14px;
  }
  .ql-snow.ql-toolbar button:hover .ql-fill,
  .ql-snow .ql-toolbar button:hover .ql-fill,
  .ql-snow.ql-toolbar button:focus .ql-fill,
  .ql-snow .ql-toolbar button:focus .ql-fill,
  .ql-snow.ql-toolbar button.ql-active .ql-fill,
  .ql-snow .ql-toolbar button.ql-active .ql-fill,
  .ql-snow.ql-toolbar .ql-picker-label:hover .ql-fill,
  .ql-snow .ql-toolbar .ql-picker-label:hover .ql-fill,
  .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-fill,
  .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-fill,
  .ql-snow.ql-toolbar .ql-picker-item:hover .ql-fill,
  .ql-snow .ql-toolbar .ql-picker-item:hover .ql-fill,
  .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-fill,
  .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-fill,
  .ql-snow.ql-toolbar button:hover .ql-stroke.ql-fill,
  .ql-snow .ql-toolbar button:hover .ql-stroke.ql-fill,
  .ql-snow.ql-toolbar button:focus .ql-stroke.ql-fill,
  .ql-snow .ql-toolbar button:focus .ql-stroke.ql-fill,
  .ql-snow.ql-toolbar button.ql-active .ql-stroke.ql-fill,
  .ql-snow .ql-toolbar button.ql-active .ql-stroke.ql-fill,
  .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill,
  .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill,
  .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill,
  .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill,
  .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill,
  .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill,
  .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill,
  .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill {
    fill: #5736bb;
  }
  .ql-snow.ql-toolbar button:hover .ql-stroke,
  .ql-snow .ql-toolbar button:hover .ql-stroke,
  .ql-snow.ql-toolbar button:focus .ql-stroke,
  .ql-snow .ql-toolbar button:focus .ql-stroke,
  .ql-snow.ql-toolbar button.ql-active .ql-stroke,
  .ql-snow .ql-toolbar button.ql-active .ql-stroke,
  .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke,
  .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke,
  .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke,
  .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke,
  .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke,
  .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke,
  .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke,
  .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke,
  .ql-snow.ql-toolbar button:hover .ql-stroke-miter,
  .ql-snow .ql-toolbar button:hover .ql-stroke-miter,
  .ql-snow.ql-toolbar button:focus .ql-stroke-miter,
  .ql-snow .ql-toolbar button:focus .ql-stroke-miter,
  .ql-snow.ql-toolbar button.ql-active .ql-stroke-miter,
  .ql-snow .ql-toolbar button.ql-active .ql-stroke-miter,
  .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke-miter,
  .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke-miter,
  .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,
  .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,
  .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke-miter,
  .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke-miter,
  .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter,
  .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter {
    stroke: #5736bb;
  }
  .ql-snow.ql-toolbar button:hover,
  .ql-snow .ql-toolbar button:hover,
  .ql-snow.ql-toolbar button:focus,
  .ql-snow .ql-toolbar button:focus,
  .ql-snow.ql-toolbar button.ql-active,
  .ql-snow .ql-toolbar button.ql-active,
  .ql-snow.ql-toolbar .ql-picker-label:hover,
  .ql-snow .ql-toolbar .ql-picker-label:hover,
  .ql-snow.ql-toolbar .ql-picker-label.ql-active,
  .ql-snow .ql-toolbar .ql-picker-label.ql-active,
  .ql-snow.ql-toolbar .ql-picker-item:hover,
  .ql-snow .ql-toolbar .ql-picker-item:hover,
  .ql-snow.ql-toolbar .ql-picker-item.ql-selected,
  .ql-snow .ql-toolbar .ql-picker-item.ql-selected {
    color: #5736bb;
  }
  .approval-status {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 4px;
    margin-top: 16px;
    padding: 12px 24px;
    background: #F37366;
    font-size: 14px;
  }
  .approval-status.approved {
    background: #3AB5B5;
  }
  .approval-status p {
    color: #fff;
  }
  .approval-status img {
    vertical-align: middle;
    margin-right: 8px;
  }
  .approval-status button {
    border: none;
  }
}
</style>
