<template>
  <div>
    <van-nav-bar :title="$route.meta.title" left-arrow @click-left="onClickLeft" />
    <div class="wrapper">
      <router-view />
    </div>
  </div>
</template>

<script setup lang='ts'>
const onClickLeft = () => history.back();
</script>

<style lang='less' scoped>
.wrapper{
  @apply bg-light-300;
  // padding: 32px 0;
  min-height: calc(100vh - 46px);
}
</style>