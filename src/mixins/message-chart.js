export default {
  props: ['chart-data', 'options'],
  watch: {
    chartData: {
      deep: true,
      handler() {
        this.render();
      },
    },
  },
  mounted() {
    this.render();
  },
  methods: {
    render() {
      this.renderChart(this.chartData, this.options);
    },
  },
};
