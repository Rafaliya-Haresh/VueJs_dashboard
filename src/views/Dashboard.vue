<template>
  <div class="dashboard">
    <div class="container">
      <Breadcrumbs :crumbs="[
        { name: 'Dashboard', link: '/dashboard' }]"/>
      <PageHeading title="Dashboard">
        <template slot="welcome-text">
          <h6 class="welcome-text">Hi, {{ userName }}! Welcome to your Dashboard.</h6>
        </template>
      </PageHeading>
      <div class="cards-container">
        <StatusCard
          icon="total-video-icon"
          v-bind:number="18"
          text="Total Videos"
        />
        <StatusCard
          icon="total-contacts-icon"
          v-bind:number="445"
          text="Total Contacts"
        />
        <StatusCard
          icon="total-advocate-icon"
          v-bind:number="1201"
          text="Total Advocate Shares"
        />
      </div>
      <InfoCard title="Video Sent by Month" color="video-color">
        <template v-slot:chart class="chart-container">
          <LineChart
            v-bind:data="videoData"
            label="Sent Videos"
            color="video-color"
            :styles="mapStyles"
          />
        </template>
        <template v-slot:list>
          <ListCard
            v-bind:data="videoListData"
            title="Video Summary"
            color="video-color"
            icon="video-summary-icon"
          />
        </template>
      </InfoCard>
      <InfoCard title="Emails Delivered by Month" color="email-color">
        <template v-slot:chart class="chart-container">
          <BarChart
            v-bind:data="emailData"
            label="Email Delivered"
            color="email-color"
            :styles="mapStyles"
          />
        </template>
        <template v-slot:list>
          <ListCard
            v-bind:data="emailListData"
            title="Campaign Summary"
            color="email-color"
            icon="campaign-summary-icon"
          />
        </template>
      </InfoCard>
      <InfoCard title="Advocate Shares by Month" color="adv-color">
        <template v-slot:chart class="chart-container">
          <LineChart
            v-bind:data="advocateData"
            label="Advocate Shares"
            color="adv-color"
            :styles="mapStyles"
          />
        </template>
        <template v-slot:list>
          <ListCard
            v-bind:data="advocateListData"
            title="Advocacy Share Summary"
            color="adv-color"
            icon="advocacy-share-summary-icon"
          />
        </template>
      </InfoCard>
      <InfoCard title="People by Month" color="video-color">
        <template v-slot:chart class="chart-container">
          <AreaChart v-bind:data="peopleData" color="video-color" :styles="mapStyles"/>
        </template>
        <template v-slot:list>
          <ListCard
            v-bind:data="peopleListData"
            title="People Summary"
            color="people-color"
            icon="people-summary-icon"
          />
        </template>
      </InfoCard>
    </div>
  </div>
</template>


<script>
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import PageHeading from '@/components/PageHeading.vue';
import InfoCard from '@/components/dashboard/InfoCard.vue';
import ListCard from '@/components/dashboard/ListCard.vue';
import StatusCard from '@/components/common/StatusCard.vue';
import LineChart from '@/components/common/charts/LineChart.vue';
import BarChart from '@/components/common/charts/BarChart.vue';
import AreaChart from '@/components/common/charts/AreaChart.vue';

export default {
  name: 'Dashboard',
  components: {
    Breadcrumbs,
    PageHeading,
    InfoCard,
    ListCard,
    StatusCard,
    LineChart,
    BarChart,
    AreaChart,
  },
  data() {
    return {
      userName: 'John',
      mapStyles: {
        height: '400px',
        width: '100%',
        position: 'relative',
      },
      videoData: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11],
      emailData: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11],
      advocateData: [60, 70, 12, 23, 10, 40, 39, 20, 10, 20, 12, 11],
      peopleData: [
        {
          label: 'Without Tag',
          data: [0, 0, 0, 5, 0, 0, 0, 5, 0, 0, 0, 0],
          backgroundColor:['#0E315C'],
        },
        {
          label: 'Opted Out',
          data: [0, 0, 10, 0, 30, 10, 7, 0, 0, 0, 0, 7],
          backgroundColor: ['#99D8F1'],
        },
        {
          label: 'Total People',
          data: [0, 10, 10, 20, 5, 50, 50, 70, 30, 10, 20,40],
          backgroundColor: ['#009DDD'],
        },
      ],
      videoListData: [{
        text: 'Draft Videos',
        number: 15,
      },
      {
        text: 'Scheduled Videos',
        number: 8,
      },
      {
        text: 'Sent Videos',
        number: 260,
      },
      {
        link: '/',
        text: 'View Detailed Analytics',
      }],
      emailListData: [{
        text: 'Active Campaigns',
        number: 15,
      },
      {
        text: 'Draft Campaigns',
        number: 8,
      },
      {
        text: 'Complete Campaigns',
        number: 10,
      },
      {
        text: 'Inactive Campaigns',
        number: 10,
      },
      {
        link: '/',
        text: 'View Detailed Analytics',
      }],
      advocateListData: [{
        text: 'Facebook',
        number: 15,
      },
      {
        text: 'Instagram',
        number: 8,
      },
      {
        text: 'Twitter',
        number: 10,
      },
      {
        text: 'LinkedIn',
        number: 10,
      },
      {
        link: '/',
        text: 'View Detailed Analytics',
      }],
      peopleListData: [{
        text: 'Total People',
        number: 280,
      },
      {
        text: 'Opted Out',
        number: 10,
      },
      {
        text: 'Without Tag',
        number: 70,
      },
      {
        link: '/',
        text: 'View Detailed Analytics',
      }],
    };
  },
  computed: {},
  created() {},
};
</script>

<style scoped>
.cards-container {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 35px;
  width: calc(75% - 15px);
}
.chart-container {
  width: 100%;
}
.welcome-text {
  color: #898989;
}
</style>
