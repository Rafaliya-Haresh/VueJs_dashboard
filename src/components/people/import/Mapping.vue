<template>
  <div
    class="table"
    data-cy="mapping"
    :class="{ scroll: preview.headers.length > 5 }">
    <div class="fields">
      <div
        v-for="(item, mappingIdx) in mapping"
        :key="mappingIdx"
        class="field">
        <img
          v-if="item.value"
          src="@/assets/icons/mapping-success.svg"
          alt="Mapping success image"
          class="mapping-status-icon">
        <img
          v-else
          src="@/assets/icons/mapping-error.svg"
          alt="Mapping error image"
          class="mapping-status-icon">
        <MappingDropdown
          :open="item.dropdownOpen"
          :label="getMappingValue(mappingIdx)"
          @toggle-dropdown="toggleDropdown(mappingIdx)"
          @map-column="mapColumn($event, mappingIdx)"
          @create-header="SET_MODAL(Modal.HeaderModal)"/>
      </div>
    </div>
    <div class="th-row">
      <div
        v-for="(header, idx) in preview.headers"
        :key="idx"
        class="th">{{ header }}</div>
    </div>
    <div
      v-for="(contact, idx) in preview.rows"
      :key="idx"
      class="td-row">
      <div
        v-for="(column, idx) in contact"
        :key="idx"
        class="td">
        <p>{{ column }}</p>
      </div>
    </div>
    <HeaderModal
      v-if="modal === Modal.HeaderModal"
      @close-modal="SET_MODAL(null)"/>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import MappingDropdown from './MappingDropdown.vue';
import HeaderModal from './HeaderModal.vue';
import { Modal } from '@/helpers';

const namespace = 'import';

export default {
  name: 'Mapping',
  components: {
    MappingDropdown,
    HeaderModal,
  },
  data() {
    return {
      Modal,
    };
  },
  computed: {
    ...mapGetters(['modal']),
    ...mapGetters(namespace, ['headers', 'mapping', 'preview']),
  },
  methods: {
    ...mapMutations(['SET_MODAL']),
    ...mapMutations(namespace, ['TOGGLE_HEADER_DROPDOWN', 'MAP_COLUMN']),
    /* idx: number */
    getMappingValue(idx) {
      const mappingValue = this.mapping[idx].value;
      if (mappingValue === null) {
        return 'Choose...';
      }
      if (mappingValue.id) {
        return this.headers.find((header) => header.id === mappingValue.id).name;
      }
      return 'Ignored';
    },
    /* idx: number */
    toggleDropdown(idx) {
      this.TOGGLE_HEADER_DROPDOWN(idx);
    },
    /* value: { id: number | null }, idx: number */
    mapColumn(value, idx) {
      this.toggleDropdown(idx);
      this.MAP_COLUMN({ idx, value });
    },
  },
};
</script>

<style scoped>
.fields {
  white-space: nowrap;
  margin-bottom: 48px;
}
.field {
  position: relative;
  display: inline-block;
  padding: 0;
  width: 20%;
  padding-left: 24px;
}
.field .mapping-status-icon {
  position: absolute;
  z-index: 1;
  top: 15px;
  left: 0;
  height: 90px;
}
</style>
