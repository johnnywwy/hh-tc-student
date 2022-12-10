<template>
  <div>
    <van-nav-bar :title="$route.meta.title" left-arrow @click-left="onClickLeft" />
    <router-view />
  </div>
</template>

<script setup lang='ts'>
const onClickLeft = () => history.back();
</script>

<style lang='less' scoped>

</style>