<template>
  <van-nav-bar :title="$route.meta.title" />
  <van-pull-refresh v-model="loading" @refresh="onRefresh">
    <div class="wrapper">
      <!-- 个人信息卡片区域 -->
      <div class="card" v-for="(item, index) in student" :key="index">
        <!-- 左边 -->
        <div class="left">
          <div>
            <p>学号 : {{ item.studentNum }}</p>
          </div>
          <div>姓名 : {{ item.studentName }}</div>
          <div>学校 : {{ item.schoolName }}</div>
          <div>班级 : {{ item.className }}</div>
        </div>
        <!-- 右边 -->
        <div class="right">
          <div class="iconWrapper">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-erweima1"></use>
            </svg>
            <!-- <div>准考证</div> -->
          </div>
        </div>
      </div>
      <!-- 提示区域 -->
      <van-notice-bar wrapable :scrollable="false" left-icon="volume-o"
        text="若对成绩、预约结果等情况存在疑问，请联系学校体测中心，电话400-820-8820，谢谢!" />
      <!-- 导航区域 -->
      <div class="navBar">
        <van-grid :column-num="2" class="rounded-md" clickable>
          <van-grid-item v-for="(item, index) in gridItem" :key="index" :to="item.url">
            <template #icon>
              <van-badge :content="item.badge">
                <svg class="icon" aria-hidden="true">
                  <use :xlink:href="item.icon"></use>
                </svg>
              </van-badge>
            </template>
            <template #text>
              <span>{{item.text}}</span>
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

const student = ref([{
  studentNum: '20221210',
  studentName: '小红红',
  schoolName: '汇海演示大学',
  className: '大数据21-1'
}])


// 宫格图标
const gridItem = ref([
  { icon: '#icon-chengjichaxun-01', text: '成绩查询', hasDot: false, url: '/annualScore' },
  { icon: '#icon-xuefenchaxun-01', text: '毕业成绩', hasDot: false, url: '/graduateScore' },
  { icon: '#icon-yixuankecheng-01', text: '体测预约', hasDot: false, badge: "2", url: '/physicalApply' },
  { icon: '#icon-shiwuzhaoling-01', text: '预约查询', hasDot: true, url: '/searchBooking' },
  { icon: '#icon-shetuanhuodong-01-01-01-01-01', text: '体测助手', hasDot: false, url: '/physicaHelper' },
  { icon: '#icon-dangshidati-01', text: '帮助反馈', hasDot: false, url: '/help' },

])


// 加载中
const loading = ref(false);

// 下拉刷新
const onRefresh = () => {
  setTimeout(() => {
    showToast('刷新成功');
    loading.value = false;
    count.value++;
  }, 500);
};


</script>

<style lang='less' scoped>
.wrapper {
  @apply w-screen flex flex-col items-center font-medium;
  min-height: calc(100vh - 46px);
  display: flex;
  padding: 12px 12px;
  flex-direction: column;
  background-image: linear-gradient(to top, #fff1eb 0%, #ace0f9 100%);
  // background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);

  .card {
    @apply flex justify-between bg-light-50 rounded-lg shadow-lg;
    font-size: 16px;
    width: 350px;
    height: 148px;
    margin-bottom: 10px;
    padding: 15px;

    .left {
      @apply flex justify-between flex-col;
      width: 70%;
    }

    .right {
      @apply flex justify-end items-center;
      width: 30%;

      .iconWrapper {
        @apply flex items-center justify-center flex-col  border border-dark-100;

        .icon {
          margin: 2px;
          width: 24px;
          height: 24px;
        }
      }
    }

  }

  .navBar {
    @apply shadow-lg;
    margin-top: 10px;
    border-radius: 0.5rem;

    .icon {
      width: 50px;
      height: 50px;
    }
  }

  .cancelBtn {
    width: 100%;
    margin-top: 10px;
  }
}
</style>