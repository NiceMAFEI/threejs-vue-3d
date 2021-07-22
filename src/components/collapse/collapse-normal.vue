<template>
  <el-collapse class="second-step__el-collapse--collapse" v-model="activeName">
    <el-collapse-item name="1">
      <template slot="title">
        <i class="iconfont icon-style template-position" :class="icon"></i>
        <span class="template__span--style">{{ title }}</span>
      </template>
      <slot name="content"></slot>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
export default {
  name: "collapseNormal",
  props: {
    // 折叠面板标题文字
    title: "",
    // 折叠面板图标
    icon: "",
  },
  data() {
    return {
      activeName:['1']
    };
  },
};
</script>

<style>
@import "../../assets/style/second-step.css";
.icon-style {
  font-size: 20px;
}
.template-position {
  margin: 1px 5px 0px 10px;
}
.template__span--style {
  font-family: "PingFang SC";
  font-size: 14px;
  font-weight: bold;
}
</style>