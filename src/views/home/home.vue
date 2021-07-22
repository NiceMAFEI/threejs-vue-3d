<template>
  <div class="main">
    <h1>近几年粮食储存变化图</h1>
    <div class="home" id="home"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  data() {
    return {};
  },
  mounted() {
    this.setEcharts();
  },
  methods: {
    setEcharts() {
      var chartDom = document.getElementById("home");
      console.log("echarts", chartDom);
      var myChart = echarts.init(chartDom);
      var option;
      setTimeout(function () {
        option = {
          legend: {},
          tooltip: {
            trigger: "axis",
            showContent: false,
          },
          dataset: {
            source: [
              ["product", "2012", "2013", "2014", "2015", "2016", "2017"],
              ["小麦", 56.5, 82.1, 88.7, 70.1, 53.4, 85.1],
              ["大麦", 51.1, 51.4, 55.1, 53.3, 73.8, 68.7],
              ["大豆", 40.1, 62.2, 69.5, 36.4, 45.2, 32.5],
              ["小豆", 25.2, 37.1, 41.2, 18, 33.9, 49.1],
            ],
          },
          xAxis: { type: "category" },
          yAxis: { gridIndex: 0 },
          grid: { top: "55%" },
          series: [
            {
              type: "line",
              smooth: true,
              seriesLayoutBy: "row",
              emphasis: { focus: "series" },
            },
            {
              type: "line",
              smooth: true,
              seriesLayoutBy: "row",
              emphasis: { focus: "series" },
            },
            {
              type: "line",
              smooth: true,
              seriesLayoutBy: "row",
              emphasis: { focus: "series" },
            },
            {
              type: "line",
              smooth: true,
              seriesLayoutBy: "row",
              emphasis: { focus: "series" },
            },
            {
              type: "pie",
              id: "pie",
              radius: "30%",
              center: ["50%", "25%"],
              emphasis: { focus: "data" },
              label: {
                formatter: "{b}: {@2012} ({d}%)",
              },
              encode: {
                itemName: "product",
                value: "2012",
                tooltip: "2012",
              },
            },
          ],
        };
        myChart.on("updateAxisPointer", function (event) {
          var xAxisInfo = event.axesInfo[0];
          if (xAxisInfo) {
            var dimension = xAxisInfo.value + 1;
            myChart.setOption({
              series: {
                id: "pie",
                label: {
                  formatter: "{b}: {@[" + dimension + "]} ({d}%)",
                },
                encode: {
                  value: dimension,
                  tooltip: dimension,
                },
              },
            });
          }
        });
        myChart.setOption(option);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  flex-flow: row wrap;
  h1 {
    text-align: center;
    width: 100%;
    padding-top: 24px;
    padding-bottom: 24px;
  }
  .home {
    width: 100%;
    height: 700px;
  }
}
</style>
