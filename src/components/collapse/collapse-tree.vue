<template>
    <collapse-normal :title="title" :icon="icon">
      <template slot="content">
        <tree
          :menuPermission="treeData"
          @setTreeData="setCollapseTreeData"
        ></tree
      ></template>
    </collapse-normal>
</template>

<script>
import collapseNormal from "@/components/collapse/collapse-normal.vue";
import tree from "@/components/tree/tree.vue";
export default {
  name: "collapse-tree",
  props: {
    // 折叠面板带tree的数据
    treeData: {
      type: Array,
      default() {
        return [];
      },
    },
    // 标题
    title: {
      type: String,
      default() {
        return "";
      },
    },
    // 图标
    icon: {
      type: String,
      default() {
        return "";
      },
    },
  },
  components: {
    tree,
    collapseNormal,
  },
  data() {
    return {};
  },
  methods: {
    /**
     * 建立树型选择框的回调数据
     * @param { Array } data1; 选中的数据，label数组
     * @param { Array } data2; 选中的数据, id数组
     */
    setCollapseTreeData(data1) {
      console.log(data1);
      console.log('this.$props.title');
      console.log(this.$props.title);
      this.$emit("setCollapseData", data1, this.$props.title);
    },
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