<template>
  <label class="toggle-switch">
    <input
      :id="id"
      :checked="value"
      type="checkbox">
    <span class="slider"/>
  </label>
</template>

<script>
export default {
  name: 'ToggleSwitch',
  props: {
    id: {
      type: String,
      default: '',
    },
    value: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.toggle-switch {
  position: relative;
  display: inline-block;
  width: 30px;
  height: 17px;
}
.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #BBA7E4;
  border-radius: 17px;
}
.slider:before {
  position: absolute;
  content: "";
  height: 13px;
  width: 13px;
  left: 2px;
  bottom: 2px;
  background-color: #fff;
  border-radius: 50%;
}
input:checked + .slider {
  background-color: #5736bb;
}
input:checked + .slider:before {
  transform: translateX(13px);
}
</style>
