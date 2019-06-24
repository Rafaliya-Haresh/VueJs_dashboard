<template>
  <div class="add-to-campaign">
    <Modal
      title="Add To Campaign"
      @close-modal="$emit('close-modal')">
      <div class="contacts-selected">
        <span>{{ selectedContacts.length }}</span>
        contact{{ selectedContacts.length === 1 ? '' : 's' }} selected
      </div>
      <div class="field">
        <div
          v-for="(campaign, idx) in campaigns"
          :key="idx"
          class="campaign">
          <input
            v-model="campaignId"
            :id="campaign.id"
            type="radio"
            name="campaign"
            :value="campaign.id">
          <label
            :for="campaign.id"
            class="radio-label">{{ campaign.name }}</label>
        </div>
      </div>
      <div class="buttons">
        <button
          :disabled="isAdding"
          class="primary"
          @click="addToCampaign">{{ (isAdding) ? 'Adding...' : 'Add Contacts' }}</button>
        <button
          class="secondary"
          @click="$emit('close-modal')">Cancel</button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import Modal from '../Modal.vue';

const namespace = 'people';

export default {
  name: 'AddToCampaign',
  components: {
    Modal,
  },
  data() {
    return {
      campaigns: [],
      isAdding: false,
      campaignId: -1,
    };
  },
  computed: {
    ...mapGetters(namespace, ['selectedContacts']),
  },
  created() {
    this.fetchCampaigns().then(({ campaigns }) => {
      this.campaigns = campaigns;
      this.campaignId = this.campaigns[0].id;
    });
  },
  methods: {
    ...mapMutations(['SET_MODAL']),
    ...mapActions(namespace, ['addRecipientsToCampaign']),
    ...mapActions('campaigns', ['fetchCampaigns']),
    addToCampaign() {
      this.isAdding = true;
      this.addRecipientsToCampaign({
        campaignId: this.campaignId,
        contactIds: this.selectedContacts,
      })
        .then(() => {
          this.SET_MODAL(null);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss">
.add-to-campaign {
  .modal-body {
    width: 500px;
    padding: 32px 48px;
  }
  .modal-header {
    margin-bottom: 24px;
  }
  .contacts-selected {
    margin-bottom: 24px;
    color: #8d8d8d;
  }
  .contacts-selected span {
    display: inline-block;
    padding: 2px;
    color: #000;
    font-family: 'Neue Haas Grotesk Disp W05_75B';
    border-bottom: 2px solid #f07365;
  }
  .field {
    margin-bottom: 24px;
  }
  .campaign {
    margin-bottom: 8px;
  }
  .buttons button {
    margin-right: 16px;
  }
}
</style>
