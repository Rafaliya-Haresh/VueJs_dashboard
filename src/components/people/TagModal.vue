<template>
  <div class="tag-modal">
    <Modal
      title="Tag Contacts"
      @close-modal="$emit('close-modal')">
      <div class="field">
        <v-select
          v-model="selectedTags"
          :options="tagOptions"
          placeholder="Search or create tags..."
          multiple
          taggable/>
      </div>
      <div class="buttons">
        <button
          :disabled="isTagging"
          class="primary"
          @click="tag">{{ (isTagging) ? 'Tagging...' : 'Tag Contacts' }}</button>
        <button
          class="secondary"
          @click="$emit('close-modal')">Cancel</button>
      </div>
    </Modal>
  </div>
</template>

<script>
import axios from 'axios';
import Modal from '@/components/Modal.vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';

const namespace = 'people';

export default {
  name: 'TagModal',
  components: {
    Modal,
  },
  data() {
    return {
      isTagging: false,
      selectedTags: [],
    };
  },
  computed: {
    ...mapGetters(namespace, ['tags', 'filters']),
    tagOptions() {
      return this.tags.map((tag) => tag.name);
    },
  },
  methods: {
    ...mapMutations(namespace, ['SET_TAGS']),
    ...mapActions(namespace, [
      'tagContacts',
      'fetchContacts',
      'fetchTags',
      'setContacts',
    ]),
    tag() {
      this.isTagging = true;
      this.tagContacts(this.selectedTags)
        .then(() => {
          axios
            .all([this.fetchContacts(), this.fetchTags()])
            .then(([fetchData, { tags }]) => {
              this.setContacts({ ...fetchData, index: 0 });
              this.SET_TAGS(tags);
              this.isTagging = false;
              this.$emit('close-modal');
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss">
.tag-modal {
  .modal-body {
    width: 500px;
    padding: 32px 48px;
  }
  .modal-header {
    margin-bottom: 24px;
  }
  .field {
    margin-bottom: 24px;
  }
  .buttons button {
    margin-right: 16px;
  }
  .v-select {
    &.open .dropdown-toggle {
      border: none;
      border-bottom: 2px solid #5736bb;
    }
    .dropdown-toggle {
      border: none;
      border-radius: 0;
      padding: 0;
      margin: 0;
      border-bottom: 2px solid #e1e1e1;
    }
    .open-indicator {
      display: none;
    }
    .dropdown-menu {
      height: 70px;
      max-height: 70px !important;
      bottom: 70px;
      border: none;
      box-shadow: 0 2px 4px #d7d7d7;
    }
    .dropdown-menu li a {
      font-size: 16px;
    }
    .no-options {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .dropdown-menu > .highlight > a {
      background: #5736bb;
    }
    .selected-tag {
      background: #f5f2fb;
      color: #5736bb;
      border: none;
      border-radius: 50px;
      margin: 4px 0;
      margin-right: 8px;
      padding: 2px 12px;
      font-size: 14px;
    }
    input[type='search'],
    input[type='search']:focus {
      padding-left: 0;
    }
    .selected-tag .close {
      font-size: 16px;
      font-weight: lighter;
      opacity: 1;
      color: #d45067;
      margin-left: 4px;
    }
  }
}
</style>
