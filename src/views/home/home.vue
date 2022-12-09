<template>
  <van-pull-refresh v-model="loading" @refresh="onRefresh">
    <div class="wrapper">
      <!-- 个人信息卡片区域 -->
      <div class="card">
        <div>学号</div>
        <div>姓名</div>
        <div>学校</div>
        <div>班级</div>
      </div>
      <!-- 提示区域 -->
      <van-notice-bar wrapable :scrollable="false" text="不会回头的东西有四件：说出口的话、离弦的箭、逝去的生活和失去的机会。" />
      <!-- 导航区域 -->
      <div class="navBar">
        <van-grid :column-num="2" class="rounded-md">
          <van-grid-item v-for="(item, index) in gridItem" :key="index" :text="item.text">
            <template #icon>
              <van-badge :content="item.badge">

                <svg class="icon" aria-hidden="true">
                  <use :xlink:href="item.icon"></use>
                </svg>
              </van-badge>
              <!-- <van-icon :name="item.icon" size="50" :badge="item.badge" /> -->
            </template>
          </van-grid-item>
        </van-grid>
      </div>
      <!-- 底部按钮 -->
      <div class="cancelBtn">
        <van-button type="primary" color="#1989fa" plain block>取消绑定</van-button>
      </div>


    </div>
  </van-pull-refresh>
</template>

<script setup lang='ts'>
import router from '../../router';
import { NavBar } from 'vant';
import { ref } from 'vue';
import { showToast } from 'vant';

const count = ref(0);
// <van-icon name="coupon-o" />
const gridItem = ref([
  { icon: '#icon-chengjichaxun-01', text: '年度成绩', hasDot: false },
  { icon: '#icon-xuefenchaxun-01', text: '毕业成绩', hasDot: false },
  { icon: '#icon-yixuankecheng-01', text: '体测预约', hasDot: false, badge: "2" },
  { icon: '#icon-shiwuzhaoling-01', text: '预约查询', hasDot: true },
  { icon: '#icon-shetuanhuodong-01-01-01-01-01', text: '体测助手', hasDot: false },
  { icon: '#icon-dangshidati-01', text: '帮助反馈', hasDot: false },

])



const loading = ref(false);
const onRefresh = () => {
  setTimeout(() => {
    showToast('刷新成功');
    loading.value = false;
    count.value++;
  }, 500);
};
</script>

<style lang='less' scoped>
.icon {
  width: 50px;
  height: 50px;
}

.wrapper {
  @apply  flex flex-col bg-light-500 items-center;
  height: calc(100vh - 46px);

  .card {
    @apply my-3 h-120px w-90 bg-light-50 rounded-lg;
  }
  .navBar{
    @apply w-90 my-3;
  }
  .cancelBtn{
    @apply w-90;
  }
}
</style>