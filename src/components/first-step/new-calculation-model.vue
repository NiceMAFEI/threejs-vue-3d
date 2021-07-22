<template>
  <!-- 模拟情景设置 -->
  <el-form
    ref="ruleForm"
    :model="ruleForm"
    :rules="rules"
    label-width="200px"
    class="new-calculation__content--form"
  >
    <el-tag type="warning" :hit="true">模拟方案</el-tag>
    <!-- 模拟方案名称 -->
    <el-form-item label="模拟方案名称" prop="name" size="mini">
      <el-input v-model="ruleForm.name" />
    </el-form-item>
    <!-- 模拟年份 -->
    <el-form-item label="模拟年份" prop="year" size="mini">
      <div class="form__select--year-region">
        <el-select v-model="ruleForm.year" multiple placeholder="请选择">
          <el-option
            v-for="item in yearOptions.data"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
    </el-form-item>
    <!-- 模拟月份 -->
    <el-form-item label="模拟月份" prop="month" size="mini">
      <el-checkbox v-model="ruleForm.month" />
      <!--
      <el-input
        v-model="getMonth"
        placeholder="点击选择模拟月份"
        :disabled="true"
        @click.native="transferData($event, 'monthOptions')"
      ></el-input> -->
    </el-form-item>
    <!-- 模拟小时 -->
    <el-form-item label="模拟小时" prop="hour" size="mini">
      <el-checkbox v-model="ruleForm.hour" />
      <!-- <el-input
        v-model="getHour"
        placeholder="点击选择模拟小时"
        :disabled="true"
        @click.native="transferData($event, 'hourOptions')"
      ></el-input> -->
    </el-form-item>
    <!-- 模拟地区 -->
    <el-form-item label="模拟地区" prop="region" size="mini">
      <div class="form__select--year-region">
        <el-select v-model="ruleForm.region" multiple placeholder="请选择">
          <el-option
            v-for="item in regionOptions.data"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
    </el-form-item>
    <!-- 计算方法 -->
    <el-form-item label="计算方法" prop="calculation_type">
      <el-radio-group v-model="ruleForm.calculation_type">
        <el-radio label="宏观" />
        <el-radio label="微观" />
      </el-radio-group>
    </el-form-item>
    <!-- 是否计算排放量 -->
    <el-form-item label="是否计算排放量">
      <el-checkbox v-model="ruleForm.is_quantity" />
    </el-form-item>
    <el-tag type="danger" :hit="true">模拟对象</el-tag>
    <el-form-item label="法则污染物" prop="regulatoryPollutants">
      <el-checkbox-group v-model="ruleForm.regulatoryPollutants">
        <el-checkbox
          v-for="item in regulatoryPollutants"
          :key="item.id"
          style="margin-right: 10px"
          :label="item"
        />
      </el-checkbox-group>
    </el-form-item>
    <!-- 温室气体 -->
    <el-form-item label="温室气体">
      <el-checkbox-group v-model="ruleForm.greenHouseGases">
        <el-checkbox
          v-for="item in greenHouseGases"
          :key="item.id"
          style="margin-right: 10px"
          :label="item"
        >{{ item }}</el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <!-- 颗粒物组分 -->
    <el-form-item label="颗粒物组分">
      <el-checkbox-group v-model="ruleForm.particylateMatterComposition">
        <el-checkbox
          v-for="item in particylateMatterComposition"
          :key="item.id"
          style="margin-right: 10px"
          :label="item"
        >{{ item }}</el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <!-- 能耗 -->
    <!-- <el-form-item label="能耗">
      <el-checkbox v-model="ruleForm.energyConsumption">油耗(FC)</el-checkbox>
    </el-form-item>-->
    <!-- 功能按钮 -->
    <!--  @click="submitForm('ruleForm')" -->
  </el-form>
</template>

<script>
import yearJson from '@/assets/dataJson/year-show-json.json'
import monthJson from '@/assets/dataJson/month-show-json.json'
import regionJson from '@/assets/dataJson/region-show-json.json'
import hourJson from '@/assets/dataJson/hour-show-json.json'
import { factor_main_save, factor_main_get, getJsonData } from '@/api/emission'
import { uuid } from 'vue-uuid'
import mybus from '@/utils/mybus'
import config from '@/api/constapi'

