<template>
  <div class="campaigns">
    <div class="container">
      <Breadcrumbs :crumbs="[
        { name: 'Home', link: '/people' },
        { name: 'Campaigns', link: '' }]"/>
      <PageHeading title="Campaigns">
        <template slot="filters">
          <div
            class="filter-dropdown"
            v-on-clickaway="closeFiltersDropdown">
            <button
              class="filter-dropdown-button"
              @click="filtersDropdownOpen = !filtersDropdownOpen">
              {{ capitalize(selectedStatus) }}
              <span class="count">({{ statusCounts[selectedStatus] }})</span>
            </button>
            <div
              v-if="filtersDropdownOpen"
              class="options">
              <button
                v-for="(option, idx) in statuses"
                :key="idx"
                @click="selectedStatus = option; filtersDropdownOpen = false">
                {{ capitalize(option) }}
                <span class="count">({{ statusCounts[option] }})</span>
              </button>
            </div>
          </div>
        </template>
        <template slot="buttons">
          <button
            class="primary"
            @click="SET_MODAL(Modal.Campaign); campaign = null">Create Campaign</button>
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
      <Campaign
        v-for="campaign in filteredCampaigns"
        :key="campaign.id"
        :campaign="campaign"/>
    </div>
    <CampaignModal
      v-if="modal === Modal.Campaign"
      :campaign="campaign"
      @create-campaign="getAnalytics([$event])"
      @close-modal="SET_MODAL(null)"/>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { capitalize, Modal } from '@/helpers';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import PageHeading from '@/components/PageHeading.vue';
import DataOptions from '@/components/DataOptions.vue';
import CampaignModal from '@/components/campaigns/CampaignModal.vue';
import Campaign from '@/components/campaigns/Campaign.vue';

const namespace = 'campaigns';

export default {
  name: 'Campaigns',
  components: {
    Breadcrumbs,
    PageHeading,
    DataOptions,
    CampaignModal,
    Campaign,
  },
  data() {
    return {
      Modal,
      campaignsLoading: false,
      query: '',
      selectedStatus: 'active',
      campaign: null,
      capitalize,
      filtersDropdownOpen: false,
      campaignAnalytics: [],
      statuses: ['active', 'inactive', 'draft', 'completed'],
    };
  },
  computed: {
    ...mapGetters(['modal']),
    ...mapGetters(namespace, ['campaigns']),
    filteredCampaigns() {
      return this.campaignAnalytics.filter(({ name, status }) => name
        .toLowerCase()
        .includes(this.query.toLowerCase())
        && status === this.selectedStatus);
    },
    statusCounts() {
      const counts = {};
      this.statuses.forEach((status) => {
        counts[status] = this.campaigns.filter((c) => c.status === status).length;
      });
      return counts;
    },
  },
  created() {
    this.fetchCampaigns().then(({ campaigns }) => {
      this.SET_CAMPAIGNS(campaigns);
      this.getAnalytics(campaigns.map((c) => c.id));
    });
  },
  methods: {
    ...mapMutations(['SET_MODAL']),
    ...mapMutations(namespace, ['SET_CAMPAIGNS']),
    ...mapActions(namespace, ['fetchCampaigns', 'fetchCampaignAnalytics']),
    getAnalytics(campaignIds) {
      campaignIds.forEach((id) => {
        this.fetchCampaignAnalytics(id)
          .then((analytics) => {
            this.campaignAnalytics.push(analytics);
          });
      });
    },
    closeFiltersDropdown() {
      this.filtersDropdownOpen = false;
    },
    formatCampaignDate(dateStr) {
      if (dateStr) {
        return this.$moment(dateStr).format('MMM D, YYYY hh:mma');
      }
      return '-';
    },
  },
};
</script>

<style scoped>
.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
</style>
