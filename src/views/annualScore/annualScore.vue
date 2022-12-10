<template>
  <div class="wrapper">
    <van-cell-group inset>
      <van-field v-model="fieldValue" is-link readonly label="体测系统" placeholder="选择体测系统" @click="showPicker = true" />
    </van-cell-group>
    <van-popup v-model:show="showPicker" round position="bottom">
      <van-picker :columns="columns" @cancel="showPicker = false" @confirm="onConfirm" />
    </van-popup>
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
// import { Popup, showToast, Picker } from 'vant';
import { showToast } from 'vant';
const active = ref(0);
const show = ref(false);

const fieldValue = ref('')

const showPopup = () => {
  show.value = true;
};

const columns = [
  { text: '体测系统', value: 'Hangzhou' },
  { text: '体育考试系统', value: 'Ningbo' },
  { text: '视力系统', value: 'Wenzhou' },
];
const result = ref('');
const showPicker = ref(false);

const onConfirm = ({ selectedOptions }:any) => {
  console.log(selectedOptions);

  showPicker.value = false;
  fieldValue.value = selectedOptions[0].text;
};


</script>

<style lang='less' scoped>
.wrapper {
  @apply bg-light-300;
  color: red;
  min-height: calc(100vh - 46px);
  padding: 12px 0;
}
</style>