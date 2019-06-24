<script>
import { Bar } from 'vue-chartjs';
import { getMonthDay } from '@/helpers';

export default {
  extends: Bar,
  props: {
    data: {
      default: () => [],
      type: Array,
    },
    label: {
      default: 'Chart',
      type: String,
    },
  },
  methods: {
      getMonthDay
  },
  mounted() {
    const chart = this;
    this.renderChart({
      labels: this.getMonthDay(),
      datasets: [
        {
          label: chart.label,
          borderColor: '#F37366',
          backgroundColor: '#F37366',
          data: chart.data,
        },
      ],
    },
    {
      scaleBeginAtZero: true,
      responsive: true,
      maintainAspectRatio: false,
    });
  },
};
</script>
