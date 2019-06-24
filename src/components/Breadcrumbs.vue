<template>
  <nav class="breadcrumbs">
    <span
      v-for="(crumb, idx) in crumbs"
      :key="idx">
      <router-link
        :to="crumb.link">
        {{ crumb.name }}
      </router-link>
      <span
        v-if="idx < crumbs.length - 1"
        class="spacer">/</span>
    </span>
  </nav>
</template>

<script>
export default {
  name: 'Breadcrumbs',
  props: {
    crumbs: {
      default: () => [],
      type: Array,
    },
  },
};
</script>

<style scoped>
.breadcrumbs {
  margin-bottom: 24px;
}
a,
span {
  font-size: 14px;
  color: #8d8d8d;
}
a {
  text-decoration: none;
}
.spacer {
  margin: 0 8px;
}
</style>
