<template>
  <div class="videos">
    <div class="container">
      <Breadcrumbs :crumbs="[
        { name: 'Home', link: '/people' },
        { name: 'Videos', link: '' }]"/>
      <PageHeading title="Videos">
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
            @click="$router.push('/videos/new')">Record New Video</button>
        </template>
      </PageHeading>
      <Video/>
    </div>
  </div>
</template>

<script>
import { capitalize } from '@/helpers';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import PageHeading from '@/components/PageHeading.vue';
import Video from '@/components/videos/Video.vue';

export default {
  name: 'Videos',
  components: {
    Breadcrumbs,
    PageHeading,
    Video,
  },
  data() {
    return {
      statuses: ['draft', 'scheduled', 'sent'],
      selectedStatus: 'draft',
      statusCounts: {
        draft: 1,
        scheduled: 1,
        sent: 1,
      },
      filtersDropdownOpen: false,
      capitalize,
    };
  },
  methods: {
    closeFiltersDropdown() {
      this.filtersDropdownOpen = false;
    },
  },
};
</script>

<style scoped>
</style>
