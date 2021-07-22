<template>
  <div id="container"></div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
export default {
  name: "Details",
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
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
    });
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
    render();
  },
  methods: {
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
  },
};
</script>

<style></style>
