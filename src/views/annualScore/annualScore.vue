<template>
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
        :value="item.finish ? '已测试' : '未测试'" is-link size="large" :label="item.finish ? `成绩：` + item.score : ''"
        @click="handelReport(item)"></van-cell>
    </van-cell-group>
    <van-popup v-model:show="showPicker" round position="bottom">
      <van-picker :columns="columns" @cancel="showPicker = false" @confirm="onConfirm" />
    </van-popup>
  </div>
</template>

<script setup lang='ts'>
import { reactive, ref } from 'vue';
// import { showFailToast, showLoadingToast } from 'vant';
import { showToast, showLoadingToast } from 'vant';
import store from '../../store';
const active = ref(0);
const show = ref(false);
const condition = ref(false)
const fieldValue = ref('')

const showPopup = () => {
  show.value = true;
};

const columns = ref([])

const result = ref('');
const showPicker = ref(false);


const score = ref([{
  platformName: '',
  finish: false,
  score: 0
}])

const getPhysicalList = async () => {
  showLoadingToast({
    message: '加载中...',
    forbidClick: true,
    duration: 500
  });

  const res = await store.dispatch('getPhysicalList')

  if (res) {
    console.log('123456', res);
    columns.value = res
  }
}

getPhysicalList()

const onConfirm = async ({ selectedOptions }: any) => {
  console.log(selectedOptions[0].value);
  const formState = {
    studentID: '20221215',
    platformID: selectedOptions[0].value
  }
  const res = await store.dispatch('getScore', formState)
  console.log(res);
  if (res) {
    // console.log('-----', res);

    console.log(res.userInfo);
    score.value = res.userInfo


  }
  showPicker.value = false;
  condition.value = true


  fieldValue.value = selectedOptions[0].text;
};

const handelReport = (item: any) => {
  console.log(item);

}

</script>

<style lang='less' scoped>
.wrapper {
  // @apply bg-light-300;
  // min-height: calc(100vh - 46px);
  padding: 12px 0;
}
</style>