<template>
  <div class="top-navigation">
    <h1>Crowd<span>Shift</span></h1>
  </div>
</template>

<script>
export default {
  name: 'TopNavigation',
};
</script>

<style scoped>
.top-navigation {
  z-index: 2;
  position: fixed;
  top: 0;
  left: 64px;
  right: 0;
  padding: 0 40px;
  height: 64px;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 4px #d7d7d7;
  background: #fff;
}
h1 {
  font-size: 24px;
  font-family: 'Neue Haas Grotesk Disp W05_75B';
}
h1 span {
  color: #442c77;
}
</style>
