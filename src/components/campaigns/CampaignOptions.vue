<template>
  <div class="options">
    <button
      v-if="['draft'].includes(status)"
      @click="toggleCampaignStatus(true)">Activate Campaign</button>
    <button
      v-if="['draft'].includes(status)"
      @click="del">Delete Campaign</button>
    <button
      v-if="['active'].includes(status)"
      @click="toggleCampaignStatus(false)">Deactivate Campaign</button>
    <router-link
      :to="`${$route.path}/recipients/view`"
      v-if="['active', 'draft'].includes(status)">View Recipients</router-link>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';

const namespace = 'campaigns';

export default {
  name: 'CampaignOptions',
  props: {
    status: {
      type: String,
      default: '',
    },
    campaignId: {
      type: String,
      default: '',
    },
  },
  methods: {
    ...mapMutations(namespace, ['SET_CAMPAIGN']),
    ...mapActions(namespace, ['fetchCampaign', 'deleteCampaign', 'activateCampaign', 'deactivateCampaign']),
    del() {
      if (window.confirm('Are you sure you want to delete this campaign?')) {
        this.deleteCampaign(this.campaignId).then(() => {
          this.$router.push('/campaigns');
        });
      }
    },
    toggleCampaignStatus(activate) {
      let promise;
      if (activate) {
        promise = this.activateCampaign(this.campaignId);
      } else {
        promise = this.deactivateCampaign(this.campaignId);
      }
      promise.then(() => {
        this.fetchCampaign(this.campaignId).then((campaign) => {
          this.SET_CAMPAIGN(campaign);
        }).catch((err) => {
          console.log(err);
        });
      }).catch((err) => {
        console.log(err);
      });
    },
  },
};
</script>

<style scoped>
.options {
  position: absolute;
  right: 0;
  width: 175px;
  margin-top: 16px;
}
.options button,
.options a {
  color: #000;
  padding: 0;
  width: 100%;
  font-size: 14px;
  text-align: left;
  margin-bottom: 8px;
}
.options:last-child {
  margin-bottom: 0;
}
</style>
