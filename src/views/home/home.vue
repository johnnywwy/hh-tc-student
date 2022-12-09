<template>
  <div>
    <van-nav-bar title="主页" />
    <div style="border:1px solid red">
      <van-pull-refresh v-model="loading" @refresh="onRefresh">
      <p>刷新次数: {{ count }}</p>
      <!-- <div>{{ router }}</div> -->
    </van-pull-refresh>
    </div>
    
  </div>
</template>

<script setup lang='ts'>
// import router from "../../router";
import router from '../../router';
// import route from route
import { NavBar } from 'vant';
import { ref } from 'vue';
// import { PullRefresh } from 'vant';
import { showToast } from 'vant';
const count = ref(0);
const loading = ref(false);
const onRefresh = () => {
  setTimeout(() => {
    showToast('刷新成功');
    loading.value = false;
    count.value++;
  }, 1000);
};
</script>

<style lang='less' scoped>

</style>