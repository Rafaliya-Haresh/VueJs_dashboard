<template>
  <div
    v-if="isLoading"
    class="status-message">
    <h3>Loading {{ dataName }}...</h3>
  </div>
  <div
    v-else-if="isEmpty"
    class="status-message">
    <h3>No {{ dataName }}</h3>
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  name: 'StatusMessage',
  props: {
    isLoading: {
      default: false,
      type: Boolean,
    },
    isEmpty: {
      default: false,
      type: Boolean,
    },
    dataName: {
      default: 'data',
      type: String,
    },
    message: {
      default: '',
      type: String,
    },
  },
};
</script>

<style scoped>
.status-message {
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.status-message h3 {
  font-size: 24px;
  font-family: 'Neue Haas Grotesk Disp W05_75B';
  margin-bottom: 16px;
}
</style>
