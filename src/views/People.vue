<template>
  <div class="people">
    <div class="container">
      <Breadcrumbs :crumbs="[
        { name: 'Home', link: '/people' },
        { name: 'People', link: '' }]"/>
      <PageHeading title="People">
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
        <template slot="buttons">
          <button
            class="secondary"
            @click="createContact">Add Single Contact</button>
          <button
            class="primary"
            data-cy="import-button"
            @click="$router.push('/people/import')">Import Contacts</button>
        </template>
      </PageHeading>
      <StatusMessage
        data-name="contacts"
        :is-empty="initialContacts.length < 1"
        :is-loading="contactsLoading"
        message="Use the buttons above to manually create or import contacts"/>
      <div v-if="initialContacts.length > 0 && !contactsLoading">
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
                @click="$store.commit('SET_MODAL', Modal.Tag)">Add tag</button>
              <button
                class="white"
                @click="$store.commit('SET_MODAL', Modal.AddToCampaign)">Add to Campaign</button>
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
              :fetch-fn="fetchContacts"/>
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
        <ContactTable display-options/>
      </div>
    </div>
    <TagModal
      v-if="modal === Modal.Tag"
      @close-modal="$store.commit('SET_MODAL', null)"/>
    <VideoModal
      v-if="modal === Modal.Video"
      @close-modal="$store.commit('SET_MODAL', null)"/>
    <ContactModal
      v-if="modal === Modal.Contact"
      @close-modal="$store.commit('SET_MODAL', null); contact = null;"/>
    <AddToCampaign
      v-if="modal === Modal.AddToCampaign"
      @close-modal="$store.commit('SET_MODAL', null); contact = null;"/>
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { Modal } from '@/helpers';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import PageHeading from '@/components/PageHeading.vue';
import StatusMessage from '@/components/StatusMessage.vue';
import DataOptions from '@/components/DataOptions.vue';
import ContactModal from '@/components/people/ContactModal.vue';
import ContactFilters from '@/components/people/ContactFilters.vue';
import HeaderFilters from '@/components/people/HeaderFilters.vue';
import ContactTable from '@/components/people/ContactTable.vue';
import TagModal from '@/components/people/TagModal.vue';
import AddToCampaign from '@/components/people/AddToCampaign.vue';

const namespace = 'people';

export default {
  name: 'People',
  components: {
    Breadcrumbs,
    PageHeading,
    StatusMessage,
    DataOptions,
    ContactModal,
    HeaderFilters,
    ContactFilters,
    ContactTable,
    TagModal,
    AddToCampaign,
  },
  data() {
    return {
      Modal,
      query: '',
      headerFiltersOpen: false,
      contactsLoading: false,
      contactFiltersOpen: false,
      selectedTag: null,
      filtersDropdownOpen: false,
      pagingContacts: false,
      initialContacts: [],
    };
  },
  computed: {
    ...mapGetters(['modal']),
    ...mapGetters(namespace, [
      'contacts',
      'selectedContacts',
      'tags',
      'filters',
      'totalCount',
      'taggedCounts',
      'pageIndex',
      'nextPage',
      'previousPage',
    ]),
    paginationLocation() {
      const total = this.selectedTag
        ? this.getTaggedCount(this.selectedTag.id)
        : this.totalCount;
      const start = this.pageIndex * 25 + 1;
      const end = start + this.contacts.contacts.length - 1;
      return `${start}-${end} of ${total}`;
    },
    selectedTagId: {
      get() {
        return this.$store.state.people.tagId;
      },
      set(value) {
        this.SET_TAG_ID(value);
      },
    },
  },
  watch: {
    selectedTag() {
      this.fetchContacts().then((fetchData) => {
        this.setContacts({ ...fetchData, index: 0 });
      });
    },
  },
  created() {
    this.DESELECT_ALL_CONTACTS();
    this.SET_TAG_ID(null);
    this.SET_FILTERS([]);
    this.contactsLoading = true;
    axios
      .all([this.fetchContacts(), this.fetchTags()])
      .then(
        ([fetchData, { tags }]) => {
          this.SET_TAGS(tags);
          this.setContacts({ ...fetchData, index: 0 });
          this.initialContacts = fetchData.contacts;
          this.SET_SELECTED_HEADERS(
            this.contacts.headers.map((header) => header.id),
          );
          this.contactsLoading = false;
        },
      )
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    ...mapMutations(['SET_MODAL']),
    ...mapMutations(namespace, [
      'SET_TAG_ID',
      'DESELECT_ALL_CONTACTS',
      'SET_FILTERS',
      'SET_TAGS',
      'SET_SELECTED_HEADERS',
      'SET_CONTACT',
    ]),
    ...mapActions(namespace, [
      'fetchContacts',
      'setContacts',
      'setCurrentPage',
      'fetchTags',
      'searchContacts',
    ]),
    getTaggedCount(id) {
      const taggedCount = this.taggedCounts.find(
        (count) => count.tag_id === id,
      );
      if (taggedCount) {
        return taggedCount.contact_count;
      }
      return 0;
    },
    search() {
      this.searchContacts({ before: null, after: null, query: this.query })
        .then((fetchData) => {
          this.setContacts({ ...fetchData, index: 0 });
        });
    },
    createContact() {
      this.SET_CONTACT({
        id: -1,
        columns: this.contacts.headers.map((header) => ({
          header_id: header.id,
          value: '',
        })),
      });
      this.SET_MODAL(Modal.Contact);
    },
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
    closeFiltersDropdown() {
      this.filtersDropdownOpen = false;
    },
    pageContacts(next) {
      this.pagingContacts = true;
      let index = this.pageIndex;
      let promise;
      const pageReq = {
        before: null,
        after: null,
      };
      if (next) {
        this.setCurrentPage({ current: this.nextPage, clicked: true });
        pageReq.after = this.nextPage;
        index += 1;
      } else {
        this.setCurrentPage({ current: this.previousPage, clicked: false });
        pageReq.before = this.previousPage;
        index -= 1;
      }
      if (this.query) {
        promise = this.searchContacts({
          ...pageReq,
          query: this.query,
        });
      } else {
        promise = this.fetchContacts({ ...pageReq });
      }
      promise
        .then((fetchData) => {
          this.setContacts({ ...fetchData, index });
          this.pagingContacts = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss">
.people {
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
  .selected-actions button {
    margin-right: 16px;
  }
  .row-options {
    left: calc(20% + 64px);
  }
}
</style>
