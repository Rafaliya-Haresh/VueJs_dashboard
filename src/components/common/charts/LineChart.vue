<script>
import { Line } from 'vue-chartjs';
import { getMonthDay } from '@/helpers';

export default {
  extends: Line,
  props: {
    data: {
      default: () => [],
      type: Array,
    },
    label: {
      default: 'Chart',
      type: String,
    }
  },
  methods: {
      getMonthDay
  },
  mounted() {
    const chart = this;
    this.renderChart(
      {
        labels: this.getMonthDay(),
        datasets: [{
          label: chart.label,
          borderColor: '#5624BB',
          showLines: true,
          fill: false,
          lineTension: 0,
          pointStyle: 'circle',
          radius: 5,
          pointBackgroundColor: 'white', // wite point fill
          pointBorderWidth: 3, // point border width
          data: chart.data,
        }],
      },
      {
        scaleBeginAtZero: true,
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
              },
              ticks: {
                fontFamily: 'Neue Haas Grotesk Disp W05_55R',
                fontColor: '#000',
                beginAtZero: true,
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                color: '#f4f2fb',
                zeroLineColor: '#f4f2fb',
              },
              ticks: {
                fontFamily: 'Neue Haas Grotesk Disp W05_55R',
                fontColor: '#000',
                beginAtZero: true,
              },
            },
          ],
        },
      },
    );
  },
};
</script>
