<template>
  <div class="echarts-pie__div--content">
    <span class="echarts-pie__span--title">{{titleShow}}</span>
    <div :id="echartsId" style="width: 100%; height: 100%"></div>
  </div>
</template>

<script>
export default {
  name: "echartsPie",
  props: {
    data: {
      type: Array,
      default() {
        return [];
      },
    },
    titleShow: {
      type: String,
      default() {
        return ''
      },
    }
  },
  data() {
    return {
      echartsId: "",
      echartsLegendTitle: [],
    };
  },
  mounted() {
    this.getUuid();
    this.setEcharts(this.echartsId, this.$props.data);
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
    setEcharts(str, data) {
      let legendData = data.map((item) => {
        return item.name;
      })
      const option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: legendData,
        },
        series: [
          {
            name: "CO污染物",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      // 延时建立echarts图
      setTimeout(() => {
        let dom = document.getElementById(str);
        dom.style.width = window.innerWidth * 0.32 + "px";
        dom.style.height = window.innerHeight * 0.26 + "px";
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
.echarts-pie__div--content {
  position: relative;
}

.echarts-pie__span--title {
  position: absolute;
  top: 35px;
  left: 50%;
  font-family: "Microsoft YaHei";
  font-weight: 500;
}
</style>