<template>
  <div class="message">
    <div class="message-overview">
      <div class="overview-column">
        <div>
          <h3>
            <span
              class="message-status"
              :class="{ approved: message.approved }"/>
            {{ message.subject }}
          </h3>
          <p class="send-time">{{ formatSendTime(message.send_time) }}</p>
          <button
            class="message-button white"
            @click="$emit('view')">View Message</button>
        </div>
      </div>
      <template>
        <button
          v-if="message.status !== 'undelivered'"
          :class="[{ open: openChart === Analytic.Delivered }, openChart]"
          class="overview-column stat"
          @click="isExpanded = true; openChart = Analytic.Delivered">
          <div>
            <div
              class="c100 center darkblue"
              :class="`p${Math.round(message.analytics.rates.delivered * 100)}`">
              <span>{{ formatPercentage(message.analytics.rates.delivered * 100) }}%</span>
              <div class="slice">
                <div class="bar"></div>
                <div class="fill"></div>
              </div>
            </div>
            <p>{{ message.analytics.counts.delivered.total }} out of
              {{ message.analytics.counts.total }}</p>
          </div>
        </button>
        <div
          v-else
          class="overview-column stat dashes">
          <img
            src="@/assets/icons/message-dashes.svg"
            alt="No data yet">
        </div>
      </template>
      <template>
        <button
          v-if="message.status !== 'undelivered'"
          :class="[{ open: openChart === Analytic.Opened }, openChart]"
          class="overview-column stat"
          @click="isExpanded = true; openChart = Analytic.Opened">
          <div>
            <div
              class="c100 center seafoamgreen"
              :class="`p${Math.round(message.analytics.rates.opened * 100)}`">
              <span>{{ formatPercentage(message.analytics.rates.opened * 100) }}%</span>
              <div class="slice">
                <div class="bar"></div>
                <div class="fill"></div>
              </div>
            </div>
            <p>{{ message.analytics.counts.opened.total }} out of
              {{ message.analytics.counts.total }}</p>
          </div>
        </button>
        <div
          v-else
          class="overview-column stat dashes">
          <img
            src="@/assets/icons/message-dashes.svg"
            alt="No data yet">
          <div class="message-tooltip">Data unavailable. This message hasn't been sent</div>
        </div>
      </template>
      <template>
        <button
          v-if="message.status !== 'undelivered'"
          :class="[{ open: openChart === Analytic.Clicked }, openChart]"
          class="overview-column stat"
          @click="isExpanded = true; openChart = Analytic.Clicked">
          <div>
            <div
              class="c100 center lightblue"
              :class="`p${Math.round(message.analytics.rates.clicked * 100)}`">
              <span>{{ formatPercentage(message.analytics.rates.clicked * 100) }}%</span>
              <div class="slice">
                <div class="bar"></div>
                <div class="fill"></div>
              </div>
            </div>
            <p>{{ message.analytics.counts.clicked.total }} out of
              {{ message.analytics.counts.total }}</p>
          </div>
        </button>
        <div
          v-else
          class="overview-column stat dashes">
          <img
            src="@/assets/icons/message-dashes.svg"
            alt="No data yet">
        </div>
      </template>
      <div
        v-if="message.status === 'undelivered'"
        class="overview-right">
        <button
          class="white"
          @click="$emit('delete')">
          <img
            src="@/assets/icons/delete.svg"
            alt="Delete message">
        </button>
        <button
          class="white"
          @click="$emit('edit')">Edit Message</button>
      </div>
      <div
        v-else
        class="overview-right">
        <button
          @click="toggleExpanded"
          :class="{ expanded: isExpanded }">
          <img
            src="@/assets/icons/link-arrow.svg"
            alt="Click to view expanded message analytics">
        </button>
      </div>
    </div>
    <div
      v-if="isExpanded && message.status === 'delivered'"
      class="message-expanded">
      <div class="expanded-column">
        <div class="metrics">
          <div class="metric">
            <h4>Click-Through Rate</h4>
            <p>{{ formatPercentage(message.analytics.rates.click_through * 100) }}%</p>
            <img
              src="@/assets/icons/click-through.svg"
              alt="Click-through rate icon">
          </div>
          <div class="metric">
            <h4>Unsubscribed</h4>
            <p>{{ message.analytics.counts.unsubscribed }}</p>
            <img
              src="@/assets/icons/unsubscribed.svg"
              alt="Unsubscribed icon">
          </div>
          <div class="metric">
            <h4>Marked as Spam</h4>
            <p>{{ message.analytics.counts.spam_report }}</p>
            <img
              src="@/assets/icons/spam.svg"
              alt="Spam icon">
          </div>
        </div>
      </div>
      <div
        class="expanded-column"
        :class="openChart">
        <div
          class="doughnut"
          v-if="openChart === Analytic.Delivered">
          <div class="chart-container">
            <MessageDoughnutChart
              :chart-data="deliveredData"
              :options="doughnutChartOptions"/>
          </div>
          <div class="legend">
            <p>
              <span class="delivered"/>
              Delivered ({{ formatPercentage(message.analytics.rates.delivered * 100) }}%)</p>
            <p>
              <span class="bounced"/>
              Bounced ({{ formatPercentage(message.analytics.rates.bounced * 100) }}%)</p>
            <p>
              <span class="dropped"/>
              Dropped ({{ formatPercentage(message.analytics.rates.dropped * 100) }}%)</p>
            <p>
              <span class="deferred"/>
              Deferred ({{ formatPercentage(message.analytics.rates.deferred * 100) }}%)</p>
          </div>
        </div>
        <div v-else>
          <h4 class="chart-title">No. of messages {{ openChart }} by date</h4>
          <MessageBarChart
            :chart-data="(openChart === Analytic.Clicked) ? clickedData : openedData"
            :options="barChartOptions"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MessageDoughnutChart from './MessageDoughnutChart.vue';
