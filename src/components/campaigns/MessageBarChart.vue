<script>
import { Bar } from 'vue-chartjs';
import messageChart from '@/mixins/message-chart';

export default {
  extends: Bar,
  mixins: [messageChart],
};
</script>
