import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from './views/Dashboard.vue';
import People from './views/People.vue';
import Import from './views/Import.vue';
import Campaigns from './views/Campaigns.vue';
import CampaignDetails from './views/CampaignDetails.vue';
import ViewRecipients from './views/ViewRecipients.vue';
import AddRecipients from './views/AddRecipients.vue';
import Videos from './views/Videos.vue';
import NewVideo from './views/NewVideo.vue';
import VideoDetails from './views/VideoDetails.vue';
import Details from './components/videos/Details.vue';
import Analytics from './components/videos/Analytics.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      beforeEnter(to, from, next) {
        next('/dashboard');
      },
    },
    {
      path: '/dashboard',
      component: Dashboard,
    },
    {
      path: '/people',
      component: People,
    },
    {
      path: '/people/import',
      component: Import,
    },
    {
      path: '/campaigns',
      component: Campaigns,
    },
    {
      path: '/campaigns/:id',
      component: CampaignDetails,
    },
    {
      path: '/campaigns/:id/recipients/view',
      component: ViewRecipients,
    },
    {
      path: '/campaigns/:id/recipients/add',
      component: AddRecipients,
    },
    {
      path: '/videos',
      component: Videos,
    },
    {
      path: '/videos/new',
      component: NewVideo,
    },
    {
      path: '/videos/:id',
      component: VideoDetails,
      children: [
        {
          path: '',
          component: Details,
        },
        {
          path: '/videos/:id/analytics',
          component: Analytics,
        },
      ],
    },
  ],
});
