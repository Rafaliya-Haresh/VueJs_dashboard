<template>
  <div class="page-heading">
    <div>
      <h2>{{ title }}</h2>
      <slot name="welcome-text"/>
      <slot name="filters"/>
    </div>
    <div class="buttons">
      <slot name="buttons"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageHeading',
  props: {
    title: {
      default: '',
      type: String,
    },
  },
};
</script>

<style scoped>
.page-heading {
  display: flex;
  justify-content: space-between;
  margin-bottom: 48px;
}
h2 {
  font-family: 'Neue Haas Grotesk Disp W05_75B';
  font-size: 24px;
  margin-bottom: 16px;
}
button:not(:last-of-type) {
  margin-right: 16px;
}
button {
  font-size: 14px;
  border-radius: 4px;
  padding: 8px 16px;
}
select {
  padding: 0;
  border: none;
  width: auto;
  padding-right: 24px;
  font-family: 'Neue Haas Grotesk Disp W05_75B';
}
.filter-dropdown {
  position: relative;
}
.filter-dropdown-button {
  font-family: 'Neue Haas Grotesk Disp W05_75B';
  font-size: 16px;
  padding: 0;
  padding-right: 20px;
  background: none;
  background: url('data:image/svg+xml;utf8,<svg fill="black" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>');
  background-repeat: no-repeat;
  background-position: right center;
  background-size: 16px;
}
.filter-dropdown-button span,
.filter-dropdown .options span {
  font-family: 'Neue Haas Grotesk Disp W05_55R';
  color: #8d8d8d;
}
.options {
  background: #fff;
  z-index: 1;
  position: absolute;
  box-shadow: 0 2px 4px #d7d7d7;
  padding: 16px;
  width: 150px;
  border-radius: 4px;
}
.options button {
  padding: 0;
  margin: 0;
  text-align: left;
  margin-bottom: 8px;
  font-size: 16px;
  display: block;
}
.options button:last-of-type {
  margin-bottom: 0;
}
</style>