import MessageBarChart from './MessageBarChart.vue';
import { formatPercentage } from '@/helpers';

const Analytic = Object.freeze({
  Delivered: 'delivered',
  Opened: 'opened',
  Clicked: 'clicked',
});

export default {
  name: 'Message',
  components: {
    MessageDoughnutChart,
    MessageBarChart,
  },
  props: ['message'],
  data() {
    return {
      formatPercentage,
      Analytic,
      openedData: {},
      clickedData: {},
      deliveredData: {},
      isExpanded: false,
      openChart: null,
      doughnutChartOptions: {
        cutoutPercentage: 70,
        elements: {
          arc: {
            borderWidth: 0,
          },
        },
        tooltips: {
          enabled: false,
        },
        legend: {
          display: false,
        },
        responsive: true,
        maintainAspectRatio: false,
      },
      barChartOptions: {
        tooltips: {
          enabled: false,
        },
        legend: {
          display: false,
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              ticks: {
                fontFamily: 'Neue Haas Grotesk Disp W05_55R',
                fontColor: '#000',
                callback(value) {
                  return value.toUpperCase();
                },
              },
              barThickness: 24,
              offset: true,
              type: 'time',
              time: {
                unit: 'day',
                unitStepSize: 1,
                displayFormats: {
                  day: 'MMM DD',
                },
              },
              gridLines: {
                display: false,
              },
            },
          ],
          yAxes: [{
            gridLines: {
              color: '#f4f2fb',
              zeroLineColor: '#f4f2fb',
            },
            ticks: {
              fontFamily: 'Neue Haas Grotesk Disp W05_55R',
              fontColor: '#000',
              beginAtZero: true,
              callback(value) {
                if (value % 1 === 0) {
                  return value;
                }
                return null;
              },
            },
          }],
        },
      },
    };
  },
  computed: {
    labels() {
      const start = this.$moment(this.message.send_time);
      const end = start.add(10, 'days');
      return [start, end];
    },
  },
  watch: {
    'message.analytics.counts.opened.dates': {
      immediate: true,
      handler() {
        this.openedData = {
          labels: this.labels,
          datasets: [
            {
              hoverBackgroundColor: '#3AB5B5',
              backgroundColor: '#3AB5B5',
              data: this.message.analytics.counts.opened.dates
                .map((d) => ({ x: d.date, y: d.count })),
            },
          ],
        };
      },
    },
    'message.analytics.counts.clicked.dates': {
      immediate: true,
      handler() {
        this.clickedData = {
          labels: this.labels,
          datasets: [
            {
              hoverBackgroundColor: '#009DDC',
              backgroundColor: '#009DDC',
              data: this.message.analytics.counts.clicked.dates
                .map((d) => ({ x: d.date, y: d.count })),
            },
          ],
        };
      },
    },
    'message.analytics.rates': {
      immediate: true,
      handler(rates) {
        this.deliveredData = {
          labels: ['Delivered', 'Bounced', 'Dropped', 'Deferred'],
          datasets: [
            {
              hoverBackgroundColor: ['#004B8D', '#009DDC', '#333333', '#F27366'],
              backgroundColor: ['#004B8D', '#009DDC', '#333333', '#F27366'],
              data: [rates.delivered, rates.bounced, rates.dropped, rates.deferred],
            },
          ],
        };
      },
    },
  },
  methods: {
    toggleExpanded() {
      this.isExpanded = !this.isExpanded;
      if (this.isExpanded) {
        this.openChart = Analytic.Delivered;
      } else {
        this.openChart = null;
      }
    },
    formatSendTime(dateStr) {
      return this.$moment(dateStr).format('MMM D, h:mm A');
    },
  },
};
</script>

