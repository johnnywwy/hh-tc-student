<template>
  <div>
    <van-pull-refresh v-model="loading" @refresh="onRefresh">
      <p>刷新次数: {{ count }}</p>
    </van-pull-refresh>
  </div>
</template>

<script setup lang='ts'>
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