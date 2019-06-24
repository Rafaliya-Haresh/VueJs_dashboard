<template>
  <div class="header-filters">
    <div class="header-filters-title">Headers</div>
    <div class="header-checkboxes">
      <div
        v-for="(header, idx) in headers"
        :key="idx"
        class="header-checkbox">
        <input
          v-model="selectedHeaders"
          :id="header.id"
          :value="header.id"
          type="checkbox"
          name="header">
        <label :for="header.id">{{ header.name }}</label>
      </div>
    </div>
  </div>
</template>

<script>
const namespace = 'people';

export default {
  name: 'HeaderFilters',
  props: {
    headers: {
      default: () => [],
      type: Array,
    },
  },
  computed: {
    selectedHeaders: {
      get() {
        return this.$store.state[namespace].selectedHeaders;
      },
      set(value) {
        this.$store.commit(`${namespace}/SET_SELECTED_HEADERS`, value);
      },
    },
  },
};
</script>

<style scoped>
.header-filters {
  padding: 24px;
  box-shadow: 0 2px 4px #d7d7d7;
  position: absolute;
  right: 140px;
  top: 48px;
  width: 200px;
  background: #fff;
  z-index: 1;
  border-radius: 4px;
}
.header-filters-title {
  font-size: 12px;
  text-transform: uppercase;
  font-family: 'Neue Haas Grotesk Disp W05_75B';
  margin-bottom: 16px;
  color: #adadad;
}
.header-checkboxes {
  height: 300px;
  overflow-y: scroll;
}
.header-checkbox {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}
input[type='checkbox'] {
  height: 16px;
  width: 16px;
  margin: 0;
  margin-right: 8px;
}
</style>
