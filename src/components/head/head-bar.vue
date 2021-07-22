<template>
  <div class="flex-row-nowrap head-bar__div--content">
    <div
      class="head-bar__div--item first-dead"
      :class="{ 'item__div--first-step': isActive && this.$store.state.newCreate.isCreateForm === 1 }"
      @click="clickStep(1)"
    >
      <span>
        <i class="iconfont icon-style icon-auto span-icon-style"></i
      ></span>
      模拟情景设置
    </div>
    <div
      class="head-bar__div--item second-dead"
      :class="{ 'second-active': isActive && this.$store.state.newCreate.isCreateForm === 2}"
      @click="clickStep(2)"
    >
      <span>
        <i class="iconfont icon-style icon-auto span-icon-style"></i
      ></span>
      模拟参数设置
    </div>
    <div
      class="head-bar__div--item second-dead"
      :class="{ 'second-active': isActive && this.$store.state.newCreate.isCreateForm === 3}"
      @click="clickStep(3)"
    >
      <span>
        <i class="iconfont icon-style icon-auto span-icon-style"></i
      ></span>
      排放因子计算结果
    </div>
    <div
      class="head-bar__div--item fourth-dead"
      :class="{ 'fourth-active': isActive && this.$store.state.newCreate.isCreateForm === 4}"
      @click="clickStep(4)"
    >
      <span>
        <i class="iconfont icon-style icon-auto span-icon-style"></i
      ></span>
      排放计算结果
    </div>
  </div>
</template>

<script>
export default {
  name: "headBar",
  data() {
    return {
      isActive: true,
    };
  },
  methods: {
    clickStep(num) {
      this.isActive = true;
      this.$store.commit("newCreate/setIsCreateForm", num);
    },
  },
};
</script>

<style>
@import "../../assets/style/global.css";
.head-bar__div--content {
  width: 100%;
  height: 100%;
}
.head-bar__div--item {
  flex: 1;
  margin-right: 10px;
  cursor: pointer;
  text-align: center;
  line-height: 36px;
  color: #fff;
}
.span-icon-style {
  line-height: 39px;
}

.first-dead {
  color: black;
  background: url(../../assets/images/head-bar/first-dead-bgc.png) no-repeat;
}

.item__div--first-step {
  color: #fff;
  background: url(../../assets/images/head-bar/first-active-bgc.png) no-repeat;
}
.second-dead {
  color: black;
  background: url(../../assets/images/head-bar/second-dead-bgc.png) no-repeat;
}
.second-active {
  color: #fff;
  background: url(../../assets/images/head-bar/second-active-bgc.png) no-repeat;
}
.fourth-dead {
  color: black;
  background: url(../../assets/images/head-bar/last-dead-bgc.png) no-repeat;
}
.fourth-active {
  color: #fff;
  background: url(../../assets/images/head-bar/last-active-bgc.png) no-repeat;
}
</style>