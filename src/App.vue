<template>
  <!-- 路由占位 -->
  <router-view />
</template>

<script setup>
import { RouterView } from "vue-router";
import useScalePage from "@/hooks/useScalePage";

// 开发者给设计稿
let option = {
  targetX: 1920,
  targetY: 1080,
  targetRatio: 16 / 9,
};

// 大屏适配
useScalePage(option);
</script>
