<template>
  <div>
    <div class='info-container'>
      <h2 class='detailed-text'>{{title}}</h2>
      <div class='card' v-bind:class='color'>
        <slot name='chart'></slot>
      </div>
      <div class='card-right' v-bind:class='color'>
        <slot name='list'></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InfoCard',
  props: {
    title: {
      default: '',
      type: String,
    },
    color: {
      default: '',
      type: String,
    },
  },
};
</script>

<style scoped>
.info-container {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 35px;
  position: relative;
}
.detailed-text {
  font-weight: bolder;
  font-size: 16px;
  color: #333333;
  padding: 10px;
  position: absolute;
  top: 15px;
  left: 25px;
}
.card {
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: #fff;
  border: 1px solid #f4f2fb;
  margin-right: 30px;
  padding: 30px;
  padding-top: 50px;
  flex: 3;
}
.card-right {
  align-items: center;
  height: auto;
  width: 100%;
  background-color: #ffffff;
  border: 1px solid #f4f2fb;
  margin-right: 30px;
  padding: 10px;
  flex: 1;
}
.video-color {
  border-bottom: 2px solid #5624bb;
}
.email-color {
  border-bottom: 2px solid #f37366;
}
.adv-color {
  border-bottom: 2px solid #009ddd;
}
.people-color {
  border-bottom: 2px solid #3bb5b5;
}
</style>
