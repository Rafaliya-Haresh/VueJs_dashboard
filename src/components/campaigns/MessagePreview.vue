<template>
  <div class="message-preview">
    <Modal
      title="Message Preview"
      @close-modal="$emit('close-modal')">
      <div class="scroll">
        <EmailPreview
          :headline="message.headline"
          :hero-image="message.hero_image"
          :body="message.text"
          :button-text="message.button.text"
          :button-link="message.button.link"/>
      </div>
    </Modal>
  </div>
</template>

<script>
import Modal from '@/components/Modal.vue';
import EmailPreview from '@/components/EmailPreview.vue';

export default {
  name: 'MessagePreview',
  components: {
    Modal,
    EmailPreview,
  },
  props: {
    message: {
      type: Object,
      default: () => ({
        subject: '',
        send_time: null,
        text: '',
        headline: null,
        hero_image: null,
        button: null,
        approved: false,
      }),
    },
  },
};
</script>

<style lang="scss">
.message-preview {
  .modal-body {
    width: 600px;
  }
  .modal-header,
  .message {
    padding: 24px 48px;
  }
  .modal-content {
    padding-bottom: 32px;
  }
  a {
    color: #E60122;
  }
  p {
    font-size: 14px;
    line-height: 1.15;
  }
  .scroll {
    margin: 0 auto;
    width: 500px;
    max-height: 600px;
    overflow-y: scroll;
  }
  .logo {
    width: 75px;
    height: auto;
    margin-bottom: 32px;
  }
  .logo.no-headline {
    margin-bottom: 0;
  }
  .headline,
  .hero,
  .button {
    margin-bottom: 16px;
  }
  .headline {
    font-family: 'Neue Haas Grotesk Disp W05_75B';
  }
  .hero {
    width: 100%;
    height: auto;
  }
  .text {
    text-align: left;
    margin: 32px 0;
  }
  .text p {
    line-height: 1.4;
  }
  .button {
    background: #E60122;
    color: #fff;
    display: inline-block;
    border-radius: 4px;
    padding: 16px 32px;
  }
  hr {
    display: block;
    height: 2px;
    border: 0;
    border-top: 2px solid #f1f1f1;
    margin-bottom: 16px;
  }
  .footer {
    display: flex;
    text-align: left;
  }
  .footer div {
    width: 50%;
  }
}
</style>
