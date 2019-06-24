<template>
  <div class="add-recipients">
    <div class="container">
      <Breadcrumbs :crumbs="[
        { name: 'Home', link: '/people' },
        { name: 'Campaigns', link: '/campaigns' },
        { name: campaign.name, link: `/campaigns/${campaign.id}` },
        { name: 'Add Recipients', link: '' }]"/>
      <PageHeading :title="campaign.name">
        <template slot="filters">
          <div
            class="filter-dropdown"
            v-on-clickaway="closeFiltersDropdown">
            <button
              class="filter-dropdown-button"
              @click="filtersDropdownOpen = !filtersDropdownOpen">
              {{ (selectedTag) ? selectedTag.name : 'All' }}
              <span>({{ (selectedTag) ? getTaggedCount(selectedTag.id) : totalCount }})</span>
            </button>
            <div
              v-if="filtersDropdownOpen"
              class="options">
              <button
                v-for="(tag, idx) in [null, ...tags]"
                :key="idx"
                @click="setSelectedTag(tag); filtersDropdownOpen = false">
                {{ (tag) ? tag.name : 'All' }}
                <span>({{ (tag) ? getTaggedCount(tag.id) : totalCount }})</span>
              </button>
            </div>
          </div>
        </template>
      </PageHeading>
      <div class="actions">
        <div>
          <div
            v-if="selectedContacts.length"
            class="selected-actions">
            <span class="contacts-selected">
              <span>{{ selectedContacts.length }}</span>
              contact{{ selectedContacts.length === 1 ? '' : 's' }} selected
            </span>
            <button
              class="white"
              @click="add">Add Recipients</button>
          </div>
        </div>
        <DataOptions>
          <HeaderFilters
            v-if="headerFiltersOpen"
            v-on-clickaway="hideHeaderFilters"
            :headers="contacts.headers"/>
          <ContactFilters
            v-if="contactFiltersOpen"
            v-on-clickaway="hideContactFilters"
            :fetch-fn="fetchNewRecipients"/>
          <input
            v-model="query"
            :disabled="filters.length > 0"
            spellcheck="false"
            class="search"
            type="text"
            placeholder="Search..."
            @keyup="search">
          <button
            class="white"
            @click="headerFiltersOpen = !headerFiltersOpen; contactFiltersOpen = false">
            <img
              src="@/assets/icons/columns.svg"
              alt="Columns icon">
          </button>
          <button
            :disabled="query.length > 0"
            class="white filter-button"
            @click="contactFiltersOpen = !contactFiltersOpen; headerFiltersOpen = false">
            Filter
            <span class="filters-icon">
              <img
                v-if="filters.length < 1"
                src="@/assets/icons/filter.svg"
                alt="Filter icon">
              <span v-else>{{ filters.length }}</span>
            </span>
          </button>
          <span class="pagination">
            <button
              :disabled="previousPage === null || pagingContacts"
              class="white"
              @click="pageContacts(false)">
              <img
                src="@/assets/icons/arrow-left.svg"
                alt="Previous page">
            </button>
            <button
              :disabled="nextPage === null || pagingContacts"
              class="white"
              @click="pageContacts(true)">
              <img
                src="@/assets/icons/arrow-right.svg"
                alt="Next page">
            </button>
            <span class="page">{{ paginationLocation }}</span>
          </span>
        </DataOptions>
      </div>
      <ContactTable/>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import PageHeading from '@/components/PageHeading.vue';
import DataOptions from '@/components/DataOptions.vue';
import HeaderFilters from '@/components/people/HeaderFilters.vue';
import ContactFilters from '@/components/people/ContactFilters.vue';
import ContactTable from '@/components/people/ContactTable.vue';

const peopleNamespace = 'people';
const campaignsNamespace = 'campaigns';

