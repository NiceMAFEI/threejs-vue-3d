 <!-- 图表 -->
<template>
  <div class="echarts-bar__div--content">
    <span class="echarts-bar__span--title">{{this.$props.title}}</span>
    <div :id="echartsId"></div>
  </div>
</template>

<script>
export default {
  name: "echartsBar",
  props: {
    //echarts所需要的数据
    data: {
      type: Array,
      default() {
        return [];
      },

    },
    title:"",
    // echarts x轴数据
    xShow: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      echartsId: "",
    };
  },
  mounted() {
    this.getUuid();
    this.setEcharts(this.echartsId);
  },
  methods: {
    /**
     *  获取动态uid
     */
    getUuid() {
      const s = [];
      const hexDigits = "0123456789";
      for (let i = 0; i < 16; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
      }
      const uuid = s.join("");
      this.echartsId = uuid;
    },

    /**
     * 建立echarts图
     * @param { string } str;动态获取到的echartsId
     */
    setEcharts(str) {
      // 数据处理
      // series数据
      let seriesData = this.$props.data.map((item) => {
        return {
          name: item.name,
          type: "bar",
          data: item.data,
        };
      });
      // legend数据
      let legendData = this.$props.data.map((item) => {
        return item.name;
      });
      // option配置
      const option = {
        grid: {
          top: 100,
          left: 100,
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        legend: {
          left: "5%",
          data: legendData,
        },
        xAxis: [
          {
            name: "污染物",
            type: "category",
            show: true,
            data: this.$props.xShow,
          },
        ],
        yAxis: [
          {
            name: "单位: g/km",
            type: "value",
          },
        ],
        series: seriesData,
      };
      // 延时建立echarts图
      setTimeout(() => {
        let dom = document.getElementById(str);
        dom.style.width = window.innerWidth * 0.32 + "px";
        dom.style.height = window.innerHeight * 0.36 + "px";
        // 基于准备好的dom，初始化echarts实例
        const myChart = this.$echarts.init(document.getElementById(str));
        // 配置option
        myChart.setOption(option);
      }, 500);
    },
  },
};
</script>
<style>
.echarts-bar__div--content {
  position: relative;
  width: 100%;
  height: 100%;
}

.echarts-bar__span--title {
  position: absolute;
  top: 45px;
  left: 45%;
  font-family: "Microsoft YaHei";
  font-weight: 500;
}
</style>