<style scoped>
.message {
  border-bottom: 1px solid #f4f2fb;
}
.message-overview {
  margin-top: 16px;
  padding: 0;
  height: 150px;
  display: flex;
}
.message:last-of-type {
  border-bottom: none;
}
.overview-column {
  display: flex;
  align-items: center;
}
div.overview-column:first-of-type {
  width: 30%;
}
.overview-column.stat {
  width: 15%;
}
.overview-column.stat {
  padding: 0;
  position: relative;
  justify-content: center;
}
.overview-column.stat.open {
  border-radius: 0;
  border: 1px solid #f4f2fb;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
.overview-column.stat.open:after {
  position: absolute;
  content: '';
  width: 100%;
  bottom: -2px;
  left: 0;
  border-bottom: 4px solid #fff;
  z-index: 1;
}
.overview-column.open.delivered {
  border-top: 4px solid #004B8D;
}
.overview-column.open.opened {
  border-top: 4px solid #3AB5B5;
}
.overview-column.open.clicked {
  border-top: 4px solid #009DDB;
}
.message h3 {
  font-family: 'Neue Haas Grotesk Disp W05_65M';
  margin-bottom: 8px;
  position: relative;
}
.message-status {
  position: absolute;
  left: -16px;
  top: 50%;
  transform: translateY(-50%);
  display: inline-block;
  vertical-align: middle;
  height: 4px;
  width: 4px;
  border-radius: 50%;
  background: #d45067;
}
.message-status.approved {
  background: #29C682;
}
.message .send-time {
  margin-bottom: 16px;
  text-transform: uppercase;
}
.message .dashes {
  position: relative;
  text-align: center;
}
.message .dashes img {
  vertical-align: middle;
}
.message:hover .message-tooltip {
  display: block;
}
.message-tooltip,
.message-tooltip:after,
.message-tooltip:before {
  background: #000;
}
.message-tooltip {
  display: none;
  position: absolute;
  left: 50%;
  top: 75%;
  transform: translate(-50%, -75%);
  color: #fff;
  font-size: 12px;
  border-radius: 4px;
  padding: 4px;
  width: 275px;
}
.message-tooltip:after {
  content: '';
  position: absolute;
  width: 12px;
  height: 12px;
  transform: translateX(-50%) rotate(45deg);
  top: -2px;
  left: 50%;
  z-index: -1;
}
.message-tooltip:before {
  content: '';
  position: absolute;
  height: 16px;
  width: 30px;
  top: 0;
  left: 50%;
  z-index: -1;
}
.c100.center {
  margin-bottom: 16px;
}
.c100 + p {
  text-align: center;
}
.overview-right {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 25%;
}
.overview-right button {
  margin-right: 8px;
}
.overview-right button:last-of-type {
  margin-right: 0;
}
.overview-right button.expanded {
  transform: rotate(90deg);
}
.message-expanded {
  padding-bottom: 24px;
}
.expanded-column {
  vertical-align: top;
  width: 70%;
  display: inline-block;
}
.expanded-column:first-of-type {
  width: 30%;
}
.expanded-column:last-of-type {
  padding: 24px;
  border-radius: 4px;
  border: 1px solid #f4f2fb;
  border-top-left-radius: 4px;
}
.expanded-column.delivered {
  border-bottom: 4px solid #004B8D;
  border-top-left-radius: 0;
}
.expanded-column.opened {
  border-bottom: 4px solid #3AB5B5;
}
.expanded-column.clicked {
  border-bottom: 4px solid #009DDB;
}
.expanded-column .metrics {
  max-width: 250px;
}
.expanded-column .metric {
  overflow: hidden;
  padding: 32px;
  position: relative;
  border: 1px solid #f4f2fb;
  border-radius: 4px;
  margin-bottom: 16px;
}
.expanded-column .metric h4 {
  text-transform: uppercase;
  font-size: 12px;
  font-family: 'Neue Haas Grotesk Disp W05_65M';
  letter-spacing: 1px;
  margin-bottom: 8px;
}
.expanded-column .metric p {
  color: #333;
  font-size: 48px;
  font-family: 'Neue Haas Grotesk Disp W05_75B';
}
.expanded-column .metric img {
  position: absolute;
  right: -1px;
  bottom: 0;
}
.chart-title {
  text-transform: uppercase;
  font-family: 'Neue Haas Grotesk Disp W05_65M';
  font-size: 12px;
  letter-spacing: 1px;
  margin: 16px 0;
}
.doughnut {
  display: flex;
  align-items: center;
  justify-content: center;
}
.doughnut .chart-container {
  width: 50%;
  max-width: 300px;
  margin-right: 48px;
}
.legend p {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  font-size: 14px;
}
.legend p span {
  display: inline-block;
  height: 16px;
  width: 16px;
  border-radius: 2px;
  margin-right: 8px;
}
.legend p span.delivered {
  background: #004B8D;
}
.legend p span.bounced {
  background:#009DDC;
}
.legend p span.dropped {
  background: #333333;
}
.legend p span.deferred {
  background: #F27366;
}
</style>