export default {
  name: 'AddRecipients',
  components: {
    Breadcrumbs,
    PageHeading,
    DataOptions,
    HeaderFilters,
    ContactFilters,
    ContactTable,
  },
  data() {
    return {
      selectedTag: null,
      filtersDropdownOpen: false,
      headerFiltersOpen: false,
      contactFiltersOpen: false,
      query: '',
      pagingContacts: false,
    };
  },
  computed: {
    ...mapGetters(campaignsNamespace, ['campaign']),
    ...mapGetters(peopleNamespace, [
      'previousPage',
      'nextPage',
      'pageIndex',
      'filters',
      'tags',
      'totalCount',
      'taggedCounts',
      'contacts',
      'selectedContacts',
    ]),
    campaignId() {
      return this.$route.params.id;
    },
    selectedTagId: {
      get() {
        return this.$store.state.people.tagId;
      },
      set(value) {
        this.SET_TAG_ID(value);
      },
    },
    paginationLocation() {
      const total = this.selectedTag
        ? this.getTaggedCount(this.selectedTag.id)
        : this.totalCount;
      const start = this.pageIndex * 25 + 1;
      const end = start + this.contacts.contacts.length - 1;
      return `${start}-${end} of ${total}`;
    },
  },
  watch: {
    selectedTag() {
      this.fetchNewRecipients().then((fetchData) => {
        this.setContacts({ ...fetchData, index: 0 });
      });
    },
  },
  created() {
    this.initRecipients();
  },
  methods: {
    ...mapMutations(['SET_MODAL']),
    ...mapMutations(peopleNamespace, [
      'SET_TAG_ID',
      'SET_FILTERS',
      'SET_TAGS',
      'DESELECT_ALL_CONTACTS',
      'SET_SELECTED_HEADERS',
    ]),
    ...mapMutations(campaignsNamespace, ['SET_CAMPAIGN']),
    ...mapActions(peopleNamespace, ['setContacts', 'fetchTags']),
    ...mapActions(campaignsNamespace, ['addRecipients', 'fetchCampaign', 'fetchNewRecipients']),
    hideHeaderFilters() {
      this.headerFiltersOpen = false;
    },
    hideContactFilters() {
      this.contactFiltersOpen = false;
    },
    setSelectedTag(tag) {
      this.selectedTag = tag;
      if (tag) {
        this.selectedTagId = tag.id;
      } else {
        this.selectedTagId = tag;
      }
    },
    getTaggedCount(id) {
      const taggedCount = this.taggedCounts.find(
        (count) => count.tag_id === id,
      );
      if (taggedCount) {
        return taggedCount.contact_count;
      }
      return 0;
    },
    closeFiltersDropdown() {
      this.filtersDropdownOpen = false;
    },
    pageContacts(next) {
      this.pagingContacts = true;
      let index = this.pageIndex;
      const pageReq = { before: null, after: null, query: null };
      if (this.query.length > 0) {
        pageReq.query = this.query;
      }
      if (next) {
        pageReq.after = this.nextPage;
        index += 1;
      } else {
        pageReq.before = this.previousPage;
        index -= 1;
      }
      this.fetchNewRecipients({ ...pageReq })
        .then((fetchData) => {
          this.setContacts({ ...fetchData, index });
          this.pagingContacts = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    search() {
      this.fetchNewRecipients({ before: null, after: null, query: this.query })
        .then((fetchData) => {
          this.setContacts({ ...fetchData, index: 0 });
        });
    },
    add() {
      this.addRecipients(this.selectedContacts).then(() => {
        this.$router.push(`/campaigns/${this.$route.params.id}`);
      }).catch((err) => {
        console.log(err);
      });
    },
    initRecipients() {
      this.DESELECT_ALL_CONTACTS();
      this.SET_TAG_ID(null);
      this.SET_FILTERS([]);
      this.fetchCampaign(this.campaignId).then((campaign) => {
        this.SET_CAMPAIGN(campaign);
        axios
          .all([this.fetchNewRecipients(), this.fetchTags()])
          .then(([fetchData, { tags }]) => {
            this.SET_TAGS(tags);
            this.setContacts({ ...fetchData, index: 0 });
            this.SET_SELECTED_HEADERS(this.contacts.headers.map((header) => header.id));
          })
          .catch((err) => {
            console.log(err);
          });
      });
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
.selected-actions .contacts-selected {
  margin-right: 16px;
  color: #8d8d8d;
}
.selected-actions .contacts-selected span {
  display: inline-block;
  padding: 2px;
  color: #000;
  font-family: 'Neue Haas Grotesk Disp W05_75B';
  border-bottom: 2px solid #f07365;
}
</style>
