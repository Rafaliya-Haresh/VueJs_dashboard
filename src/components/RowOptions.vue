<template>
  <div class="row-options">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'RowOptions',
};
</script>

<style>
.td-row:hover .row-options {
  opacity: 1;
  visibility: visible;
}
.row-options {
  display: flex;
  align-items: center;
  transition: 0.2s ease;
  opacity: 0;
  visibility: hidden;
  border-top: 4px solid #5736bb;
  padding: 0 32px;
  z-index: 1;
  position: absolute;
  bottom: -40px;
  left: 224px;
  height: 40px;
  background: #f5f2fb;
}
.row-options button {
  padding: 0;
  font-size: 20px;
  margin-right: 32px;
  color: #5736bb;
}
.row-options button:last-of-type {
  margin-right: 0;
}
</style>
