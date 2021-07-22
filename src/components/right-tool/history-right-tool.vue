<template>
  <div style="width: 100%;">
    <!-- 模拟年份 -->
    <collapse-normal :title="collapseTitle1" :icon="collapseIcon1">
      <template slot="content">
        <div>
          <div class="secenario-parameter-setting__div--content x">
            <!-- 年份标识 -->
            <div>模拟年份</div>
            <!-- 年份选择 -->
            <div class="margin-right10">
              <el-select v-model="selectData.year" placeholder="请选择" size="mini">
                <el-option
                  v-for="item in yearOptions.data"
                  :key="item.id"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
        </div>
        <div>
          <div class="secenario-parameter-setting__div--content x">
            <!-- 年份标识 -->
            <div>模拟地区</div>
            <!-- 年份选择 -->
            <div class="margin-right10">
              <el-select v-model="selectData.region" placeholder="请选择" size="mini">
                <el-option
                  v-for="item in regionOptions.data"
                  :key="item.id"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
        </div>
        <div>
          <div class="secenario-parameter-setting__div--content x">
            <div>时间</div>
            <div class="checkbox-group--style">
              <!-- <el-checkbox-group v-model="selectData.monthAndHour">
                <el-checkbox label="月份"></el-checkbox>
                <el-checkbox label="小时"></el-checkbox>
              </el-checkbox-group> -->
              <el-radio v-model="selectData.monthAndHour" label="1">月份</el-radio>
              <el-radio v-model="selectData.monthAndHour" label="2">小时</el-radio>
            </div>
          </div>
        </div>

        <!-- <div>
        <div class="secenario-parameter-setting__div--content x">
          <div class="margin-right10">
               <el-button type="primary" icon="el-icon-search" size="mini" plain>结果导出</el-button>
          </div>
        </div>
      </div> -->
      </template>
    </collapse-normal>
    <!-- 查询条件 -->
    <collapse-normal :title="collapseTitle2" :icon="collapseIcon2">
      <template slot="content">
        <div>
          <div class="secenario-parameter-setting__div--content x">
            <!-- 年份标识 -->
            <div>查询方法</div>
            <!-- 年份选择 -->
            <div class="margin-right10">
              <el-select v-model="selectData.queryBy" placeholder="请选择" size="mini">
                <el-option
                  v-for="item in moduleOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
        </div>
        <div v-if="showCarType">
          <div class="secenario-parameter-setting__div--content x">
            <!-- 年份标识 -->
            <div>车辆类型</div>
            <!-- 年份选择 -->
            <div class="margin-right10">
              <el-select v-model="selectData.carType" placeholder="请选择" size="mini">
                <el-option
                  v-for="item in carTypeOptions"
                  :key="item.id"
                  :label="item.label"
                  :value="item.id"
                />
              </el-select>
            </div>
          </div>
        </div>
        <div v-if="showCarType">
          <div class="secenario-parameter-setting__div--content x">
            <!-- 年份标识 -->
            <div>燃料类型</div>
            <!-- 年份选择 -->
            <div class="margin-right10">
              <el-select v-model="selectData.fuel" placeholder="请选择" size="mini">
                <el-option
                  v-for="item in fuelOptions"
                  :key="item.id"
                  :label="item.label"
                  :value="item.id"
                />
              </el-select>
            </div>
          </div>
        </div>
      </template>
    </collapse-normal>
    <!-- 选择污染物 -->
    <!-- <collapse-tree
      :title="collapseTitle3"
      :icon="regionOptions.icon"
      :treeData="regionOptions.data"
    ></collapse-tree> -->

    <div class="right-tool__button--query">
      <el-button
        type="primary"
        icon="el-icon-search"
        size="mini"
        plain
        @click="doQuery"
      >查询</el-button>
    </div>
  </div>
</template>

<script>
import secenarioParameterSetting from '@/components/second-step/secenario-parameter-setting.vue'
import collapseNormal from '@/components/collapse/collapse-normal.vue'
import CollapseTree from '@/components/collapse/collapse-tree.vue'
import config from '@/api/constapi'
import yearJson from '@/assets/dataJson/year-show-json.json'
import regionJson from '@/assets/dataJson/region-show-json.json'
import carJson from '@/assets/dataJson/car-show-json.json'
import fuelJson from '@/assets/dataJson/fuel-show-json.json'

export default {
  name: 'RightTool',
  components: {
    collapseNormal,
    secenarioParameterSetting,
    CollapseTree
  },
  data() {
    return {
      // showCarType:false,
      selectData: {
        queryBy: '',
        year: '',
        region: '',
        monthAndHour: '',
        carType: '小型客车',
        fuel: '汽油'
      },
      collapseTitle1: '模拟年份',
      secenarioTitle2: '模拟地区',
      collapseTitle2: '计算类型',
      collapseTitle3: '选择污染物',
      collapseIcon1: 'icon-year',
      collapseIcon2: 'icon-biaozhunguanli',
      secenarioTitle: '计算方法',
      // 时间多选列表
      timeCheckList: [],
      // 年份
      yearOptions: {
        title: '年份',
        icon: 'icon-year',
        data: []
      },
      // 地区选择
      regionOptions: {
        title: '城市',
        icon: 'icon-map-marker',
        data: []
      },
      // 模式选择
      moduleOptions: config.queryMethod,
      carTypeOptions: carJson.data[0].children,
      fuelOptions: fuelJson.data[0].children
      // 选择污染物
    }
  },
  computed: {
    showCarType: function() {
      if (this.selectData.queryBy === '基于排放标准') {
        // if (!this.selectData.carType || this.selectData.carType.length ==0)
        //   this.selectData.carType = "小型客车";
        // if(!this.selectData.fuel　|| this.selectData.fuel.length ==0)
        //   this.selectData.fuel = '汽油';
        return true
      } else return false
    }
  },
  mounted() {
    // alert(config.years)
    this.yearOptions.data = this.$store.state.newCreate.firstStepData.year
    this.yearOptions.data = this.yearOptions.data.map(item => {
      return {
        value: item,
        label: item
      }
    })
    this.regionOptions.data = this.$store.state.newCreate.firstStepData.region
    this.regionOptions.data = this.regionOptions.data.map(item => {
      return {
        value: item,
        label: item
      }
    })
  },
  methods: {
    doQuery() {
      this.$emit('doQuery', this.selectData)
    }
  }
}
</script>
<style>
@import "../../assets/style/global.css";
@import "../../assets/style/seconario-parameter-setting.css";
.export-button {
  margin-top: 10px;
  margin-left: 32.5%;
}
.history-checkbox__div--content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  margin-left: 10px;
}
.history-checkbox__div--content > div {
  text-align: center;
  font-family: "Microsoft YaHei";
  font-size: 14px;
  margin-right: 26px;
}
.checkbox-group--style {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.right-tool__button--query {
  position: absolute;
  bottom: 4%;
  left: 40%;
  background-color: #eff0f3;
}
</style>
