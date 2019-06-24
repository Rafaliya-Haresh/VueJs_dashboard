<template>
  <div class="data-options">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'DataOptions',
};
</script>

<style scoped>
.data-options {
  position: relative;
}
.search {
  font-size: 14px;
  margin-right: 16px;
  padding: 8px;
  width: 200px;
  background: url('../assets/icons/search.svg') no-repeat center right 8px;
}
button[disabled],
.search[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}
button {
  margin-right: 16px;
}
.data-options *:last-child {
  margin-right: 0;
}
.filter-button {
  display: inline-flex;
  align-items: center;
}
.filters-icon {
  display: inline-block;
  margin-left: 4px;
}
.filters-icon img {
  vertical-align: middle;
}
.filters-icon span {
  display: inline-block;
  background: #f37366;
  height: 14px;
  line-height: 14px;
  padding: 0 4px;
  text-align: center;
  border-radius: 2px;
  font-size: 12px;
  color: #fff;
}
.pagination button:first-of-type {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.pagination button:last-of-type {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-left: none;
  margin-right: 16px;
}
.pagination button {
  margin-right: 0;
}
.pagination button img {
  height: 14px;
  width: auto;
}
.pagination .page {
  color: #8d8d8d;
}
</style>
