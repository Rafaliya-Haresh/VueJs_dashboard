<template>
  <div class="campaign-details">
    <div class="container">
      <div
        v-if="campaign.status === 'active' && numUnapprovedMessages > 0 && displayWarning"
        class="warning">
        <div class="warning-message">
          <img
            class="warning-icon"
            src="@/assets/icons/warning.svg"
            alt="Warning icon">
          <p>
            <span class="number">
              {{ numUnapprovedMessages }}
            </span>
            messages are waiting to be approved
          </p>
        </div>
        <button @click="displayWarning = false">
          <img
            class="close-icon"
            src="@/assets/icons/close-icon-white.svg"
            alt="Close notification">
        </button>
      </div>
      <Breadcrumbs :crumbs="[
        { name: 'Home', link: '/people' },
        { name: 'Campaigns', link: '/campaigns' },
        { name: campaign.name, link: `/campaigns/${campaign.id}` }]"/>
      <PageHeading :title="campaign.name">
        <template slot="filters">
          <span
            class="campaign-status"
            :class="campaign.status">
            <span class="dot"/>
            {{ capitalize(campaign.status) }}
          </span>
          <span class="recipients">{{ campaign.recipient_count || '0' }} Recipients</span>
        </template>
        <template
          v-if="campaign.status !== 'inactive'"
          slot="buttons">
          <button
            class="secondary"
            @click="$router.push(`${$route.path}/recipients/add`)">Add Recipients</button>
          <button
            class="primary"
            @click="SET_MODAL(Modal.CampaignMessage)">Add Message</button>
          <span
            v-if="campaign.status !== 'completed'"
            class="more">
            <button
              class="secondary"
              @click="toggleOptions"
              v-on-clickaway="hideOptions">
              <img
                src="@/assets/icons/more.svg"
                alt="More options">
            </button>
            <CampaignOptions
              v-if="optionsOpen"
              :status="campaign.status"
              :campaign-id="campaignId"/>
          </span>
        </template>
      </PageHeading>
      <div class="actions">
        <div/>
        <DataOptions>
          <input
            v-model="query"
            class="search"
            type="text"
            placeholder="Search...">
        </DataOptions>
      </div>
      <div class="messages">
        <div class="th-row">
          <div class="th">Message Overview</div>
          <div class="th">Total Delivered</div>
          <div class="th">Total Opened</div>
          <div class="th">Total Clicked</div>
        </div>
        <Message
          v-for="(message, idx) in sortedAnalytics"
          :key="idx"
          :message="message"
          @view="viewMessage(message)"
          @edit="edit(message)"
          @delete="del(message.id)"/>
      </div>
    </div>
    <MessageModal
      v-if="modal === Modal.CampaignMessage"
      :message="editableMessage"
      @close-modal="SET_MODAL(null); message = null"
      @save="fetchAnalytics"/>
    <MessagePreview
      v-if="modal === Modal.MessagePreview"
      :message="message"
      @close-modal="SET_MODAL(null); message = null"/>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import PageHeading from '@/components/PageHeading.vue';
import DataOptions from '@/components/DataOptions.vue';
import MessageModal from '@/components/campaigns/MessageModal.vue';
import CampaignOptions from '@/components/campaigns/CampaignOptions.vue';
import MessagePreview from '@/components/campaigns/MessagePreview.vue';
import Message from '@/components/campaigns/Message.vue';
import { capitalize, Modal } from '@/helpers';

const namespace = 'campaigns';

export default {
  name: 'CampaignDetails',
  components: {
    Breadcrumbs,
    PageHeading,
    DataOptions,
    MessageModal,
    CampaignOptions,
    MessagePreview,
    Message,
  },
  data() {
    return {
      query: '',
      messageAnalytics: [],
      capitalize,
      Modal,
      optionsOpen: false,
      message: null,
      displayWarning: true,
    };
  },
  computed: {
    ...mapGetters(['modal']),
    ...mapGetters(namespace, ['campaign']),
    numUnapprovedMessages() {
      return this.campaign.messages.filter((message) => !message.approved).length;
    },
    campaignId() {
      return this.$route.params.id;
    },
    sortedAnalytics() {
      return [...this.messageAnalytics]
        .filter((message) => message.subject.toLowerCase().includes(this.query.toLowerCase()))
        .sort((a, b) => this.$moment(a.send_time) - this.$moment(b.send_time));
    },
    editableMessage() {
      if (this.message) {
        return this.message;
      }
      return {
        id: -1,
        subject: '',
        send_time: null,
        text: '',
        headline: null,
        hero_image: null,
        button: {
          link: null,
          text: null,
        },
        approved: false,
      };
    },
  },
  created() {
    this.fetchAnalytics();
    if (this.$route.query.new === 'true') {
      this.SET_MODAL(Modal.CampaignMessage);
    }
  },
  methods: {
    ...mapMutations(['SET_MODAL']),
    ...mapMutations(namespace, ['SET_CAMPAIGN']),
    ...mapActions(namespace, ['fetchCampaign', 'fetchMessageAnalytics', 'deleteMessage']),
    fetchAnalytics() {
      this.fetchCampaign(this.campaignId)
        .then((campaign) => {
          this.messageAnalytics = [];
          this.SET_CAMPAIGN(campaign);
          this.campaign.messages.forEach((message) => {
            this.fetchMessageAnalytics({ campaignId: this.campaignId, messageId: message.id })
              .then((analytics) => {
                this.messageAnalytics = [...this.messageAnalytics, analytics];
              });
          });
        });
    },
    toggleOptions() {
      this.optionsOpen = !this.optionsOpen;
    },
    hideOptions() {
      this.optionsOpen = false;
    },
    viewMessage(message) {
      this.SET_MODAL(Modal.MessagePreview);
      this.message = message;
    },
    del(messageId) {
      if (window.confirm('Are you sure you want to delete this message?')) {
        this.deleteMessage({ campaignId: this.campaignId, messageId }).then(() => {
          this.fetchAnalytics();
        });
      }
    },
    edit(message) {
      this.message = message;
      this.SET_MODAL(Modal.CampaignMessage);
    },
  },
};
</script>

<style src="@/assets/css/circular-progress-bar.css"></style>

<style lang="scss" scoped>
.warning {
  background: #f57e71;
  color: #fff;
  padding: 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 48px;
}
.warning-message {
  display: flex;
  align-items: center;
}
.warning-message .number {
  font-family: 'Neue Haas Grotesk Disp W05_65M';
}
.warning-icon {
  margin-right: 12px;
  vertical-align: middle;
}
.warning button {
  padding: 0;
}
.warning .close-icon {
  height: 16px;
  width: auto;
}
.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
.more {
  position: relative;
  margin-left: 16px;
}
.th {
  width: 15%;
  padding-left: 0;
}
.th:first-of-type {
  width: 30%;
}
.secondary img {
  vertical-align: middle;
}
.campaign-status {
  margin-right: 16px;
}
.recipients {
  color: #5736bb;
}
.campaign-status .dot {
  display: inline-block;
  vertical-align: middle;
  height: 4px;
  width: 4px;
  border-radius: 50%;
  margin-right: 8px;
}
.campaign-status.completed {
  color: #29C682;
  & .dot {
    background: #29C682;
  }
}
.campaign-status.active {
  color: #5736bb;
  & .dot {
    background: #5736bb;
  }
}
.campaign-status.draft,
.campaign-status.inactive {
  color: #d45067;
  & .dot {
    background: #d45067;
  }
}
.th:not(:first-of-type) {
  text-align: center;
}
</style>
