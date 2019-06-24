<template>
  <div>
    <div class="list-header">
      <div class="icon" :class="[color, icon]"></div>
      <div class="detailed-text">{{title}}</div>
    </div>
    <div>
      <div v-bind:key="value.text" v-for="value in data">
        <div v-if="value.link" class="link-container">
          <router-link class="link" :to="value.link">{{value.text}}</router-link>
        </div>
        <div v-else class="text-container">
          <div class="text">{{value.text}}</div>
          <div class="number">{{value.number}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListCard',
  props: {
    title: {
      default: '',
      type: String,
    },
    color: {
      default: '',
      type: String,
    },
    icon: {
      default: '',
      type: String,
    },
    data: {
      default: () => [],
      type: Array,
    },
  },
};
</script>

<style scoped>
.list-header {
  display: flex;
  margin: 10px 0 20px 10px;
}
.icon {
  height: 40px;
  width: 40px;
  border-radius: 50%;
}
.detailed-text {
  flex: 1;
  font-weight: bolder;
  font-size: 16px;
  color: #333333;
  padding: 10px;
}
.link-container {
  display: flex;
  height: 60px;
  align-items: center;
}
.text-container {
  display: flex;
  height: 60px;
  border-bottom: 2px solid #f5f2fb;
  align-items: center;
  font-size: 14px;
}
.link {
  flex: 1;
  color: #5624bb;
  text-align: left;
  margin-left: 20px;
}
.text {
  flex: 1;
  text-align: left;
  margin-left: 20px;
}
.number {
  flex: 1;
  text-align: right;
  margin-right: 20px;
}
.video-color {
  background-color:#5624bb;
}
.email-color {
  background-color: #f37366;
}
.adv-color {
  background-color: #009ddd;
}
.people-color {
  background-color: #3bb5b5;
}
</style>
