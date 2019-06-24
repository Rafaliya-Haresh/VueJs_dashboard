<template>
  <div id="app">
    <TopNavigation/>
    <LeftNavigation/>
    <router-view/>
  </div>
</template>

<script>
import TopNavigation from './components/TopNavigation.vue';
import LeftNavigation from './components/LeftNavigation.vue';

export default {
  name: 'App',
  components: {
    TopNavigation,
    LeftNavigation,
  },
};
</script>

<style src="./assets/css/reset.css"></style>

<style>
* {
  box-sizing: border-box;
}
#app {
  font-family: 'Neue Haas Grotesk Disp W05_55R';
  font-size: 16px;
  min-width: 1200px;
}
button img {
  vertical-align: top;
}
a {
  color: #5736bb;
  text-decoration: none;
}
strong {
  font-family: 'Neue Haas Grotesk Disp W05_75B';
}
em {
  font-style: italic;
}
pre {
  font-family: monospace;
}
button {
  line-height: 1;
  font-size: 14px;
  border-radius: 4px;
  padding: 8px 12px;
  appearance: none;
  border: none;
  background: none;
  cursor: pointer;
  font-family: inherit;
}
button:focus {
  outline: none;
}
button[disabled] {
  cursor: default;
  opacity: 0.7;
}
p.error {
  color: #d45067;
}
select {
  width: 200px;
  background: none;
  background: url('data:image/svg+xml;utf8,<svg fill="black" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>');
  background-repeat: no-repeat;
  background-position: right center;
  background-size: 16px;
  font-size: inherit;
  appearance: none;
  border: none;
  border-radius: 0;
  padding: 4px;
  border-bottom: 2px solid #e1e1e1;
  cursor: pointer;
  font-family: inherit;
}
select:focus {
  outline: none;
  border-bottom: 2px solid #5736bb;
}
.primary {
  background: #5736bb;
  color: #fff;
}
.secondary {
  background: #f5f2fb;
  color: #5736bb;
}
.white {
  background: #fff;
  color: #5736bb;
  border: 1px solid #e1e1e1;
}
::placeholder {
  font-family: 'Neue Haas Grotesk Disp W05_55R';
  color: #999;
  -webkit-font-smoothing: auto;
}
label {
  cursor: pointer;
}
input[type='text'] {
  font-family: 'Neue Haas Grotesk Disp W05_55R';
  transition: 0.2s ease;
  font-size: inherit;
  border: none;
  margin: 0;
  border-bottom: 2px solid #e1e1e1;
}
input:focus {
  outline: none;
  border-bottom: 2px solid #5736bb;
}
input[type='radio'] {
  height: 0;
  width: 0;
  position: absolute;
  opacity: 0;
}
.radio-label {
  transition: 0.2s ease;
  padding-left: 24px;
  background: url('./assets/icons/radio.svg') no-repeat;
  background-position: left center;
  background-size: 16px;
}
input[type='radio']:checked + .radio-label {
  background: url('./assets/icons/radio-selected.svg') no-repeat;
}
input[type='checkbox'] {
  height: 16px;
  width: 16px;
  margin: 0;
  border: none;
  appearance: none;
  background: url('./assets/icons/checkbox.svg') no-repeat center left;
}
input[type='checkbox']:checked {
  background: url('./assets/icons/checkbox-selected.svg') no-repeat center left;
}
.container {
  padding: 88px 80px 24px 144px;
}
.strong {
  font-family: 'Neue Haas Grotesk Disp W05_75B';
}
.table {
  margin-bottom: 48px;
  min-height: 300px;
  max-width: 100%;
  overflow-x: scroll;
}
.th-row,
.td-row {
  white-space: nowrap;
  position: relative;
  clear: both;
}
.table.scroll .th-row,
.table.scroll .td-row {
  border: none;
}
.th-row {
  border-top: 1px solid #f4f2fb;;
  border-bottom: 1px solid #f4f2fb;
}
.td-row {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f4f2fb;
}
.th {
  height: 25px;
  line-height: 25px;
  padding-left: 24px;
  display: inline-block;
  width: 20%;
  font-family: 'Neue Haas Grotesk Disp W05_65M';
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 1px;
}
.table.scroll .th {
  border-top: 1px solid #f4f2fb;
}
.table.scroll .th,
.table.scroll .td {
  border-bottom: 1px solid #f4f2fb;
}
.td {
  height: 50px;
  padding-left: 24px;
  display: inline-flex;
  align-items: center;
  color: #8d8d8d;
  max-width: 20%;
  flex: 0 0 20%;
}
.td p {
  line-height: 1.15;
  overflow: hidden;
  text-overflow: ellipsis;
}
.total-video-icon {
  background-image: url('./assets/icons/total-video-icon.svg');
  background-repeat: no-repeat;
  background-position: center;
}
.total-contacts-icon {
  background-image: url('./assets/icons/total-contacts-icon.svg');
  background-repeat: no-repeat;
  background-position: center;
}
.total-advocate-icon {
  background-image: url('./assets/icons/total-advocate-icon.svg');
  background-repeat: no-repeat;
  background-position: center;
}
.total-campaigns-icon {
  background-image: url('./assets/icons/campaigns.svg');
  background-repeat: no-repeat;
  background-position: center;
}
.campaign-summary-icon {
  background-image: url('./assets/icons/campaign-summary-icon.svg');
  background-repeat: no-repeat;
  background-position: center;
}
.video-summary-icon {
  background-image: url('./assets/icons/video-summary-icon.svg');
  background-repeat: no-repeat;
  background-position: center;
}
.advocacy-share-summary-icon {
  background-image: url('./assets/icons/advocacy-share-summary-icon.svg');
  background-repeat: no-repeat;
  background-position: center;
}
.people-summary-icon {
  background-image: url('./assets/icons/people-summary-icon.svg');
  background-repeat: no-repeat;
  background-position: center;
}
</style>
