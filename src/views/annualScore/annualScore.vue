<template>
  <van-pull-refresh v-model="loading" @refresh="onRefresh">
    <div class="wrapper">
      <van-cell-group inset>
        <van-field v-model="fieldValue" is-link readonly label="体测系统" placeholder="选择体测系统" @click="showPicker = true" />
      </van-cell-group>
      <van-cell-group inset v-if="condition">
        <template #title>
          <span>请选择批次</span>
        </template>
        <!-- <van-cell title="item.title" :value="true ? '已测试' : '未测试'" :is-link="true" to=""></van-cell> -->
        <van-cell v-for="(item, index) in score" :key="index" icon="notes-o" center :title="item.platformName"
          :value="item.finish ? '已完成' : '未完成'" :is-link="item.finish"
          :label="item.finish ? `成绩：` + item.score : `成绩 : 0`" @click="handelReport(item)"></van-cell>
      </van-cell-group>
      <div v-if="hasScore" class="flex justify-center items-center mt-2 text-slate-500">
        <div>暂无数据</div>
      </div>

      <van-popup v-model:show="showPicker" round position="bottom">
        <van-picker :columns="columns" @cancel="showPicker = false" @confirm="onConfirm" />
      </van-popup>

      <!-- <router-view></router-view> -->
    </div>
  </van-pull-refresh>
</template>

<script setup lang='ts'>
import { reactive, ref } from 'vue';
import { showFailToast, showLoadingToast,showToast } from 'vant';
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();

const show = ref(false);
const condition = ref(false)//是否有成绩
const hasScore = ref(false)//是否有成绩
const fieldValue = ref('')

// 加载中
const loading = ref(false);

// 下拉刷新
const onRefresh = () => {
  setTimeout(() => {
    showToast('刷新成功');
    getPhysicalList()
    loading.value = false;
    // count.value++;
  }, 500);
};



const columns = ref([])

const showPicker = ref(false);


const score = ref([{
  platformName: '',
  finish: false,
  score: 0
}])

// 获取列表
const getPhysicalList = async () => {
  showLoadingToast({
    message: '加载中...',
    forbidClick: true,
    duration: 500
  });

  const res = await store.dispatch('getPhysicalList')

  if (res) {
    console.log('列表', res);
    columns.value = res
  }
}

getPhysicalList()

// 点击确认
const onConfirm = async ({ selectedOptions }: any) => {
  // console.log(selectedOptions[0].value);
  fieldValue.value = selectedOptions[0].text;
  const formState = {
    studentID: '20221215',
    platformID: selectedOptions[0].value
  }
  const res = await store.dispatch('getScore', formState)
  console.log(res);

  if (res.scoreInfo) {
    score.value = res.scoreInfo
    condition.value = true
    hasScore.value = false
  } else {
    hasScore.value = true
    condition.value = false
  }

  showPicker.value = false;
};

// 查看报告
const handelReport = (item: any) => {
  if (item.finish) {
    console.log(item);
    router.push({
      path: '/scoreReport',
      query: item
    })
  }

}


</script>

<style lang='less' scoped>
.wrapper {
  @apply bg-light-300;
  min-height: calc(100vh - 46px);
  padding: 12px 0;
}
</style>