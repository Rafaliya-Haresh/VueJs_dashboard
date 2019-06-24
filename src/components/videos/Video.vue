<template>
  <div class="video">
    <div class="info">
      <h3 class="strong">First Video</h3>
      <div class="recipients-date">
        <span class="recipients"><span class="number-recipients">5</span> recipients</span>
        <span class="date">July 5, 2019</span>
      </div>
      <div>
        <h4>Sender</h4>
        <p>Todd French</p>
        <p class="email">todd.french@gmail.com</p>
      </div>
    </div>
    <div class="analytics">
      <div class="analytic">
        <h4>Opened Rate</h4>
        <div
          class="c100 p26 center darkblue">
          <span>25%</span>
          <div class="slice">
            <div class="bar"></div>
            <div class="fill"></div>
          </div>
        </div>
        <p>1 out of 4</p>
      </div>
      <div class="analytic">
        <h4>Clicked Rate</h4>
        <div
          class="c100 p26 center seafoamgreen">
          <span>25%</span>
          <div class="slice">
            <div class="bar"></div>
            <div class="fill"></div>
          </div>
        </div>
        <p>1 out of 4</p>
      </div>
      <div class="analytic">
        <h4>Played Rate</h4>
        <div
          class="c100 p26 center redorange">
          <span>25%</span>
          <div class="slice">
            <div class="bar"></div>
            <div class="fill"></div>
          </div>
        </div>
        <p>1 out of 4</p>
      </div>
      <div class="analytic">
        <h4>Completion Rate</h4>
        <div
          class="c100 p26 center lightblue">
          <span>25%</span>
          <div class="slice">
            <div class="bar"></div>
            <div class="fill"></div>
          </div>
        </div>
        <p>1 out of 4</p>
      </div>
    </div>
    <router-link to="/videos/1">
      <img
        src="@/assets/icons/link-arrow.svg"
        alt="View video details">
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Video',
};
</script>

<style scoped>
.video {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #f4f2fb;
  border-radius: 4px;
  padding: 24px 48px;
  min-height: 100px;
  margin-bottom: 16px;
}
.video h3 {
  font-size: 20px;
}
.video h4 {
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 1px;
  font-family: 'Neue Haas Grotesk Disp W05_65M';
  margin-bottom: 8px;
}
.video h3,
.recipients-date {
  margin-bottom: 16px;
}
.recipients-date,
.email {
  color: #8d8d8d;
}
.recipients {
  margin-right: 16px;
}
.number-recipients {
  display: inline-block;
  padding: 2px;
  color: #000;
  font-family: 'Neue Haas Grotesk Disp W05_75B';
  border-bottom: 2px solid #f07365;
}
.analytics {
  display: flex;
  align-items: center;
}
.analytic {
  text-align: center;
  margin-right: 32px;
}
.analytic h4,
.analytic .c100 {
  margin-bottom: 16px;
}
</style>
