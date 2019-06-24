<template>
  <div class="details">
    <div class="columns">
      <div class="details-column">
        <div class="detail">
          <h3>Email Subject</h3>
          <p>First Video</p>
        </div>
        <div class="detail">
          <div class="recipients-count">
            <span>5</span>
            <h3>Recipients</h3>
          </div>
          <div class="recipients">
            <div
              v-for="n in 5"
              :key="n"
              class="recipient">
              <p class="recipient-name">Kyle Adkins</p>
              <p>kyle.adkins@apptegy.com</p>
            </div>
          </div>
        </div>
        <div class="detail">
          <h3>Created On</h3>
          <p>July 5, 2019</p>
        </div>
        <div class="detail">
          <h3>Status</h3>
          <p>Sent</p>
        </div>
        <div class="detail">
          <h3>Assigned To</h3>
          <div class="assigned-to">
            <div
              :style="{ backgroundImage: 'url(https://images.unsplash.com/photo-1533450718592-29d45635f0a9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60)' }"/>
            <p>Todd French</p>
          </div>
        </div>
        <div class="detail">
          <h3>Due Date</h3>
          <p>July 4, 2019</p>
        </div>
        <div class="detail">
          <h3>Duration</h3>
          <p>1:29</p>
        </div>
        <div class="detail">
          <h3>Notes</h3>
          <p>Some really cool notes</p>
        </div>
      </div>
      <div class="preview">
        <div class="label">
          <h3>Email Preview</h3>
          <router-link
            to="/">
            Preview Video Landing Page
            <img
              src="@/assets/icons/preview-icon.svg"
              alt="Open link icon">
          </router-link>
        </div>
        <div class="video-preview">
          <EmailPreview
            headline="Watch My Video"
            :hero-image="require('@/assets/images/video-preview.png')"
            body="Thanks for watching this video"
            button-text="Click Here to Learn More"
            button-link="https://google.com"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EmailPreview from '@/components/EmailPreview.vue';

export default {
  name: 'Details',
  components: {
    EmailPreview,
  },
};
</script>

<style scoped>
.edit {
  width: 75px;
}
.sender-email {
  margin-top: 4px;
  color: #8d8d8d;
}
.columns {
  display: flex;
  padding-bottom: 24px;
}
.details-column {
  margin-right: 48px;
  width: 250px;
}
.details-column h3,
.preview h3 {
  font-size: 12px;
  letter-spacing: 1px;
  text-transform: uppercase;
  font-family: 'Neue Haas Grotesk Disp W05_75B';
  margin-bottom: 4px;
}
.details-column p {
  color: #8d8d8d;
}
.detail {
  margin-bottom: 24px;
}
.assigned-to {
  display: flex;
  align-items: center;
}
.assigned-to div {
  height: 24px;
  width: 24px;
  background-position: center;
  border-radius: 50%;
  background-size: cover;
  margin-right: 4px;
}
.preview {
  width: 700px;
}
.preview .label {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}
.preview .label a {
  font-size: 14px;
}
.recipient {
  margin-bottom: 8px;
}
.recipients-count span {
  display: inline-block;
  padding: 2px;
  color: #000;
  font-family: 'Neue Haas Grotesk Disp W05_75B';
  border-bottom: 2px solid #f07365;
  margin-right: 4px;
  font-size: 12px;
  margin-bottom: 8px;
}
.recipients-count h3 {
  display: inline;
}
.details .recipient .recipient-name {
  font-family: 'Neue Haas Grotesk Disp W05_75B';
  font-size: 14px;
  color: #000;
}
.video-preview {
  line-height: 1.15;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 2px 4px #d7d7d7;
  padding: 40px 80px;
}
</style>
