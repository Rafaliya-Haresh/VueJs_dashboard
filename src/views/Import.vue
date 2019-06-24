<template>
  <div class="import">
    <div class="container">
      <Breadcrumbs :crumbs="[
        { name: 'Home', link: '/people' },
        { name: 'People', link: '/people' },
        { name: 'Import', link: '/people/import' }]"/>
      <PageHeading title="Import Contacts"/>
      <CSVUploader
        v-if="mapping.length < 1"
        @upload="SET_MAPPING"/>
      <div
        v-else
        class="map">
        <div class="map-step">
          <p>Do you want to add new contacts?
            <input
              id="yes"
              v-model="addNew"
              type="radio"
              name="add-new"
              value="true">
            <label
              for="yes"
              class="radio-label">Yes</label>
            <input
              id="no"
              v-model="addNew"
              type="radio"
              name="add-new"
              value="false">
            <label
              for="no"
              class="radio-label">No</label>
          </p>
        </div>
        <div class="map-step">
          <p>Match your columns with the appropriate fields. You can also
            ignore columns or create fields.</p>
          <Mapping/>
        </div>
        <p
          v-if="numberInvalidColumns > 0"
          class="error">You need to match
          <strong>{{ numberInvalidColumns }}</strong>
          column{{ (numberInvalidColumns > 1) ? 's' : '' }}.</p>
        <button
          :disabled="numberInvalidColumns > 0 || isImporting"
          class="primary"
          data-cy="continue-import"
          @click="uploadContacts">{{ (isImporting) ? 'Importing...' : 'Continue' }}</button>
        <button
          class="secondary"
          @click="$router.push('/people')">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import PageHeading from '@/components/PageHeading.vue';
import CSVUploader from '@/components/people/import/CSVUploader.vue';
import Mapping from '@/components/people/import/Mapping.vue';

const namespace = 'import';

export default {
  name: 'Import',
  components: {
    Breadcrumbs,
    PageHeading,
    CSVUploader,
    Mapping,
  },
  data() {
    return {
      addNew: false,
      isImporting: false,
    };
  },
  computed: {
    ...mapGetters(namespace, ['mapping']),
    numberInvalidColumns() {
      return this.mapping.filter((item) => item.value === null).length;
    },
  },
  created() {
    this.fetchHeaders().then(({ headers }) => {
      this.SET_HEADERS(headers.map(({ id, name, header_type: type }) => ({
        id,
        name,
        header_type: type,
      })));
    });
  },
  beforeDestroy() {
    this.CLEAR_MAPPING();
  },
  methods: {
    ...mapMutations(namespace, ['SET_HEADERS', 'CLEAR_MAPPING', 'SET_MAPPING']),
    ...mapActions(namespace, ['fetchHeaders', 'importContacts']),
    uploadContacts() {
      this.isImporting = true;
      this.importContacts()
        .then(() => {
          this.isImporting = false;
          this.$router.push('/people');
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.map-step {
  margin-bottom: 32px;
}
.map-step p {
  display: flex;
  align-items: center;
  margin-bottom: 32px;
}
.map-step p label {
  margin-left: 16px;
}
p.error {
  margin-bottom: 48px;
}
button {
  width: 100px;
  margin-right: 16px;
}
button[disabled] {
  opacity: 0.4;
}
</style>
