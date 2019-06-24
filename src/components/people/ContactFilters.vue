<template>
  <div class="contact-filters">
    <div class="contact-filters-header">Filters</div>
    <div class="filters">
      <div
        v-for="(filter, idx) in tmpFilters"
        :key="idx"
        class="filter">
        <select
          v-model="filter.header_id"
          name="header">
          <option
            v-for="(header, headerIdx) in contacts.headers"
            :key="headerIdx"
            :value="header.id">{{ header.name }}</option>
        </select>
        <select
          v-model="filter.method"
          name="method">
          <option value="contains">Contains</option>
          <option value="matches">Matches</option>
        </select>
        <input
          v-model="filter.query"
          name="value"
          type="text"
          placeholder="Enter value...">
        <button
          v-if="filters.length > 1 || idx > 0"
          class="delete-filter"
          @click="filters.splice(idx, 1)">&times;</button>
      </div>
    </div>
    <div class="options">
      <button
        @click="addFilter">Add filter</button>
      <div class="right">
        <button
          @click="clearFilters">Clear filters</button>
        <button
          class="secondary"
          @click="applyFilters">Apply filters</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';

const namespace = 'people';

export default {
  name: 'ContactFilters',
  props: ['fetchFn'],
  data() {
    return {
      tmpFilters: [],
    };
  },
  computed: {
    ...mapGetters(namespace, ['contacts', 'filters', 'tagId']),
  },
  created() {
    if (this.filters.length < 1) {
      this.addFilter();
    } else {
      this.filters.forEach((filter) => {
        this.tmpFilters.push({ ...filter });
      });
    }
  },
  methods: {
    ...mapMutations(namespace, ['SET_FILTERS']),
    ...mapActions(namespace, ['fetchContacts', 'resetPage', 'setContacts']),
    addFilter() {
      this.tmpFilters.push({
        header_id: this.contacts.headers[0].id,
        method: 'contains',
        query: '',
      });
    },
    applyFilters() {
      if (this.tmpFilters.map((filter) => filter.query).includes('')) {
        window.alert('Please enter a value for each filter');
      } else {
        this.SET_FILTERS(this.tmpFilters);
        this.fetchFn()
          .then((fetchData) => {
            this.setContacts({ ...fetchData, index: 0 });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    clearFilters() {
      this.SET_FILTERS([]);
      this.tmpFilters = [];
      this.addFilter();
      this.fetchFn()
        .then((fetchData) => {
          this.setContacts({ ...fetchData, index: 0 });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.contact-filters {
  position: absolute;
  box-shadow: 0 2px 4px #d7d7d7;
  top: 48px;
  right: 0;
  background: #fff;
  z-index: 2;
  border-radius: 4px;
  padding: 24px;
}
.contact-filters-header {
  font-size: 12px;
  text-transform: uppercase;
  font-family: 'Neue Haas Grotesk Disp W05_75B';
  margin-bottom: 16px;
  color: #adadad;
}
.filters,
.filter {
  margin-bottom: 16px;
}
.filter,
.options {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.filter select,
.filter input {
  font-size: 14px;
  width: 150px;
  height: 28px;
  margin-right: 8px;
}
.delete-filter {
  padding: 0;
  color: #d45067;
  font-size: 16px;
}
.options button {
  padding: 0;
  color: #5736bb;
}
.options button.secondary {
  padding: 8px;
  margin-left: 16px;
}
</style>
