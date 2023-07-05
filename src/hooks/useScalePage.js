import { onMounted, onUnmounted } from "vue";
import _ from "lodash";
/**
 * 大屏配置函数
 */
export default function useScalePage(option) {
  // 节流
  const resizeFunc = _.throttle(() => {
    triggerScale();
  }, 100);

  onMounted(() => {
    triggerScale();
    window.addEventListener("resize", resizeFunc);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", resizeFunc); // 释放
  });
  // 大屏适配
  function triggerScale() {
    // 1.设计稿的尺寸
    let targetX = option.targetX || 1920;
    let targetY = option.targetY || 1080;
    let targetRatio = option.targetRatio || 16 / 9; // 宽高比率

    // 2.拿到当前设备(浏览器)的宽度
    let currentX =
      document.documentElement.clientWidth || document.body.clientWidth;
    let currentY =
      document.documentElement.clientHeight || document.body.clientHeight;
    //  1920 * 1080  -> 3840 * 2160

    // 3.计算缩放比例
    let scaleRatio = currentX / targetX; // 参照宽度进行缩放 ( 默认情况 )
    let currentRatio = currentX / currentY; // 宽高比率

    // 超宽屏
    if (currentRatio > targetRatio) {
      scaleRatio = currentY / targetY; // 参照高度进行缩放
      document.body.style = `width:${targetX}px; height:${targetY}px;transform: scale(${scaleRatio}) translateX(-50%); left: 50%`;
    } else {
      // 4.开始缩放网页
      document.body.style = `width:${targetX}px; height:${targetY}px; transform: scale(${scaleRatio})`;
    }
  }
}