<template>
  <div
    class="table contact-table"
    :class="{ scroll: filteredHeaders.length > 5 }"
    :style="{ height: `${contacts.contacts.length * 50 + 80}px` }">
    <div class="th-row">
      <div class="th-checkbox">
        <input
          :checked="currentPageSelected"
          type="checkbox"
          class="th-checkbox"
          @change="selectAll">
      </div>
      <div
        v-for="(header, idx) in filteredHeaders"
        :key="idx"
        class="th">
        {{ header.name }}
      </div>
    </div>
    <div
      v-for="(contact, idx) in contacts.contacts"
      :key="idx"
      :class="{ hover: displayOptions }"
      class="td-row">
      <div class="td-checkbox">
        <input
          :checked="selectedContacts.includes(contact.id)"
          type="checkbox"
          class="td-checkbox"
          @change="selectContact($event, contact.id)">
      </div>
      <div
        v-for="(column, idx) in filteredColumns(contact)"
        :key="idx"
        class="td">
        <p>{{ column.value || '-' }}</p>
      </div>
      <RowOptions v-if="displayOptions">
        <button @click="$store.commit('SET_MODAL', Modal.Video)">
          <img
            src="@/assets/icons/video.svg"
            alt="Video icon">
        </button>
        <button @click="editContact(contact)">
          <img
            src="@/assets/icons/pencil.svg"
            alt="Edit icon">
        </button>
        <button @click="del(contact.id)">
          <img
            src="@/assets/icons/delete.svg"
            alt="Delete icon">
        </button>
      </RowOptions>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import RowOptions from '@/components/RowOptions.vue';
import { Modal } from '@/helpers';

const namespace = 'people';

export default {
  name: 'ContactTable',
  components: {
    RowOptions,
  },
  props: {
    displayOptions: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      Modal,
    };
  },
  computed: {
    ...mapGetters(namespace, ['contacts', 'selectedHeaders', 'selectedContacts', 'pageIndex', 'currentPage', 'clickedNext']),
    currentPageSelected() {
      return this.contacts.contacts.every((contact) => this.selectedContacts.includes(contact.id));
    },
    filteredHeaders() {
      return this.contacts.headers.filter((header) => this.selectedHeaders.includes(header.id));
    },
  },
  methods: {
    ...mapMutations(['SET_MODAL']),
    ...mapMutations(namespace, ['SELECT_CONTACT', 'DESELECT_CONTACT', 'SET_CONTACT']),
    ...mapActions(namespace, ['deleteContact', 'fetchContacts', 'setContacts']),
    /* contact: Contact */
    filteredColumns(contact) {
      return contact.columns.filter((column) => this.selectedHeaders.includes(column.header_id));
    },
    /* evt: any, id: number */
    selectContact(evt, id) {
      if (evt.target.checked) {
        this.SELECT_CONTACT(id);
      } else {
        this.DESELECT_CONTACT(id);
      }
    },
    /* evt: any */
    selectAll(evt) {
      this.contacts.contacts.forEach((contact) => {
        if (evt.target.checked) {
          if (!this.selectedContacts.includes(contact.id)) {
            this.SELECT_CONTACT(contact.id);
          }
        } else {
          this.DESELECT_CONTACT(contact.id);
        }
      });
    },
    /* contact: Contact */
    editContact(contact) {
      this.SET_MODAL(Modal.Contact);
      this.SET_CONTACT({ ...contact });
    },
    /* id: number */
    del(id) {
      if (window.confirm('Are you sure?')) {
        const pageContacts = {
          before: null,
          after: null,
        };
        if (this.pageIndex !== 0 && this.clickedNext) {
          pageContacts.after = this.currentPage;
        } else {
          pageContacts.before = this.currentPage;
        }
        this.deleteContact(id)
          .then(() => {
            this.fetchContacts({ ...pageContacts }).then((fetchData) => {
              this.setContacts({ ...fetchData, index: this.pageIndex });
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
};
</script>

<style scoped>
.table {
  margin-bottom: 0;
}
.th-checkbox,
.td-checkbox {
  float: left;
  width: 40px;
}
.th-checkbox {
  line-height: 25px;
  height: 25px;
}
.td-checkbox {
  line-height: 50px;
  height: 50px;
}
.td-row.hover:hover .td,
.td-row.hover:hover {
  border-color: #5736bb;
}
</style>
