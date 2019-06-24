<template>
  <div class="csv-uploader">
    <p
      class="error"
      v-if="!isCorrectFile">Please upload the correct file type</p>
    <p class="filetype">
      Are you uploading a CSV or Excel file?
      <input
        v-model="fileType"
        id="csv"
        type="radio"
        name="filetype"
        value="csv">
      <label
        for="csv"
        class="radio-label">CSV</label>
      <input
        v-model="fileType"
        id="xlsx"
        type="radio"
        name="filetype"
        value="xlsx">
      <label
        for="xlsx"
        class="radio-label">Excel (.xlsx)</label>
    </p>
    <label
      id="file-input-label"
      for="file-input"
      name="import"
      ref="fileInput"
      :class="{ dragging }"
      @dragover="dragging = true"
      @dragleave="dragging = false"
      @drop="dragging = false">
      <div v-if="uploading">
        <p>File uploading...</p>
      </div>
      <div v-else-if="dragging">
        <p>Now drop your files to upload</p>
      </div>
      <div v-else>
        <p>Drag and drop your file here</p>
        <p>or</p>
        <p>
          <button @click="selectFile">Select file</button>
        </p>
      </div>
      <input
        id="file-input"
        :disabled="uploading"
        type="file"
        name="import"
        data-cy="file-import-input"
        @change="uploadFile"/>
    </label>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';

const namespace = 'import';

export default {
  name: 'CSVUploader',
  data() {
    return {
      dragging: false,
      uploading: false,
      isCorrectFile: true,
      fileType: 'csv',
    };
  },
  methods: {
    ...mapMutations(namespace, ['SET_PREVIEW']),
    ...mapActions(namespace, ['uploadSpreadsheet']),
    selectFile() {
      this.$refs.fileInput.click();
    },
    uploadFile(evt) {
      const file = evt.target.files[0];
      if (file.name.substr(file.name.lastIndexOf('.') + 1) === this.fileType) {
        this.isCorrectFile = true;
        this.uploading = true;
        this.uploadSpreadsheet({ file, fileType: this.fileType })
          .then(({ headers, rows }) => {
            this.SET_PREVIEW({ headers, rows });
            this.$emit('upload');
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.isCorrectFile = false;
        const fileInput = document.getElementById('file-input');
        if (fileInput) {
          fileInput.value = '';
        }
      }
    },
  },
};
</script>

<style scoped>
#file-input-label {
  transition: 0.2s ease;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  width: 400px;
  border: 2px dashed #bba7e4;
  border-radius: 4px;
}
#file-input-label.dragging {
  border: 2px solid #5736bb;
  background: #5736bb;
}
#file-input-label.dragging > div {
  color: #fff;
}
#file-input-label p {
  text-align: center;
  margin-bottom: 16px;
}
#file-input-label button {
  color: #5736bb;
  padding: 0;
  font-size: 16px;
  line-height: 1;
}
#file-input {
  cursor: pointer;
  position: absolute;
  height: 100%;
  width: 100%;
  opacity: 0;
}
p,
.field {
  margin-bottom: 16px;
}
p.filetype {
  display: flex;
  align-items: center;
}
p.filetype label {
  margin-left: 16px;
}
</style>
