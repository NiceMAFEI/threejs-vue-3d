<template>
  <div class="main">
    <!-- 信息框 -->
    <div class="main--div__info">
      <!-- echarts图 -->
      <div id="echarts" class="echarts" />
      <!-- 信息展示 -->
      <div class="information">
        <h1>{{ title }}</h1>
        <div class="information__item">
          <p>建立时间：</p>
          <span>2015年2月1日</span>
        </div>
        <div class="information__item">
          <p>小豆储量：</p>
          <span>335</span>
        </div>
        <div class="information__item">
          <p>大豆储量：</p>
          <span>310</span>
        </div>
        <div class="information__item">
          <p>小麦储量：</p>
          <span>274</span>
        </div>
        <div class="information__item">
          <p>大麦储量：</p>
          <span>235</span>
        </div>
        <div class="information__item">
          <p>仓库负责人：</p>
          <span>至善</span>
        </div>
      </div>
    </div>
    <!-- 侧面 -->
    <el-drawer
      :title="focus"
      :destroy-on-close="true"
      :visible.sync="drawer"
      :direction="direction"
      size="20%"
      class="drawer__details"
    >
      <!-- echrts粮食储存罐详细信息 -->
      <div id="drawer--echarts-temperature" class="drawer--echarts" />
      <div id="drawer--echarts-humidity" class="drawer--echarts" />
      <div id="drawer--echarts-carbonDioxide" class="drawer--echarts" />
      <div id="drawer--echarts-oxygen" class="drawer--echarts" />
      <div class="button">
        <el-button
          type="success"
          class="button"
          round
          @click="goToDetails"
          :loading="buttonShow"
          >检查是否有险情</el-button
        >
      </div>
    </el-drawer>
    <!-- threejs渲染狂 -->
    <div id="container" style="width: 100%; height: 800px; margin-top: 24px" />
  </div>
</template>

