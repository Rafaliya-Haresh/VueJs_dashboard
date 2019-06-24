<template>
  <div class="video-details">
    <div class="container">
      <Breadcrumbs :crumbs="[
        { name: 'Home', link: '/people' },
        { name: 'Videos', link: '/videos' },
        { name: 'First Video', link: '' }]"/>
      <PageHeading title="First Video">
        <template slot="filters">
          <div class="sender">
            <p>Todd French</p>
            <p class="email">todd.french@gmail.com</p>
          </div>
        </template>
        <template slot="buttons">
          <button
            class="primary">Deactivate</button>
        </template>
      </PageHeading>
      <div class="tabs">
        <router-link
          :class="{ active: isActive('/videos/1') }"
          to="/videos/1">Video Details</router-link>
        <router-link
          :class="{ active: isActive('/videos/1/analytics') }"
          to="/videos/1/analytics">Analytics</router-link>
      </div>
      <router-view/>
    </div>
  </div>
</template>

<script>
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import PageHeading from '@/components/PageHeading.vue';

export default {
  name: 'VideoDetails',
  components: {
    Breadcrumbs,
    PageHeading,
  },
  methods: {
    isActive(path) {
      return path === this.$route.path;
    },
  },
};
</script>

<style scoped>
.email {
  color: #8d8d8d;
}
.tabs {
  width: 400px;
  border-bottom: 1px solid #f4f2fb;
  margin-bottom: 24px;
}
.tabs a {
  display: inline-block;
  padding: 8px;
  color: #000;
  border-bottom: 3px solid transparent;
}
.tabs a.active {
  font-family: 'Neue Haas Grotesk Disp W05_65M';
  color: #5736bb;
  border-color: #f37366;
}
</style>
