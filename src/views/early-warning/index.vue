<template>
  <div class="main">
    <h2>险情预警</h2>
    <div class="bottom">
      <el-carousel trigger="click" height="200px">
        <el-carousel-item v-for="item in info" :key="item">
          <h2>当前指标：</h2>
          <h3>{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 右侧 -->
    <div class="right-float">
      <h3 v-for="(item, index) in zhiBiaoInfo" :key="index">指标1：</h3>
    </div>
    <!-- 底部 -->
    <div class="block" id="bottom"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "Early",
  data() {
    return {
      info: ["干燥度：xxx", "湿度: xxx", "空气质量: xxx", "室内温度： xxx"],
      zhiBiaoInfo: [
        "指标一： xxxxx",
        "指标二： xxxxx",
        "指标三： xxxxx",
        "指标四： xxxxx",
        "指标五： xxxxx",
        "指标六： xxxxx",
        "指标七： xxxxx",
        "指标八： xxxxx",
      ],
    };
  },
  mounted() {
    this.setEcharts();
  },
  methods: {
    setEcharts() {
      var chartDom = document.getElementById("bottom");
      var myChart = echarts.init(chartDom);
      var option;

      // Generate data
      var category = [];
      var dottedBase = +new Date();
      var lineData = [];
      var barData = [];

      for (var i = 0; i < 20; i++) {
        var date = new Date((dottedBase += 3600 * 24 * 1000));
        category.push(
          [date.getFullYear(), date.getMonth() + 1, date.getDate()].join("-")
        );
        var b = Math.random() * 200;
        var d = Math.random() * 200;
        barData.push(b);
        lineData.push(d + b);
      }

      // option
      option = {
        backgroundColor: "#0f375f",
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          data: ["温度", "湿度"],
          textStyle: {
            color: "#ccc",
          },
        },
        xAxis: {
          data: category,
          axisLine: {
            lineStyle: {
              color: "#ccc",
            },
          },
        },
        yAxis: {
          splitLine: { show: false },
          axisLine: {
            lineStyle: {
              color: "#ccc",
            },
          },
        },
        series: [
          {
            name: "温度",
            type: "line",
            smooth: true,
            showAllSymbol: true,
            symbol: "emptyCircle",
            symbolSize: 15,
            data: lineData,
          },
          {
            name: "湿度",
            type: "bar",
            barWidth: 10,
            itemStyle: {
              barBorderRadius: 5,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#14c8d4" },
                { offset: 1, color: "#43eec6" },
              ]),
            },
            data: barData,
          },
          {
            name: "参数3",
            type: "bar",
            barGap: "-100%",
            barWidth: 10,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "rgba(20,200,212,0.5)" },
                { offset: 0.2, color: "rgba(20,200,212,0.2)" },
                { offset: 1, color: "rgba(20,200,212,0)" },
              ]),
            },
            z: -12,
            data: lineData,
          },
          {
            name: "参数4",
            type: "pictorialBar",
            symbol: "rect",
            itemStyle: {
              color: "#0f375f",
            },
            symbolRepeat: true,
            symbolSize: [12, 4],
            symbolMargin: 1,
            z: -10,
            data: lineData,
          },
        ],
      };

      myChart.setOption(option);
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  .bottom {
    width: 50%;
    height: 250px;
    position: absolute;
    bottom: 10px;
  }
  .right-float {
    position: absolute;
    display: flex;
    flex-flow: column;
    align-content: space-around;
    top: 0px;
    right: 2px;
    width: 20%;
    height: 850px;
    border: 1px solid aqua;
    h3 {
      padding-left: 10px;
      padding-bottom: 24px;
      color:#475669
    }
  }
  h2 {
    width: 100%;
    text-align: center;
    padding-top: 24px;
  }
  .block {
    width: 50%;
    height: 500px;
    padding-top: 48px;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
}
</style>
