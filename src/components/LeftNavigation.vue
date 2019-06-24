<template>
  <nav class="left-navigation">
    <router-link
      class="home"
      to="/">
      <img
        src="@/assets/icons/menu.svg"
        alt="Home icon">
    </router-link>
    <router-link
      v-for="(link, idx) in links"
      :key="idx"
      :to="link.link"
      :class="{ active: isActive(link.link)  }">
      <span :class="link.icon"/>
    </router-link>
  </nav>
</template>

<script>
export default {
  name: 'LeftNavigation',
  data() {
    return {
      links: [
        {
          link: '/dashboard',
          icon: 'home',
        },
        {
          link: '/people',
          icon: 'users',
        },
        {
          link: '/campaigns',
          icon: 'campaigns',
        },
        {
          link: '/videos',
          icon: 'videos',
        },
        {
          link: '/settings',
          icon: 'settings',
        },
      ],
    };
  },
  methods: {
    isActive(link) {
      if (this.$route.path.includes(link)) {
        return true;
      }
      return false;
    },
  },
};
</script>

<style scoped>
.left-navigation {
  z-index: 2;
  padding: 20px 0;
  padding-left: 8px;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 64px;
  background: #383147;
}
a {
  display: inline-block;
  color: #fff;
  width: 100%;
  text-align: center;
}
.home img,
a span {
  margin-left: -8px;
}
a span {
  display: inline-block;
  height: 24px;
  width: 24px;
}
a:first-of-type {
  font-size: 24px;
  margin-bottom: 64px;
}
a:not(:first-of-type) {
  position: relative;
  padding: 8px;
  margin-bottom: 16px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}
a:not(:first-of-type):hover,
a.active {
  background: #fff;
  color: #5736bb;
}
a:not(:first-of-type):hover:before,
a.active:before {
  content: '';
  position: absolute;
  left: 4px;
  width: 2px;
  background: #f37366;
  top: 8px;
  bottom: 8px;
  border-radius: 50px;
}
a:not(:first-of-type):hover span,
a.active span {
  margin-left: 0;
}
a span.home {
  background: url('../assets/icons/home.svg');
}
a:hover span.home,
a.active span.home {
  background: url('../assets/icons/home.svg');
}
a span.users {
  background: url('../assets/icons/users.svg');
}
a:hover span.users,
a.active span.users {
  background: url('../assets/icons/users-active.svg');
}
a span.campaigns {
  background: url('../assets/icons/campaigns.svg');
}
a:hover span.campaigns,
a.active span.campaigns {
  background: url('../assets/icons/campaigns-active.svg');
}
a span.videos {
  background: url('../assets/icons/videos.svg');
}
a:hover span.videos,
a.active span.videos {
  background: url('../assets/icons/videos-active.svg');
}
a span.settings {
  background: url('../assets/icons/settings.svg');
}
a:hover span.settings,
a.active span.settings {
  background: url('../assets/icons/settings-active.svg');
}
</style>
