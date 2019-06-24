<template>
  <div class="analytics">
    <div class="analytics-column">
      <div class="metrics">
          <div class="metric">
            <h4>Click-Through Rate</h4>
            <p>25%</p>
            <img
              src="@/assets/icons/click-through.svg"
              alt="Click-through rate icon">
          </div>
          <div class="metric">
            <h4>People with Multiple Views</h4>
            <p>0</p>
            <img
              src="@/assets/icons/multiple-views.svg"
              alt="Multiple views icon">
          </div>
        </div>
    </div>
    <div class="analytics-column">
      <div class="analytics-overview">
        <div class="overview-column">
          <h4>Open Rate</h4>
          <button class="opened open">
            <div>
              <div
                class="c100 p25 center darkblue">
                <span>25%</span>
                <div class="slice">
                  <div class="bar"></div>
                  <div class="fill"></div>
                </div>
              </div>
              <p>1 out of 4</p>
            </div>
          </button>
        </div>
        <div class="overview-column">
          <h4>Click Rate</h4>
          <button class="seafoamgreen">
            <div>
              <div
                class="c100 p25 center seafoamgreen">
                <span>25%</span>
                <div class="slice">
                  <div class="bar"></div>
                  <div class="fill"></div>
                </div>
              </div>
              <p>1 out of 4</p>
            </div>
          </button>
        </div>
        <div class="overview-column">
          <h4>Played Rate</h4>
          <button class="redorange">
            <div>
              <div
                class="c100 p25 center redorange">
                <span>25%</span>
                <div class="slice">
                  <div class="bar"></div>
                  <div class="fill"></div>
                </div>
              </div>
              <p>1 out of 4</p>
            </div>
          </button>
        </div>
        <div class="overview-column">
          <h4>Completion Rate</h4>
          <button class="lightblue">
            <div>
              <div
                class="c100 p25 center lightblue">
                <span>25%</span>
                <div class="slice">
                  <div class="bar"></div>
                  <div class="fill"></div>
                </div>
              </div>
              <p>1 out of 4</p>
            </div>
          </button>
        </div>
      </div>
      <div class="opened analytics-expanded">
        <table>
          <tr>
            <th>Name/Email</th>
            <th>Date/Time</th>
            <th>Opened</th>
          </tr>
          <tr>
            <td>
              <p class="name">Kyle Adkins</p>
              <p>kyle.adkins@apptegy.com</p>
            </td>
            <td>April 26, 2019 3:31PM</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>
              <p class="name">Kyle Adkins</p>
              <p>kyle.adkins@apptegy.com</p>
            </td>
            <td>April 26, 2019 3:31PM</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>
              <p class="name">Kyle Adkins</p>
              <p>kyle.adkins@apptegy.com</p>
            </td>
            <td>April 26, 2019 3:31PM</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>
              <p class="name">Kyle Adkins</p>
              <p>kyle.adkins@apptegy.com</p>
            </td>
            <td>April 26, 2019 3:31PM</td>
            <td>Yes</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Analytics',
};
</script>

<style scoped>
.analytics,
.analytics-overview {
  display: flex;
}
.analytics-column:first-of-type {
  width: 30%;
}
.analytics-column:last-of-type {
  width: 70%;
}
.analytics-overview h4 {
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 1px;
  font-family: 'Neue Haas Grotesk Disp W05_65M';
  margin-bottom: 16px;
}
.analytics-overview .c100 {
  margin-bottom: 16px;
}
.overview-column {
  text-align: center;
  margin-right: 24px;
}
.overview-column button {
  padding: 16px 32px;
}
.overview-column button.open {
  position: relative;
  border-radius: 0;
  border: 1px solid #f4f2fb;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
.overview-column button.open.opened {
  border-top: 4px solid #004B8D;
}
.overview-column button.open.clicked {
  border-top: 4px solid #3AB5B5;
}
.overview-column button.open.played {
  border-top: 4px solid #F37366;
}
.overview-column button.open.completion {
  border-top: 4px solid #009DDB;
}
.overview-column button.open:after {
  position: absolute;
  content: '';
  width: 100%;
  bottom: -2px;
  left: 0;
  border-bottom: 4px solid #fff;
  z-index: 1;
}
.analytics-expanded {
  border: 1px solid #f4f2fb;
  border-radius: 4px;
  border-top-left-radius: 4px;
  padding: 24px;
}
.analytics-expanded.opened {
  border-bottom: 4px solid #004B8D;
  border-top-left-radius: 0;
}
.analytics-expanded.clicked {
  border-bottom: 4px solid #3AB5B5;
}
.analytics-expanded.played {
  border-bottom: 4px solid #F37366;
}
.analytics-expanded.completion {
  border-bottom: 4px solid #009DDB;
}
.analytics-expanded table {
  text-align: left;
  width: 100%;
}
.analytics-expanded table tr {
  border-bottom: 1px solid #f4f2fb;
}
.analytics-expanded table tr:last-of-type {
  border: none;
}
.analytics-expanded table th {
  height: 25px;
  line-height: 25px;
  font-family: 'Neue Haas Grotesk Disp W05_65M';
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 1px;
}
.analytics-expanded table td {
  padding: 8px 0;
  vertical-align: middle;
  color: #8d8d8d;
}
.analytics-expanded table td p.name {
  font-family: 'Neue Haas Grotesk Disp W05_65M';
  margin-bottom: 2px;
  color: #000;
}
.metrics {
  max-width: 250px;
}
.metric {
  overflow: hidden;
  padding: 32px;
  position: relative;
  border: 1px solid #f4f2fb;
  border-radius: 4px;
  margin-bottom: 16px;
}
.metric h4 {
  text-transform: uppercase;
  font-size: 12px;
  font-family: 'Neue Haas Grotesk Disp W05_65M';
  letter-spacing: 1px;
  margin-bottom: 8px;
}
.metric p {
  color: #333;
  font-size: 48px;
  font-family: 'Neue Haas Grotesk Disp W05_75B';
}
.metric img {
  position: absolute;
  right: -1px;
  bottom: 0;
}
</style>
