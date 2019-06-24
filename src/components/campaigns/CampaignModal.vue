<template>
  <div class="campaign-modal">
    <Modal
      :title="(campaign) ? 'Edit Campaign' : 'Create Campaign'"
      @close-modal="$emit('close-modal')">
      <div class="field">
        <label for="name">Name</label>
        <input
          v-model="name"
          id="name"
          type="text"
          placeholder="Soccer Fundraiser">
      </div>
      <div class="buttons">
        <button
          :disabled="isSaving"
          class="primary"
          @click="saveCampaign">{{ (isSaving) ? 'Saving...' : 'Save' }}</button>
        <button
          class="secondary"
          @click="$emit('close-modal')">Cancel</button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';
import Modal from '@/components/Modal.vue';

const namespace = 'campaigns';

export default {
  name: 'CampaignModal',
  components: {
    Modal,
  },
  props: {
    campaign: {
      default: () => ({}),
      type: Object,
    },
  },
  data() {
    return {
      name: '',
      isSaving: false,
    };
  },
  created() {
    if (this.campaign) {
      this.name = this.campaign.name;
    }
  },
  methods: {
    ...mapMutations(['SET_MODAL']),
    ...mapMutations(namespace, ['SET_CAMPAIGNS']),
    ...mapActions(namespace, ['updateCampaign', 'createCampaign', 'fetchCampaigns']),
    saveCampaign() {
      this.isSaving = true;
      let promise;
      if (this.campaign) {
        promise = this.updateCampaign({
          campaignId: this.campaign.id,
          name: this.name,
        });
      } else {
        promise = this.createCampaign(this.name);
      }
      promise.then(({ id }) => {
        this.SET_MODAL(null);
        this.$router.push(`/campaigns/${id}?new=true`);
      }).catch((err) => {
        console.log(err);
      });
    },
  },
};
</script>

<style lang="scss">
.campaign-modal {
  .modal-body {
    width: 400px;
    padding: 32px 48px;
  }
  .modal-header {
    margin-bottom: 24px;
  }
  .field {
    margin-bottom: 24px;
  }
  label {
    display: block;
    margin-bottom: 8px;
  }
  input {
    width: 100%;
    padding-bottom: 4px;
  }
  .buttons button {
    width: 100px;
    margin-right: 16px;
  }
}
</style>
