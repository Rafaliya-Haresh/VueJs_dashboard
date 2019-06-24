<template>
  <div class="campaign">
    <div class="info">
      <div>
        <h3 class="strong">{{ campaign.name }}</h3>
        <div class="counts">
          <span class="message-count"><span>{{ campaign.message_count }}</span>
          message{{ campaign.message_count === 1 ? '' : 's' }}</span>
          <span>{{ campaign.recipient_count }}
            recipient{{ (campaign.recipient_count === 1) ? '' : 's' }}</span>
        </div>
      </div>
      <p
        v-if="campaign.message_dates.length"
        class="dates">
        <span
          v-for="(month, idx) in Object.keys(dates)"
          :key="idx"
          class="date">
          <span class="month">{{ month }}</span>
          <span
            v-for="(day, didx) in dates[month]"
            :key="didx"
            class="day">
            {{ day }}
          </span>
        </span>
      </p>
      <p
        v-else
        class="dates">No dates to display</p>
    </div>
    <div class="analytics">
      <div class="analytics-section">
        <template v-if="campaign.status !== 'draft'">
          <h4>Progress</h4>
          <div>
            <div class="blue progress-bar">
              <div
                :style="{ width: `${campaign.sent_messages.rate * 100}%` }"
                class="progress"/>
            </div>
            <p>{{ campaign.sent_messages.count }} out of {{ campaign.message_count }} sent</p>
          </div>
        </template>
      </div>
      <div class="analytics-section">
        <h4>Approved</h4>
        <div>
          <div class="green progress-bar">
            <div
              :style="{ width: `${campaign.approved_messages.rate * 100}%` }"
              class="progress"/>
          </div>
          <p>{{ campaign.approved_messages.count }} out
            of {{ campaign.message_count }} approved</p>
        </div>
      </div>
      <div class="analytics-section">
        <template v-if="campaign.status !== 'draft'">
          <h4>Click-Through Rate</h4>
          <div>
            <div class="strong ctr">
              {{ formatPercentage(campaign.analytics.rates.click_through * 100) }}%
            </div>
            <p>{{ campaign.analytics.counts.clicked }} out
              of {{ campaign.analytics.counts.opened }} emails</p>
          </div>
        </template>
      </div>
    </div>
    <router-link :to="`/campaigns/${campaign.id}`">
      <img
        src="@/assets/icons/link-arrow.svg"
        alt="Campaign details">
    </router-link>
  </div>
</template>

<script>
import { formatPercentage } from '@/helpers';

export default {
  name: 'Campaign',
  props: {
    campaign: {
      default: () => ({}),
      type: Object,
    },
  },
  data() {
    return {
      formatPercentage,
    };
  },
  computed: {
    dates() {
      const dates = {};
      this.campaign.message_dates.forEach((date) => {
        const month = this.$moment(date).format('MMM');
        const day = this.$moment(date).date();
        if (dates[month]) {
          if (!dates[month].includes(day)) {
            dates[month].push(day);
          }
        } else {
          dates[month] = [day];
        }
      });
      return dates;
    },
  },
};
</script>

<style lang="scss" scoped>
.campaign {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #f4f2fb;
  border-radius: 4px;
  padding: 32px 48px;
  min-height: 100px;
  margin-bottom: 16px;
}
.info h3,
.analytics-section .progress-bar,
.analytics-section .ctr {
  margin-bottom: 12px;
}
.analytics-section {
  width: 30%;
  margin-right: 16px;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.info {
  font-size: 14px;
  width: 20%;
}
.info h3 {
  font-size: 20px;
}
.info .message-count {
  margin-right: 16px;
  color: #8d8d8d;
}
.info .message-count span {
  display: inline-block;
  padding: 2px;
  color: #000;
  font-family: 'Neue Haas Grotesk Disp W05_75B';
  border-bottom: 2px solid #f07365;
}
.dates {
  margin-top: 16px;
}
.date {
  font-size: 12px;
  margin-right: 16px;
  margin-bottom: 8px;
  display: inline-block;
}
.month {
  font-family: 'Neue Haas Grotesk Disp W05_65M';
  text-transform: uppercase;
  margin-right: 4px;
}
.day {
  color: #8d8d8d;
  margin-right: 4px;
}
.analytics {
  width: 60%;
  display: flex;
  align-items: center;
}
.analytics-section h4 {
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 1px;
  font-family: 'Neue Haas Grotesk Disp W05_65M';
}
.analytics-section .progress-bar,
.analytics-section .progress-bar .progress {
  height: 6px;
  border-radius: 50px;
}
.analytics-section .progress-bar {
  position: relative;
  width: 100%;
  max-width: 200px;
  .progress {
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
  }
  &.blue {
    background: #94b1d0;
    .progress {
      background: #2962a2;
    }
  }
  &.green {
    background: #b0e1e0;
    .progress {
      background: #3ab5b5;
    }
  }
}
.analytics-section .ctr {
  font-size: 28px;
  color: #19a3d7;
}
</style>
