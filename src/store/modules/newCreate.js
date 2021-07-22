const state = {
  // 第一步选择年份等等界面，是否显示
  treeSelectShow: false,
  // 第一步获取的数据
  firstStepData: {},
  // 获取的年份数据
  firstYearData: [],
  // 获取的地区数据
  firstRegionData: [],
  // 月份
  firstMonthData: [],
  // 小时
  firstHourData: [],
  // 页面控制
  isCreateForm: 1
}

const mutations = {
  /**
   * 改变isCreateForm
   * @param { boolean }
   */
  setIsCreateForm: (state, num) => {
    state.isCreateForm = num
  },

  /**
   * @param { boolean } 控制treeSelectShow，true为显示；false为不显示
   */
  setTreeSelect: (state, boolean) => {
    state.treeSelectShow = boolean // 将形参赋值给treeSelectShow
  },

  /**
   * @param { object } 将第一步的表单数据存储到VueX中
   */
  setFirstStepData(state, obj) {
    state.firstStepData = obj // 将形参赋值给firstStepData
  },

  /**
   * @param { Array } arr; 获取到的年份数组
   */
  setFirstYearData(state, arr) {
    state.firstStepData.year = arr // 将形参赋值给firstYearData
  },

  setYearShow(state, arr) {
    state.yearShow = arr
  },
  /**
   * @param { Array } arr; 获取到的地区数组
   */
  setFirstRegionData(state, arr) {
    state.firstStepData.region = arr // 将形参赋值给firstStepData
  },
  /**
   * @param { Array } arr; 获取到的月份数组
   */
  setFirstMonthData(state, arr) {
    state.firstStepData.month = arr // 将形参赋值给firstMonthData
  },
  /**
   * @param { Array } arr; 获取到的小时数组
   */
  setFirstHourData(state, arr) {
    state.firstStepData.hour = arr // 将形参赋值给firstHourData
  }
}
export default {
  namespaced: true,
  state,
  mutations
}