export default {
  name: 'NewCalculationModel',
  components: {},
  props: {
    year: {
      type: Array,
      default() {
        return []
      }
    },
    month: {
      type: Array,
      default() {
        return []
      }
    },
    hour: {
      type: Array,
      default() {
        return []
      }
    },
    region: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      // 表单数据结果
      ruleForm: {
        main_id: '',
        // 模拟方案名称
        name: '',
        // 模拟年份
        year: [],
        // 模拟月份
        month: '',
        // 模拟小时
        hour: '',
        // 模拟地区
        region: [],
        // 计算方法
        calculation_type: '',
        // 是否计算排放量
        is_quantity: '',
        type: [],
        // 法规污染物
        regulatoryPollutants: [],
        // 温室气体
        greenHouseGases: [],
        // 颗粒物组分
        particylateMatterComposition: [],
        // 能耗
        energyConsumption: '',
        pollute_codes: '',
        pollute_names: '' // 所有的污染物名称和编码
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        year: [{ required: true, message: '请选择年份', trigger: 'change' }],
        region: [{ required: true, message: '请选择地区', trigger: 'change' }],
        calculation_type: [
          { required: true, message: '请选择计算方法', trigger: 'change' }
        ],
        regulatoryPollutants: [
          {
            type: 'array',
            required: true,
            message: '请至少选择一个法则污染物',
            trigger: 'change'
          }
        ]
      },

      /* 数据展示start */

      // 法规污染物
      regulatoryPollutants: ['CO', 'THC', 'NMHC', 'NOx', 'NH3', 'PN', 'PM'],
      // 温室气体
      greenHouseGases: ['CO2', 'N2O', 'CH4'],
      // 颗粒物组分
      particylateMatterComposition: ['EC', 'OC', 'PAHs'],
      // 能耗
      energyConsumption: '油耗(FC)',

      /* 数据展示end */

      // 年份选择
      yearOptions: {},
      // 月份选择
      monthOptions: {},
      // 小时选择
      hourOptions: {},
      // 地区选择
      regionOptions: {}
    }
  },

  // 计算属性
  // computed: {
  //   // 年份的计算属性
  //   getYear: {
  //     /**
  //      * 计算函数get方法
  //      */
  //     get: function () {
  //       // 如果全局状态 firstYearData 存在
  //       if (this.$store.state.newCreate.firstYearData) {
  //         // 将全局状态 firstYearData 变为字符串，赋值给本页面的ruleForm对象的year属性
  //         this.ruleForm.year = this.$store.state.newCreate.firstYearData.toString();
  //       }
  //       return this.ruleForm.year;
  //     },
  //     /**
  //      * 计算函数set方法
  //      */
  //     set: function (value) {
  //       this.ruleForm.year = value;
  //        this.$store.commit('newCreate/setFirstYearData', value)
  //     },
  //   },
  //   getRegion: {
  //     get: function () {
  //       // 如果全局状态 firstRegionData 存在
  //       if (this.$store.state.newCreate.firstRegionData) {
  //         // 将全局状态 firstRegionData 变为字符串，赋值给本页面的ruleForm对象的region属性
  //         this.ruleForm.region = this.$store.state.newCreate.firstRegionData.toString();
  //       }
  //       return this.ruleForm.region;
  //     },
  //     set: function (value) {
  //       this.ruleForm.region = value;
  //       this.$store.commit('newCreate/setFirstRegionData', value);
  //     },
  //   },
  //   getMonth: {
  //     get: function () {
  //       // 如果全局状态 firstMonthData 存在
  //       if (this.$store.state.newCreate.firstMonthData) {
  //         // 将全局状态 firstMonthData 变为字符串，赋值给本页面的ruleForm对象的month属性
  //         this.ruleForm.month = this.$store.state.newCreate.firstMonthData.toString();
  //       }
  //       return this.ruleForm.month;
  //     },
  //     set: function (value) {
  //       this.ruleForm.month = value;
  //       this.$store.commit('newCreate/setFirstMonthData', value)
  //     },
  //   },
  //   getHour: {
  //     get: function () {
  //       // 如果全局状态 firstHourData 存在
  //       if (this.$store.state.newCreate.firstHourData) {
  //         // 将全局状态 firstHourData 变为字符串，赋值给本页面的ruleForm对象的hour属性
  //         this.ruleForm.hour = this.$store.state.newCreate.firstHourData.toString();
  //       }
  //       return this.ruleForm.hour;
  //     },
  //     set: function (value) {
  //       this.ruleForm.hour = value;
  //       this.$store.commit('newCreate/setFirstHourData', value);
  //     },
  //   },
  // },

  // 侦听器
  watch: {
    /**
     * 监听全局状态中的 isCreateForm 是否发生了变化
     */
    '$store.state.newCreate.isCreateForm': {
      // 深度监听
      deep: true,
      /**
       * @param { Number } newValue; 发生变化后的值
       * @param { Number } oldValue; 发生变化前的值
       */
      handler: function(oldValue, newValue) {
        console.log('Hello Watch~')
        console.log('new:, old:')
        console.log(newValue, oldValue)
        console.log(typeof newValue)
        if (newValue === 1) {
          console.log('1111111')
          this.$refs['ruleForm'].validate((valid) => {
            console.log('222222')
            if (valid) {
              // 改变格式
              this.ruleForm.regulatoryPollutants.forEach((element) => {
                if (element && element.length > 0) {
                  this.ruleForm.pollute_codes += element + ';'
                }
              })
              if (!this.ruleForm.main_id) {
                (this.ruleForm.main_id = uuid.v1())
              }
              this.ruleForm.yearStr = this.ruleForm.year.join(',')
              this.ruleForm.regionStr = this.ruleForm.region.join(',')
              factor_main_save(this.ruleForm).then((e) => {
                // 将收集到的form数据发送给setFirstStepData函数，让其设置vuex中的firstStepData
                this.$store.commit('newCreate/setFirstStepData', this.ruleForm)
                // 跳转到第二步
                this.$store.commit('newCreate/setIsCreateForm', 2)
                console.log(this.$store.state.newCreate.isCreateForm)
                console.log(this.$store.state.newCreate.firstStepData)
              })
            } else {
              this.$store.commit('newCreate/setIsCreateForm', 1)
              console.log('error submit!!')
              return false
            }
          })
        }
        // 当页面页面控制数是从1 -> 2时
        // if (newValue === 10 && oldValue === 1) {
        //   factor_main_save(this.ruleForm).then((e) => {
        //     // 将收集到的form数据发送给setFirstStepData函数，让其设置vuex中的firstStepData
        //     this.$store.commit("newCreate/setFirstStepData", this.ruleForm);
        //     // 跳转到第二步
        //     this.$store.commit("newCreate/setIsCreateForm", 2);
        //     console.log(this.$store.state.newCreate.isCreateForm);
        //     console.log(this.$store.state.newCreate.firstStepData);
        //   });
        // }
        console.log('seeYou Watch~')
      }
    }
  },
  mounted() {
    // 导入json数据
    this.yearOptions = yearJson
    this.monthOptions = monthJson
    this.regionOptions = regionJson
    this.hourOptions = hourJson
    // 导入历史数据
    if (this.$route.query.main_name) {
      console.log('带参的路由数据：')
      console.log(this.$route.query)
      console.log('带参路由数据中的地区的类型：')
      console.log(typeof this.$route.query.region_names)
      const main = this.$route.query
      this.ruleForm.main_id = main.main_id
      this.ruleForm.name = main.main_name
      const thisyear = main.years.split(',')
      // this.ruleForm.year = thisyear;
      this.ruleForm.year = thisyear
      this.ruleForm.month = main.month
      this.ruleForm.region = main.region_names.split(',')
      console.log('处理后的地区:')
      console.log(this.ruleForm.region)
      this.ruleForm.calculation_type = main.calculation_type
      this.ruleForm.regulatoryPollutants = main.pollute_codes.split(';')
      console.log(this.$store.state.newCreate.firstStepData)
      this.$store.commit('newCreate/setFirstStepData', this.ruleForm)
      console.log(this.$store.state.newCreate.firstStepData)
      mybus.$emit('getParamsList', main.main_id)
      console.log('getParamsList')
    }
    mybus.$on('getParamsList', (evt) => {
      console.log(evt)
    })
  },
  beforeDestroy() {
    mybus.$off('getParamsList')
  },
  methods: {
    /**
     * @name transferData 传递给tree-select组件的数据
     * @param { object } e 点击事件
     * @param { string } str  用来判断所需要传的数据
     */
    // transferData(e, str) {
    //   // 将获取的位置赋值给rect
    //   const rect = e.target.getBoundingClientRect();
    //   // console.log(this.$store.state.newCreate.treeSelectShow);
    //   // 显示树型选择框
    //   this.$store.commit("newCreate/setTreeSelect", true);
    //   // 传给tree-select用于遍历的数据
    //   let obj = {};
    //   // 传给tree-select用于标识展示的字符串
    //   let showLable = "";
    //   // 根据条件判断索要传的数据和字符串
    //   if (str === "yearOptions") {
    //     // 传关于年份的数据
    //     obj = this.yearOptions;
    //     showLable = "年份选择";
    //   } else if (str === "monthOptions") {
    //     // 传关于月份的数据
    //     obj = this.monthOptions;
    //     showLable = "月份选择";
    //   } else if (str === "hourOptions") {
    //     // 传关于小时的数据
    //     obj = this.hourOptions;
    //     showLable = "时间选择";
    //   } else {
    //     // 传关于地区的数据
    //     obj = this.regionOptions;
    //     showLable = "点位选择";
    //   }
    //   // 将对应的数据发送给父组件
    //   this.$emit("setSelectData", obj, showLable, rect.top);
    // },

    /**
     * @param { string } ruleForm; 重置清空表单数据
     */
    resetForm(formName) {
      // 重置数据
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style>
@import "../../assets/style/new-calculation-model.css";
.form__select--year-region .el-select {
  width: 100%;
}
.form__select--year-region .el-tag {
  width: 10% !important;
  text-align: center;
}
</style>
