<template>
  <div class="mapping-dropdown">
    <button
      class="field-button"
      data-cy="mapping-dropdown-button"
      :class="{ open }"
      @click="$emit('toggle-dropdown')">{{ label }}</button>
    <div
      :class="{ open }"
      class="dropdown">
      <div class="padding">
        <input
          v-model="headerSearchTerm"
          type="text"
          placeholder="Search...">
        <div class="results">
          <button
            v-for="(header, idx) in filteredHeaders"
            :key="idx"
            :data-cy="`${header.name.toLowerCase().split(' ').join('-')}-header`"
            @click="$emit('map-column', { id: header.id })">{{ header.name }}</button>
        </div>
        <button
          class="special"
          data-cy="ignore-column"
          @click="$emit('map-column', { id: null })">Ignore column</button>
        <button
          class="special"
          @click="$emit('create-header')">Create header</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

const namespace = 'import';

export default {
  name: 'MappingDropdown',
  props: {
    open: {
      default: false,
      type: Boolean,
    },
    label: {
      default: 'Choose...',
      type: String,
    },
  },
  data() {
    return {
      headerSearchTerm: '',
    };
  },
  computed: {
    ...mapGetters(namespace, ['headers']),
    /* returns Header[] */
    filteredHeaders() {
      return this.headers.filter((header) => header.name
        .split(' ')
        .join('')
        .toLowerCase()
        .includes(this.headerSearchTerm));
    },
  },
};
</script>

<style scoped>
.field-button {
  height: 40px;
  font-size: 16px;
  text-align: left;
  border-radius: 0;
  padding: 0;
  transition: 0.2s ease;
  width: 160px;
  border-bottom: 2px solid #e1e1e1;
  background: none;
  background: url('../../../assets/icons/dropdown-caret.svg');
  background-repeat: no-repeat;
  background-position: right center;
  background-size: 8px;
}
.field-button:focus {
  outline: none;
}
.field-button.open {
  border-bottom: 2px solid #5736bb;
}
.dropdown {
  transition: 0.2s height ease;
  border-radius: 4px;
  position: absolute;
  top: 40px;
  left: 24px;
  width: 160px;
  box-shadow: 0 2px 4px #d7d7d7;
  height: 0;
  padding: 0;
  background: #fff;
  z-index: 1;
  overflow: hidden;
}
.dropdown.open {
  height: 230px;
}
.dropdown .padding {
  padding: 16px;
}
.dropdown input[type='text'] {
  padding-bottom: 4px;
  width: 100%;
  margin-bottom: 16px;
}
.dropdown .results {
  margin-bottom: 16px;
  position: relative;
  overflow-y: scroll;
  height: 90px;
  width: 100%;
}
.dropdown button {
  display: block;
  width: 100%;
  margin-bottom: 8px;
  font-size: 16px;
  text-align: left;
  border-radius: 0;
  padding: 0;
}
.dropdown button.special {
  color: #5736bb;
}
</style>
