<template>
  <div class="email-preview">
    <img
      class="logo"
      :class="{ 'no-headline': !headline }"
      src="@/assets/images/rsd.jpg"
      alt="Russellville School District logo">
    <h1
      class="headline"
      v-if="headline">{{ headline }}</h1>
    <img
      class="hero"
      v-if="heroImage"
      :src="heroImage">
    <div
      class="text"
      v-html="body"/>
    <template v-if="buttonLink && buttonText">
      <a
        class="button"
        :href="buttonLink">{{ buttonText }}</a>
    </template>
    <hr/>
    <div class="footer">
      <div>
        <p>Russellville School District</p>
        <p>425 W Capitol Ave #800</p>
        <p>Little Rock, AR</p>
      </div>
      <div>
        <p>If you don't want to receive these emails, you can
        <a href="#">unsubscribe here</a>.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmailPreview',
  props: ['headline', 'body', 'buttonText', 'heroImage', 'buttonLink'],
};
</script>

<style scoped>
.email-preview {
  text-align: center;
}
a {
  color: #E60122;
}
p {
  font-size: 14px;
  line-height: 1.15;
}
.scroll {
  margin: 0 auto;
  width: 500px;
  max-height: 600px;
  overflow-y: scroll;
}
.logo {
  width: 75px;
  height: auto;
  margin-bottom: 32px;
}
.logo.no-headline {
  margin-bottom: 0;
}
.headline,
.hero,
.button {
  margin-bottom: 16px;
}
.headline {
  font-family: 'Neue Haas Grotesk Disp W05_75B';
}
.hero {
  width: 100%;
  height: auto;
}
.text {
  text-align: left;
  margin: 32px 0;
}
.text p {
  line-height: 1.4;
}
.button {
  background: #E60122;
  color: #fff;
  display: inline-block;
  border-radius: 4px;
  padding: 16px 32px;
}
hr {
  display: block;
  height: 2px;
  border: 0;
  border-top: 2px solid #f1f1f1;
  margin-bottom: 16px;
}
.footer {
  display: flex;
  text-align: left;
}
.footer div {
  width: 50%;
}
</style>
