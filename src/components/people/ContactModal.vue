<template>
  <div class="contact-modal">
    <Modal
      :title="(contact.id > 0) ? 'Edit Contact' : 'Create Contact'"
      @close-modal="$emit('close-modal')">
      <div class="scroll">
        <div class="section">
          <h3>Name &amp; Email</h3>
          <div class="fields">
            <div class="field inline">
              <div>
                <label for="">First Name</label>
                <input
                  v-model="findColumn('first_name').value"
                  type="text"
                  placeholder="John">
              </div>
              <div>
                <label for="">Last Name</label>
                <input
                  v-model="findColumn('last_name').value"
                  type="text">
              </div>
            </div>
            <div class="field">
              <label for="">Email</label>
              <input
                v-model="findColumn('email').value"
                type="text">
            </div>
          </div>
        </div>
        <div class="section">
          <h3>Address</h3>
          <div class="fields">
            <div class="field inline">
              <div>
                <label for="">Address Line 1</label>
                <input
                  v-model="findColumn('address_1').value"
                  type="text">
              </div>
              <div>
                <label for="">Address Line 2</label>
                <input
                  v-model="findColumn('address_2').value"
                  type="text">
              </div>
            </div>
            <div class="field inline">
              <div>
                <label for="">City</label>
                <input
                  v-model="findColumn('city').value"
                  type="text">
              </div>
              <div>
                <label for="">State</label>
                <input
                  v-model="findColumn('state').value"
                  type="text">
              </div>
            </div>
            <div class="field">
              <label for="">ZIP</label>
              <input
                v-model="findColumn('zip_code').value"
                type="text">
            </div>
          </div>
        </div>
        <div class="section">
          <h3>More Info</h3>
          <div class="fields">
            <div class="field">
              <label for="">Tags</label>
              <v-select
                v-model="selectedTags"
                :options="tagOptions"
                placeholder="Search or create tags..."
                multiple
                taggable/>
            </div>
            <div
              v-for="contactIdx in miscColumnIndexes"
              :key="contactIdx"
              class="field">
              <label for="">{{ contacts.headers[contactIdx].name }}</label>
              <input
                v-model="editableContact.columns[contactIdx].value"
                type="text">
            </div>
          </div>
        </div>
      </div>
      <div class="buttons">
        <button
          :disabled="isSaving"
          class="primary"
          @click="saveContact">{{ (isSaving) ? 'Saving...' : 'Save' }}</button>
        <button
          class="secondary"
          @click="$emit('close-modal')">Cancel</button>
      </div>
    </Modal>
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import Modal from '../Modal.vue';

const namespace = 'people';

export default {
  name: 'ContactModal',
  components: {
    Modal,
  },
  data() {
    return {
      editableContact: {
        id: -1,
        columns: [],
      },
      miscColumnIndexes: [],
      isSaving: false,
      selectedTags: [],
    };
  },
  computed: {
    ...mapGetters(namespace, ['contacts', 'tags', 'contact', 'pageIndex', 'currentPage', 'clickedNext']),
    tagOptions() {
      return this.tags.map((tag) => tag.name);
    },
  },
  created() {
    this.editableContact = JSON.parse(JSON.stringify(this.contact));
    this.getMiscColumnIndexes();
    if (this.contact.id > 0) {
      this.fetchTagsForContact(this.contact.id)
        .then(({ tags }) => {
          this.selectedTags = tags.map((tag) => tag.name);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
  methods: {
    ...mapMutations(namespace, ['SET_TAGS']),
    ...mapActions(namespace, [
      'fetchTagsForContact',
      'fetchContacts',
      'fetchTags',
      'createContact',
      'updateContact',
      'setContacts',
    ]),
    getMiscColumnIndexes() {
      return this.editableContact.columns.forEach((column, idx) => {
        const header = this.contacts.headers.find(
          (h) => h.id === column.header_id,
        );
        if (
          header
          && [
            'first_name',
            'last_name',
            'email',
            'address_1',
            'address_2',
            'city',
            'state',
            'zip_code',
          ].indexOf(header.header_type) < 0
        ) {
          this.miscColumnIndexes.push(idx);
        }
      });
    },
    findColumn(field) {
      const idx = this.editableContact.columns.findIndex((column) => {
        const header = this.contacts.headers.find(
          (h) => h.header_type === field,
        );
        if (header) {
          return header.id === column.header_id;
        }
        return false;
      });
      return this.editableContact.columns[idx];
    },
    saveContact() {
      this.isSaving = true;
      let promise;
      if (this.editableContact.id > 0) {
        promise = this.update();
      } else {
        promise = this.create();
      }
      const pageContacts = {
        before: null,
        after: null,
      };
      if (this.pageIndex !== 0 && this.clickedNext) {
        pageContacts.after = this.currentPage;
      } else {
        pageContacts.before = this.currentPage;
      }
      promise
        .then(() => {
          axios
            .all([this.fetchContacts({ ...pageContacts }), this.fetchTags()])
            .then(([fetchData, { tags }]) => {
              this.setContacts({
                ...fetchData,
                index: this.pageIndex,
              });
              this.SET_TAGS(tags);
              this.isSaving = false;
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
    create() {
      return this.createContact({
        columns: this.editableContact.columns,
        tags: this.selectedTags,
      });
    },
    update() {
      return this.updateContact({
        id: this.editableContact.id,
        columns: this.editableContact.columns,
        tags: this.selectedTags,
      });
    },
  },
};
</script>

<style lang="scss">
.contact-modal {
  .modal-body {
    width: 800px;
    padding: 32px 48px;
  }
  .modal-header {
    margin-bottom: 24px;
  }
  .scroll {
    height: 500px;
    overflow-y: scroll;
  }
  .section {
    align-items: flex-start;
    display: flex;
    border-bottom: 1px solid #e1e1e1;
    padding-top: 24px;
  }
  h3 {
    text-transform: uppercase;
    font-size: 12px;
    font-family: 'Neue Haas Grotesk Disp W05_75B';
    line-height: 1;
    width: 200px;
  }
  .fields {
    width: 100%;
    border-left: 1px solid #e1e1e1;
    padding-left: 24px;
    padding-bottom: 36px;
  }
  .field {
    margin-bottom: 16px;
  }
  .field:last-of-type {
    margin-bottom: 0;
  }
  .field.inline {
    display: flex;
  }
  .field.inline div:first-child {
    margin-right: 24px;
  }
  .field label {
    font-size: 14px;
    font-family: 'Neue Haas Grotesk Disp W05_75B';
    display: block;
    width: 100%;
    margin-bottom: 8px;
  }
  .field input {
    padding-bottom: 4px;
  }
  .buttons {
    margin-top: 36px;
  }
  .buttons button {
    padding: 8px 24px;
    margin-right: 16px;
  }
  input.form-control {
    padding-bottom: 0;
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
