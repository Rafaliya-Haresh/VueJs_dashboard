<template>
  <div class="card">
    <div class="icon" :class="icon">
    </div>
    <div class="details">
      <div class="number">{{number}}</div>
      <div class="detailed-text">{{text}}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'StatusCard',
  props: {
    icon: {
      default: '',
      type: String,
    },
    number: {
      default: 0,
      type: Number,
    },
    text: {
      default: '',
      type: String,
    },
  },
};
</script>

<style scoped>
.card {
  display: flex;
  align-items: center;
  height: 124px;
  width: 277px;
  background-color: #ffffff;
  border: 1px solid #f4f2fb;
  margin-right: 30px;
}
.icon {
  background-color: #f5f2fb;
  height: 70px;
  width: 70px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  margin-left: 10px;
}
.last-card {
  margin-right: 0;
}
.details {
  margin-left: 25px;
}
.detailed-text {
  font-family: "Neue Haas Grotesk Dis";
  font-weight: 65 medium;
  font-size: 14px;
  color: #333333;
}
.number {
  font-family: "Neue Haas Grotesk Dis";
  font-size: 48px;
  font-weight: 75 bold;
  color: #333333;
}
</style>
