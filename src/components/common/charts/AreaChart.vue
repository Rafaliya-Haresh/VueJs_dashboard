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
    },
  },
  data() {
    return ({
      defaultDatasetOptions: {
        fill: true,
        lineTension: 0,
        radius:0,
        labels:{
          fontSize:100,
        },
        data: [],
      },
    });
  },
  methods: {
    getDatasets(data) {
      return (data.map((set) => Object.assign({}, this.defaultDatasetOptions, set)));
    },
    getMonthDay
  },
  mounted() {
    const chart = this;
    this.renderChart(
      {
        labels: this.getMonthDay(),
        datasets: chart.getDatasets(chart.data),
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
