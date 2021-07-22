<template>
  <div>
    <div class="check__info">
      <label id="label" />
      <el-button @click="gotoNextRoute">前往</el-button>
    </div>
    <div id="container" />
  </div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
export default {
  name: "Three",
  data() {
    return {
      focus: "",
    };
  },
  watch: {
    focus: {
      immediate: true,
      handler() {
        console.log("focus改变了");
      },
    },
  },
  mounted() {
    /**
     * 场景
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
     * 灯光
     */
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
    directionalLight.color.setHSL(0.1, 1, 0.95);
    directionalLight.position.set(0, 200, 0).normalize();
    scene.add(directionalLight);
    const ambient = new THREE.AmbientLight(0xffffff, 1);
    ambient.position.set(0, 0, 0);
    scene.add(ambient);
    /**
     * 相机
     */
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      13000
    ); // fov, aspect, near, far
    camera.position.set(-100, 2000, 6000); // 设置相机位置
    camera.lookAt(new THREE.Vector3(0, 0, 0)); // 设置相机方向(指向的场景对象)
    /**
     * 渲染对象
     */
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight); // 设置渲染区域尺寸
    renderer.setClearColor(0x4682b4, 1); // 设置背景颜色
    document.getElementById("container").appendChild(renderer.domElement);
    // 执行渲染操作   指定场景、相机作为参数
    renderer.render(scene, camera);
    // 窗口变动触发的方法
    window.addEventListener("resize", onWindowResize, false);
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    // 添加选中时的模板
    this.ThreeJs_Composer(renderer, scene, camera);
    /**
     * 渲染
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
    controls.minDistance = 100;
    // 视角最远距离
    controls.maxDistance = 18000;
    // 最大角度
    controls.maxPolarAngle = Math.PI / 2.2;
    var axes = new THREE.AxesHelper(800); // 参数设置了三条轴线的长度
    scene.add(axes);

    /**
     * ==========================================
     * =                创建几何体               =
     * ==========================================
     */
    /**
     * 地板
     */
    const floor = new THREE.PlaneGeometry(6200, 3500);
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
     * 宿舍楼
     */
    this.setSuSheLou(scene);
    /**
     * 草地
     */
    this.setGrass(scene, 1200, 3500, 3700, 0, 0);
    this.setTree(scene, 4000, 3200, 2600, 1200);

    this.setGrass(scene, 1200, 3500, -3700, 0, 0);
    this.setTree(scene, -3200, -4000, 2600, 1200);

    this.setGrass(scene, 8600, 900, 0, 0, 2200);
    this.setTree(scene, 4300, -4300, -800, -1650);

    this.setGrass(scene, 8600, 900, 0, 0, -2200);
    this.setTree(scene, 4000, -4300, 800, 1650);

    /**
     * 车
     */
    this.setCar(scene, 400, 400, -2800, 120, -1200, "./static/car1.png");
    this.setCar(scene, 400, 400, -2400, 120, -1200, "./static/car2.png");
    this.setCar(scene, 400, 400, -2000, 120, -1200, "./static/car3.png");
    /**
     * ===============右边仓库模型-start================
     */
    this.setBoxGeometry(
      scene,
      {
        length: 1000,
        width: 400,
        height: 700,
      },
      "blue",
      {
        x: 800,
        y: 200,
        z: 500,
      },
      "希望-仓库-01"
    );
    this.setBoxGeometry(
      scene,
      {
        length: 1000,
        width: 400,
        height: 700,
      },
      "blue",
      {
        x: 2100,
        y: 200,
        z: 500,
      },
      "美好-仓库-02"
    );
    this.setBoxGeometry(
      scene,
      {
        length: 1000,
        width: 400,
        height: 700,
      },
      "blue",
      {
        x: 800,
        y: 200,
        z: -500,
      },
      "人间-仓库-03"
    );
    this.setBoxGeometry(
      scene,
      {
        length: 1000,
        width: 400,
        height: 700,
      },
      "blue",
      {
        x: 2100,
        y: 200,
        z: -500,
      },
      "农兴-仓库-04"
    );
    /**
     * ===============右边仓库模型-end================
     */

    /**
     *===============左边仓库模型-start===============
     */
    /**
     * =============左边仓库模型-end=================
     */
    setTimeout(() => {
      render();
    }, 1500);
  },
  methods: {
    /**
     * @name 宿舍楼
     */
    setSuSheLou(_scene) {
      let textureLoader = new THREE.TextureLoader();
      let mesh = new THREE.Mesh(new THREE.BoxGeometry(1000, 1000, 1500), [
        //下标0：右面材质
        new THREE.MeshBasicMaterial({
          map: textureLoader.load("./static/louYou.png"),
        }),
        //下标1：左面材质
        new THREE.MeshBasicMaterial({
          map: textureLoader.load("./static/louYou.png"),
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
      mesh.position.set(-2000, 500, 0);
      _scene.add(mesh);
    },
    /**
     * @name 创建草地
     * @param { Object }_scene 场景
     * @param { Number }width 宽
     * @param { Number }length 长
     * @param { Number }x
     * @param { Number }y
     * @param { Number }z
     */
    setGrass(_scene, width, length, x, y, z) {
      const gem = new THREE.PlaneGeometry(width, length);
      const texture = new THREE.TextureLoader().load("./static/caoDi.png");
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(5, 5);
      const meterial = new THREE.MeshLambertMaterial({
        color: 0x777700,
        map: texture,
      });
      const mesh = new THREE.Mesh(gem, meterial);
      mesh.position.set(x, y, z);
      _scene.add(mesh);
      mesh.rotateX(-Math.PI / 2);
    },
    /**
     * @name 造树
     * @param { Object } _scene 场景
     */
    setTree(_scene, xMax, xMin, yMax, yMin) {
      const textureTree = new THREE.TextureLoader().load("./static/tree.png");
      for (let i = 0; i < 40; i++) {
        const spriteMaterial = new THREE.SpriteMaterial({
          map: textureTree,
        });
        const sprite = new THREE.Sprite(spriteMaterial);
        _scene.add(sprite);
        sprite.scale.set(500, 500, 1);
        const k1 = Math.floor(Math.random() * (xMax - xMin + 1)) + xMin;
        const k2 = Math.floor(Math.random() * (yMax - yMin + 1)) - yMin;
        sprite.position.set(k1, 200, k2);
      }
    },
    /**
     * @name 添加立方体
     * @param { Object }Scene,场景
     * @param { Object }box,立方体的属性对象
     * @param { String }color,立方体的颜色
     * @param { Object }boxPotions,立方体在场景中的位置
     * @param { String }name,模型的名字
     */
    setBoxGeometry(Scene, box, color, boxPotions, name) {
      // 长方体
      let textureLoader = new THREE.TextureLoader();
      let mesh = new THREE.Mesh(
        new THREE.BoxGeometry(box.length, box.width, box.height),
        [
          //下标0：右面材质
          new THREE.MeshBasicMaterial({
            map: textureLoader.load("./static/cangKuYou.png"),
          }),
          //下标1：左面材质
          new THREE.MeshBasicMaterial({
            map: textureLoader.load("./static/cangKuYou.png"),
          }),
          //下标2：上面材质
          new THREE.MeshBasicMaterial({
            color: "#426ab3",
          }),
          //下标3：下面材质
          new THREE.MeshBasicMaterial({
            map: textureLoader.load("./static/louYou.png"),
          }),
          //下标4：前面材质
          new THREE.MeshBasicMaterial({
            map: textureLoader.load("./static/cangKuQian.png"),
          }),
          //下标5：后面材质
          new THREE.MeshBasicMaterial({
            map: textureLoader.load("./static/cangKuQian.png"),
          }),
        ]
      );
      mesh.name = name;
      boxPotions
        ? mesh.position.set(boxPotions.x, boxPotions.y, boxPotions.z)
        : Scene.add(mesh);
      Scene.add(mesh);
      return mesh;
    },
    /**
     * raycaster射线选中物体
     * @param { Object }renderer渲染器
     * @param { Object }scene场景
     * @param { Object }camera相机
     */
    ThreeJs_Composer(_renderer, _scene, _camera) {
      var raycaster = new THREE.Raycaster();
      var mouse = new THREE.Vector2();
      var selectedObjects = [];
      const that = this;
      document.addEventListener("click", onMouseClick, false);
      const dom = document.getElementById("label");
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
        var x, y;
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
        var intersects = raycaster.intersectObjects([_scene], true);

        if (intersects.length === 0) {
          dom.style.display = "dispaly";
        } else if (
          intersects[0].object.name === "地面" ||
          intersects[0].object.name === "墙面" ||
          intersects[0].object.name === ""
        ) {
          dom.style.display = "none";
          selectedObjects.pop();
        } else {
          dom.style.display = "block";
          selectedObjects.pop();
          selectedObjects.push(intersects[0].object);
          that.focus = dom.innerText = intersects[0].object.name;
        }
      }
    },
    /**
     * @name 路由跳转
     */
    gotoNextRoute() {
      if (
        this.focus === "希望-仓库-01" ||
        this.focus === "美好-仓库-02" ||
        this.focus === "人间-仓库-03" ||
        this.focus === "农兴-仓库-04"
      ) {
        this.$router.push({ name: "warehouse", params: { title: this.focus } });
      } else {
        alert("正在建造");
      }
    },
    /**
     *@name 建立一个车
     *@param { Object }_scene 场景
     */
    setCar(_scene, width, height, x, y, z, str) {
      const texture = new THREE.TextureLoader().load(str);
      const material = new THREE.SpriteMaterial({
        map: texture,
      });
      const sprite = new THREE.Sprite(material);
      _scene.add(sprite);
      sprite.scale.set(width, height, 1);
      sprite.position.set(x, y, z);
    },
  },
  beforeDestroy() {
    window.scene = null;
    window.render = null;
    window.camera = null;
  },
};
</script>

<style scoped lang="scss">
.check__info {
  position: absolute;
  display: flex;
  flex-flow: row wrap;
  top: 10px;
  left: 10px;
  width: 200px;
  height: 200px;
  padding: 10px 20px 0px 20px;
  font-size: 14px;
  background: rgba(255, 255, 255, 0.6);
  line-height: 1;
  border-radius: 5px;
  z-index: 999;
  .el-button {
    height: 40px;
    width: 160px;
  }
}
#label {
  position: absolute;
  bottom: 10px;
  left: 10px;
}
</style>
