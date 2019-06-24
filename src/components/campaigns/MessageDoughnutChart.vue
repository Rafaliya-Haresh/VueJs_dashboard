<script>
import { Doughnut } from 'vue-chartjs';
import messageChart from '@/mixins/message-chart';

export default {
  extends: Doughnut,
  mixins: [messageChart],
};
</script>
