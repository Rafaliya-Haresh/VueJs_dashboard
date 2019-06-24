<template>
  <div class="header-modal">
    <Modal
      title="Create Header"
      @close-modal="$emit('close-modal')">
      <div class="field">
        <label for="name">Name</label>
        <input
          v-model="header.name"
          id="name"
          type="text"
          placeholder="Work Phone">
      </div>
      <div class="field">
        <label for="type">Type</label>
        <select
          v-model="header.type"
          id="type">
          <option
            v-for="(headerType, idx) in headerTypeOptions"
            :key="idx"
            :value="headerType.value">
            {{ headerType.label }}
          </option>
        </select>
      </div>
      <button
        class="primary"
        :disabled="header.name.length < 1 || isCreating"
        @click="create">{{ (isCreating) ? 'Creating...' : 'Create' }}</button>
      <button
        class="secondary"
        @click="$emit('close-modal')">Cancel</button>
    </Modal>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
import Modal from '@/components/Modal.vue';
import { Header } from '@/helpers';

const namespace = 'import';

export default {
  name: 'HeaderModal',
  components: {
    Modal,
  },
  data() {
    return {
      header: {
        type: Header.Text,
        name: '',
      },
      isCreating: false,
    };
  },
  computed: {
    /* returns Array<{ value: HeaderType; label: string }> */
    headerTypeOptions() {
      return [
        { value: Header.Text, label: 'Text' },
        { value: Header.PhoneNumber, label: 'Phone Number' },
      ];
    },
  },
  methods: {
    ...mapMutations(namespace, ['SET_HEADERS']),
    ...mapActions(namespace, ['createHeader', 'fetchHeaders']),
    create() {
      this.isCreating = true;
      this.createHeader(this.header)
        .then(() => {
          this.fetchHeaders().then(({ headers }) => {
            this.SET_HEADERS(headers);
            this.isCreating = true;
            this.$emit('close-modal');
          });
        });
    },
  },
};
</script>

<style lang="scss">
.header-modal {
  .modal-body {
    width: 400px;
    padding: 32px 48px;
  }
  .modal-header {
    margin-bottom: 24px;
  }
  .modal-content .field {
    margin-bottom: 32px;
  }
  .modal-content label {
    margin-bottom: 8px;
    font-family: 'Neue Haas Grotesk Disp W05_75B';
    font-size: 14px;
    display: block;
  }
  .modal-content input,
  .modal-content select {
    padding-bottom: 4px;
    width: 100%;
  }
  .modal-content button {
    width: 100px;
    margin-right: 16px;
  }
}
</style>
