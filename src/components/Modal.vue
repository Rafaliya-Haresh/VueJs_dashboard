<template>
  <div class="modal">
    <div
      class="modal-overlay"
      @click="$emit('close-modal')"/>
    <div class="modal-body">
      <div class="modal-header">
        <h2>{{ title }}</h2>
        <button @click="$emit('close-modal')">
          <img
            src="@/assets/icons/close-modal-icon.svg"
            alt="Close icon">
        </button>
      </div>
      <div class="modal-content">
        <slot/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    title: {
      default: '',
      type: String,
    },
  },
};
</script>

<style scoped>
.modal {
  z-index: 2;
  transition: 0.2s ease;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.modal-overlay {
  width: 100%;
  height: 100%;
  background: rgba(42, 35, 62, 0.9);
}
.modal-body {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  z-index: 3;
  border-radius: 8px;
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.modal-header h2 {
  font-family: 'Neue Haas Grotesk Disp W05_75B';
}
.modal-header button {
  font-size: 18px;
}
.modal-header button:focus {
  outline: none;
}
.modal-header img {
  height: 16px;
  width: 16px;
}
</style>
