<template>
  <div class="tree-select" v-if="$store.getters.getTreeSelectShow">
    <div class="tree-select__close--button" @click="closeTreeSelect()"></div>
    <el-form>
      <el-table
        :row-class-name="tableRowClassName"
        height="518"
        :data="tableData"
        style="width: 300px"
        row-key="id"
        default-expand-all
        :stripe="true"
        :border="true"
      >
        <el-table-column prop="name" :label="showLable" width="299">
          <template slot-scope="scope">
            <el-checkbox
              label="scope.row.date"
              v-model="scope.row.checked"
              @change="checkChange(scope)"
              >{{ scope.row.name }}</el-checkbox
            >
          </template>
        </el-table-column>
      </el-table>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "treeSelect",
  props: {
    tableData: Array,
    showLable: String,
  },
  data() {
    return {
      isShow: this.$store.treeSelectShow,
    };
  },
  methods: {
    // 扫描 table 数据，处理父级选中状态
    scan(obj, row) {
      var flag = true; // 父节点直属所有子节点都选中时值为 true ，反之为 false
      for (var i = 0; i < obj.length; i++) {
        // 如果当前行为点击行且为不选中状态，返回 false
        if (row.id === obj[i].id && !row.checked) {
          return false;
        }
        if (!obj[i].checked) {
          // 所有子节点都选中，父级选中
          if (
            obj[i].hasOwnProperty("children") &&
            this.scan(obj[i].children, row)
          ) {
            obj[i].checked = true;
          } else {
            flag = false;
          }
        } else {
          // 子节点存在未选中，父级不选中
          if (
            obj[i].hasOwnProperty("children") &&
            !this.scan(obj[i].children, row)
          ) {
            flag = false;
            obj[i].checked = false;
            return flag;
          }
        }
      }
      return flag;
    },
    checkChange(scope) {
      if (scope.row.hasOwnProperty("children")) {
        this.handleCheckAll(scope.row, scope.row.checked);
      }

      this.scan(this.tableData);
    },
    handleCheckAll(row, checked) {
      row.checked = checked;
      if (row.hasOwnProperty("children")) {
        let that = this;
        row.children.forEach((element, i) => {
          that.handleCheckAll(row.children[i], checked);
        });
      }
    },
    // 关闭组件
    closeTreeSelect() {
      this.$store.commit("newCreate/setTreeSelect", false);
    },
    // 颜色
    tableRowClassName() {
      return "success-row";
    },
  },
};
</script>
<style>
@import "../../assets/style/tree-select.css";
.el-table .success-row {
  background: #f2f6fc;
}
</style>