<script>
import axios from "axios";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
export default {
  name: "WareHouse",
  data() {
    return {
      buttonShow: false,
      // 折线图数据
      lineEchartsDatas: {},
      // 侧面信息是否显示
      drawer: false,
      direction: "rtl",
      dialogVisible: false,
      // 显示的仓库名字
      title: this.$route.params.title,
      // 展示的饼图
      pieData: [],
      // 仓库创建时间
      createTime: "",
      // 小豆储存罐坐标
      adzikuBeanPosition: [
        {
          name: "大豆罐-01",
          data: [-15, 5, 20],
        },
        {
          name: "大豆罐-02",
          data: [-15, 5, 5],
        },
        {
          name: "大豆罐-03",
          data: [-5, 5, 20],
        },
        {
          name: "大豆罐-04",
          data: [-5, 5, 5],
        },
      ],
      // 大豆储存罐坐标
      soyBeanPosition: [
        {
          name: "小豆罐-01",
          data: [-15, 5, -20],
        },
        {
          name: "小豆罐-02",
          data: [-15, 5, -5],
        },
        {
          name: "小豆罐-03",
          data: [-5, 5, -20],
        },
        {
          name: "小豆罐-04",
          data: [-5, 5, -5],
        },
      ],
      // 墙面模型数据
      wallData: [
        // 左墙面
        {
          volume: [2.5, 20, 60],
          position: [-20, 10, 0],
        },
        // 右墙面
        {
          volume: [42.5, 20, 2.5],
          position: [0, 10, -30],
        },
        {
          volume: [2.5, 20, 60],
          position: [20, 10, 0],
        },
        // {
        //   volume: [42.5, 20, 2.5],
        //   position: [0, 10, 30]
        // }
      ],
      focus: "",
    };
  },
  mounted() {
    switch (this.$route.params.title) {
      case "希望-仓库-01":
        this.pieData = [
          { value: 35, name: "小豆" },
          { value: 40, name: "大豆" },
          { value: 38, name: "小麦" },
          { value: 57, name: "大麦" },
        ];
        this.createTime = "2015年2月1日";
        break;
      case "美好-仓库-02":
        this.pieData = [
          { value: 46, name: "小豆" },
          { value: 32, name: "大豆" },
          { value: 41, name: "小麦" },
          { value: 56, name: "大麦" },
        ];
        this.createTime = "2015年7月12日";
        break;
      case "人间-仓库-03":
        this.pieData = [
          { value: 43, name: "小豆" },
          { value: 38, name: "大豆" },
          { value: 48, name: "小麦" },
          { value: 58, name: "大麦" },
        ];
        this.createTime = "2016年3月11日";
        break;
      case "农兴-仓库-04":
        this.pieData = [
          { value: 56, name: "小豆" },
          { value: 48, name: "大豆" },
          { value: 58, name: "小麦" },
          { value: 69, name: "大麦" },
        ];
        this.createTime = "2017年1月1日";
        break;
    }
    // 建立echarts饼图
    this.setEcharts(this.$route.params.title, this.pieData);
    /**
     *@name  场景
     */
    const scene = new THREE.Scene();
    /**
     * 雾化效果
     * @param { String }颜色
     * @param { Number }近视角
     * @param { Number }原视角
     */
    scene.fog = new THREE.Fog("#003a6c", 4000, 18000);
    /**
     * @name 灯光
     */
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
    directionalLight.color.setHSL(0.1, 1, 0.95);
    directionalLight.position.set(0, 200, 0).normalize();
    scene.add(directionalLight);
    const ambient = new THREE.AmbientLight(0xffffff, 1);
    ambient.position.set(0, 0, 0);
    scene.add(ambient);
    /**
     * @name 相机
     * fov, aspect, near, far
     */
    const camera = new THREE.PerspectiveCamera(
      35,
      window.innerWidth / window.innerHeight,
      0.1,
      13000
    );
    camera.position.set(-30, 100, 200); // 设置相机位置
    camera.lookAt(new THREE.Vector3(0, 0, 0)); // 设置相机方向(指向的场景对象)
    /**
     * @name 渲染对象
     */
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight); // 设置渲染区域尺寸
    renderer.setClearColor(0x4682b4, 1); // 设置背景颜色
    document.getElementById("container").appendChild(renderer.domElement);
    // 执行渲染操作   指定场景、相机作为参数
    renderer.render(scene, camera);
    // 窗口变动触发的方法
    document.addEventListener("resize", onWindowResize, false);
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    // 添加选中时的模板
    this.ThreeJs_Composer(renderer, scene, camera);
    /**
     * @name 渲染
     * @param { Object }Renderer渲染对象
     * @param { Object }Scene场景
     * @param { Object }Camera相机
     */
    function render() {
      renderer.render(scene, camera);
      // 再次回调渲染
      requestAnimationFrame(render);
    }
    // 选装缩放控制器
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    // 阻尼惯性
    controls.dampingFactor = 0.5;
    // 视角最小距离
    controls.minDistance = 0;
    // 视角最远距离
    controls.maxDistance = 18000;
    // 最大角度
    controls.maxPolarAngle = Math.PI / 2.2;
    const axes = new THREE.AxesHelper(800); // 参数设置了三条轴线的长度
    scene.add(axes);
    /**
     * ==========================================
     * =                创建几何体               =
     * ==========================================
     */
    /**
     * 地板
     */
    const floor = new THREE.PlaneGeometry(40, 60);
    const texture = new THREE.TextureLoader().load("./static/floor2.png");
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(10, 10);
    const material = new THREE.MeshLambertMaterial({
      map: texture,
    });
    const mesh = new THREE.Mesh(floor, material);
    scene.add(mesh);
    mesh.rotateX(-Math.PI / 2);
    /**
     * 设置墙面
     */
    this.wallData.map((item) => {
      this.setBoxGeometry(
        scene,
        item.volume[0],
        item.volume[1],
        item.volume[2],
        item.position[0],
        item.position[1],
        item.position[2],
        "墙面",
        "./static/brick_bump.jpg"
      );
    });
    /**
     * 小豆仓库
     */
    this.adzikuBeanPosition.map((item) => {
      this.setCylinderGeometry(
        scene,
        item.data[0],
        item.data[1],
        item.data[2],
        item.name
      );
    });
    // 小豆提示图片
    const adBeanFloor = new THREE.PlaneGeometry(15, 20);
    const adBeanMeshTexture = new THREE.TextureLoader().load("./static/xiaoDouFloor.png");
    const adBeanMaterial = new THREE.MeshLambertMaterial({
      map: adBeanMeshTexture,
    });
    const adBeanMesh = new THREE.Mesh(adBeanFloor, adBeanMaterial);
    adBeanMesh.position.set(-10, 0.1, -12.5);
    scene.add(adBeanMesh);
    adBeanMesh.rotateX(-Math.PI / 2);
    /**
     * 大豆仓库
     */
    this.soyBeanPosition.map((item) => {
      this.setCylinderGeometry(
        scene,
        item.data[0],
        item.data[1],
        item.data[2],
        item.name
      );
    });
    // 大豆提示图片
    const soyBeanFloor = new THREE.PlaneGeometry(15, 20);
    const soyBeanMeshTexture = new THREE.TextureLoader().load("./static/daDouFloor.png");
    const soyBeanMaterial = new THREE.MeshLambertMaterial({
      map: soyBeanMeshTexture,
    });
    const soyBeanMesh = new THREE.Mesh(soyBeanFloor, soyBeanMaterial);
    soyBeanMesh.position.set(-10, 0.1, 12.5);
    scene.add(soyBeanMesh);
    soyBeanMesh.rotateX(-Math.PI / 2);
    /**
     * 小麦堆
     */
    this.setBoxGeometry(
      scene,
      6.5,
      10,
      6.5,
      9.5,
      5,
      -18,
      "草堆一号",
      "./static/caoDui.png"
    );
    this.setBoxGeometry(scene, 6.5, 10, 6.5, 5, 5, -7, "草堆二号", "./static/caoDui.png");
    this.setBoxGeometry(
      scene,
      6.5,
      10,
      6.5,
      15,
      5,
      -7,
      "草堆三号",
      "./static/caoDui.png"
    );
    /**
     * 大麦堆
     */
    this.setBoxGeometry(
      scene,
      6.5,
      10,
      6.5,
      9.5,
      5,
      18,
      "大草堆一号",
      "./static/caoDui.png"
    );
    this.setBoxGeometry(
      scene,
      6.5,
      10,
      6.5,
      5,
      5,
      7,
      "大草堆二号",
      "./static/caoDui.png"
    );
    this.setBoxGeometry(
      scene,
      6.5,
      10,
      6.5,
      15,
      5,
      7,
      "大草堆三号",
      "./static/caoDui.png"
    );

    /**
     * 渲染
     */
    render();
  },
  beforeUpdate() {
    this.$nextTick(function () {
      axios.get("/data/details-json.json").then((res) => {
        console.log(res);
        this.lineEchartsDatas = res.data;
        this.setEchartsLine(
          "drawer--echarts-temperature",
          this.lineEchartsDatas.temperature
        );
        this.setEchartsLine("drawer--echarts-humidity", this.lineEchartsDatas.humidity);
        this.setEchartsLine(
          "drawer--echarts-carbonDioxide",
          this.lineEchartsDatas.carbonDioxide
        );
        this.setEchartsLine("drawer--echarts-oxygen", this.lineEchartsDatas.oxygen);
      });
    });
  },
  methods: {
    /**
     * @name 设置圆柱体
     * @param { Object }_scene场景
     * @param { Number }x坐标
     * @param { Number }y坐标
     * @param { Number }z坐标
     * @param { String }name名字
     */
    setCylinderGeometry(_scene, x, y, z, name) {
      let textureLoader = new THREE.TextureLoader();
      let mesh = new THREE.Mesh(new THREE.CylinderGeometry(2.5, 2.5, 10, 10, 10), [
        //下标0：右面材质
        new THREE.MeshBasicMaterial({
          map: textureLoader.load("./static/liangShiGuanQian.png"),
        }),
        //上面
        new THREE.MeshBasicMaterial({
          map: textureLoader.load("./static/liangShiGuanDing.png"),
        }),
        //下标2：上面材质
        new THREE.MeshBasicMaterial({
          map: textureLoader.load("./static/louou.png"),
        }),
        //下标3：下面材质
        new THREE.MeshBasicMaterial({
          map: textureLoader.load("./static/louYou.png"),
        }),
        //下标4：前面材质
        new THREE.MeshBasicMaterial({
          map: textureLoader.load("./static/louQian.png"),
        }),
        //下标5：后面材质
        new THREE.MeshBasicMaterial({
          map: textureLoader.load("./static/louQian.png"),
        }),
      ]);
      mesh.name = name;
      mesh.position.set(x, y, z);
      _scene.add(mesh);
      return mesh;
    },
    /**
     * @name 设置长方体
     * @param { Object }_scene场景
     * @param { Number }l
     * @param { Number }w
     * @param { Number }h
     * @param { Number }x坐标
     * @param { Number }y坐标
     * @param { Number }z坐标
     * @param { String }name名字
     * @param { String }str渲染图片的打包地址
     */
    setBoxGeometry(_scene, l, w, h, x, y, z, name, str) {
      const geometry = new THREE.BoxGeometry(l, w, h);
      const texture = new THREE.TextureLoader().load(str);
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(1, 1);
      const material = new THREE.MeshBasicMaterial({
        map: texture,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.name = name;
      mesh.position.set(x, y, z);
      _scene.add(mesh);
      return mesh;
    },
    /**
     * @name 场景中的点击
     * @param { Object }_renderer渲染
     * @param { Object }_scene场景
     * @param { Object }_camera相机
     */
    ThreeJs_Composer(_renderer, _scene, _camera) {
      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();
      const selectedObjects = [];
      const that = this;
      window.addEventListener("click", onMouseClick, false);
      // const dom = document.getElementById("label");
      /**
       * 监听事件
       * @param { Object }event事件
       */
      function onMouseClick(event) {
        // 取消event事件的默认动作
        event.preventDefault();
        // 返回id为container的矩阵对象，平面坐标轴对象
        const getBoundingClientRect = document
          .getElementById("container")
          .getBoundingClientRect();
        let x, y;
        if (event.changedTouches) {
          x = event.changedTouches[0].pageX;
          y = event.changedTouches[0].pageY;
        } else {
          // 点击事件坐标轴减去container的偏移量，===========================================》解决raycaster射线获取会偏移的bug
          x = event.clientX - getBoundingClientRect.left;
          y = event.clientY - getBoundingClientRect.top;
        }
        mouse.x = (x / window.innerWidth) * 2 - 1;
        mouse.y = -(y / window.innerHeight) * 2 + 1;
        // 通过鼠标点击的位置(二维坐标)和当前相机的矩阵计算出射线位置
        raycaster.setFromCamera(mouse, _camera);
        const intersects = raycaster.intersectObjects([_scene], true);

        if (intersects.length === 0) {
          // dom.style.display = "none";
        } else if (
          intersects[0].object.name === "地面" ||
          intersects[0].object.name === "墙面" ||
          intersects[0].object.name === ""
        ) {
          // dom.style.display = "none";
          selectedObjects.pop();
        } else {
          // dom.style.display = "block";
          selectedObjects.pop();
          selectedObjects.push(intersects[0].object);
          // 获取点击的信息
          that.focus = intersects[0].object.name;
          that.drawer = true;
        }
      }
    },
    /**
     * @name 建立echarts饼图
     * @param { String }name提示文字
     * @param { Array }data可视化数据
     */
    setEcharts(name, data) {
      const myChart = this.$echarts.init(document.getElementById("echarts"));
      const option = {
        backgroundColor: "#122e29",

        title: {
          text: name + "-饼图",
          left: "center",
          top: 20,
          textStyle: {
            color: "#ccc",
          },
        },
        color: ["#8f4b4a", "#fab27b", "#df9464", "#ba8448"],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        series: [
          {
            name: "种类(吨)",
            type: "pie",
            radius: "55%",
            center: ["50%", "50%"],
            data: data.sort(function (a, b) {
              return a.value - b.value;
            }),
            roseType: "radius",
            label: {
              color: "#fff",
              fontFamily: "sans-serif",
            },
            labelLine: {
              lineStyle: {
                color: "#fff",
              },
              smooth: 0.2,
              length: 10,
              length2: 20,
            },
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },

            animationType: "scale",
            animationEasing: "elasticOut",
            animationDelay: function (idx) {
              return Math.random() * 200;
            },
          },
        ],
      };
      myChart.setOption(option);
    },
    /**
     * @name 建立echarts折线图
     * @param { String }id domId
     * @param { Array }data可视化数据
     */
    setEchartsLine(id, myOption) {
      console.log(myOption);
      const myChart = this.$echarts.init(document.getElementById(id));
      const option = {
        title: {
          text: myOption.name,
        },
        xAxis: {
          type: "category",
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周天"],
          color: "#fff",
          axisTick: {
            show: false,
          },
        },
        yAxis: {
          type: "value",
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        series: [
          {
            name: "NMSL",
            data: myOption.data,
            type: "line",
            lineStyle: {
              color: myOption.lineColor,
            },
            itemStyle: {
              color: myOption.itemColor,
            },
            smooth: true,
          },
        ],
      };
      myChart.setOption(option);
    },
    /**
     * @name 起飞前往详细信息
     */
    goToDetails() {
      this.buttonShow = true;
      setTimeout(() => {
        this.buttonShow = false;

        this.$message({
          showClose: true,
          message: "园区内暂时无险情",
          type: "success",
        });
      }, 3000);
      // this.$router.push({ name: "details", params: { title: this.focus } });
    },
  },
};
</script>

<style scoped lang="scss">
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
h2 {
  margin: 1%;
  text-align: center;
  height: 24px;
  position: absolute;
  top: 24px;
  right: 20%;
}
.main {
  width: 100%;
  height: 100%;
  position: relative;
  .drawer__details {
    display: flex;
    flex-flow: row wrap;
    .button {
      margin-top: 10%;
      width: 100%;
    }
    .drawer--echarts {
      background-color: #f2eada;
      width: 100%;
      height: 20%;
    }
  }
  .main--div__info {
    margin-top: 24px;
    width: 100%;
    height: 400px;
    display: flex;
    flex-flow: row nowrap;
    background-color: #27342b;
    border-radius: 5px;
    .information {
      width: 50%;
      height: 100%;
      display: flex;
      flex-flow: row wrap;
      h1 {
        width: 100%;
        text-align: center;
        color: aliceblue;
        padding-top: 10px;
      }
      .information__item {
        width: 50%;
        display: flex;
        flex-flow: row nowwrap;
        justify-content: center;
        align-items: center;
        p {
          width: 100px;
          font-size: 16px;
          font-weight: bold;
          white-space: nowrap;
          font-family: PingFang SC;
          color: aliceblue;
          opacity: 1;
          margin-right: 12px;
          text-align: end;
          color: aliceblue;
        }
        span {
          width: 150px;
          font-size: 16px;
          font-family: PingFang SC;
          color: aliceblue;
          opacity: 1;
        }
      }
    }
    .echarts {
      width: 50%;
      height: 100%;
    }
  }
}
</style>
