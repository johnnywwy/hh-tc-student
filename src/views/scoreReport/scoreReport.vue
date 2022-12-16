<template>
  <van-config-provider :theme-vars="themeVars">
    <div class="wrapper">
      <div class="van-cell-group van-cell-group--inset">
        <div class="van-cell">
          <div class="title">2022年度初中生学业水平体测</div>
          <div class="chart">
            <div ref="echartsRef" class="echarts_one"></div>
          </div>
        </div>
      </div>
      <van-collapse class="van-cell-group--inset" v-model="activeNames" ref="collapseRef">
        <template v-for="(item, i) in scoreList">
          <!-- 总分 -->
          <van-collapse-item name="1">
            <template #title>
              <div>
                <div class="list-left">
                  <van-icon name="award-o" />
                  总分
                </div>
              </div>
            </template>
            <template #value>
              <div>
                <div class="list-right">{{ `总分: ` + item.total }}</div>
              </div>
            </template>
            <div class="tips">{{ item.tips }}</div>
            <div class="footer">折算学分: {{ item.credit }}</div>
          </van-collapse-item>
          <!-- 各项 -->
          <van-collapse-item :name=i v-for="(it, i) in item.itemList">
            <template #title>
              <div>
                <div class="list-left">
                  {{ it.title }}
                </div>
              </div>
            </template>
            <template #value>
              <div>
                <div class="list-right">{{ it.score ? `得分: ` + it.score : '' }}</div>
              </div>
            </template>
            <div>
              <van-row>
                <van-col span="6">项目名：</van-col>
                <van-col span="18">{{ it.item }}</van-col>
              </van-row>
              <van-row>
                <van-col span="6">平均分：</van-col>
                <van-col span="18">{{ it.average }}</van-col>
              </van-row>
              <van-row>
                <van-col span="6">原始成绩：</van-col>
                <van-col span="18">{{ it.origina }}</van-col>
              </van-row>
              <van-row>
                <van-col span="6">完成时间：</van-col>
                <van-col span="18">{{ it.complete }}</van-col>
              </van-row>
              <van-row>
                <van-col span="6">评级：</van-col>
                <van-col span="18">{{ it.level }}</van-col>
              </van-row>
            </div>
          </van-collapse-item>
        </template>
      </van-collapse>
    </div>
  </van-config-provider>
</template>

<script setup lang='ts'>
import { onMounted, reactive, ref } from 'vue';
import type { CollapseInstance } from 'vant';
import * as echarts from 'echarts';
import { useRouter } from "vue-router";
import { useStore } from "vuex";
// import store from '../../store';
const collapse = ref(null);
// const activeNames = ref(['1', '2', '3', '4', '5', '6']);


const router = useRouter();
const store = useStore();
const collapseRef = ref<CollapseInstance>();
const echartsRef = ref(null)

// 数组
const scoreArr = ref([])

// echart 初始化
const echartInit = () => {
  const myChart1 = echarts.init(echartsRef.value);
  let option1 = {
    title: {
      // text: 'Basic Radar Chart'
    },
    radar: {
      // shape: 'circle',
      indicator: [
        { name: 'BMI', max: 100 },
        { name: '50米跑', max: 100 },
        { name: '立定跳远', max: 100 },
        { name: '肺活量', max: 100 },
        { name: '坐位体前屈', max: 100 },
        { name: '1000米', max: 100 },
      ]
    },
    series: [
      {
        type: 'radar',
        data: [
          {
            value: scoreArr.value,
          },
        ]
      }
    ]
  };
  myChart1.setOption(option1);
}

// 获取列表
const getScoreList = async () => {
  const res = await store.dispatch('getReport')
  console.log(res);
  if (res) {
    scoreList.value = res
    console.log(scoreList);
    collapseRef.value?.toggleAll(true);
    fn()
    echartInit();
  }
}

const activeNames = ref(['1']);


// 成绩列表
const scoreList = ref<any>([
])


// 赛数据
const fn = () => {
  console.log(scoreList);

  scoreList.value.map(item => {
    // console.log(item);

    // console.log(item.itemList);
    item.itemList.forEach(i => {
      if (i.item !== '身高' && i.item !== '体重') {
        // console.log(i);
        scoreArr.value.push(i.score)
      }
    })
  })
  console.log(scoreArr);
}

getScoreList()



onMounted(() => {
  console.log(collapseRef.value);

  collapseRef.value?.toggleAll(true);
  // console.log(echartsRef.value);
  // getScoreList()

})

const themeVars = {
  collapseItemContentLineHeight: '2.0',
  collapseItemContentTextSize: '18px',
  collapseItemContentTextColor: '#1a1a1a',
  collapseItemTitleDisabledColor: 'red',
};




</script>

<style lang='less' scoped>
.wrapper {
  min-height: calc(100vh - 46px);
  padding: 12px 0;

  .van-cell-group {
    margin-bottom: 20px;

    .van-cell {
      display: flex;
      flex-direction: column;

      .title {
        @apply flex justify-center items-center font-bold;
        font-size: large;
        margin-bottom: 10px;
      }

      .echarts_one {
        height: 220px;
        width: 100%;
        // border: 1px solid red;
      }
    }
  }

  .list-left {
    font-weight: bold;
    font-size: large;
  }

  .list-right {
    font-weight: bold;
    font-size: large;
    color: #dc5e69;
  }

  .tips {
    color: #222;
  }

  .footer {
    display: flex;
    justify-content: end;
    color: #12c37a;
    font-size: large;
    font-weight: bold;
  }
}
</style>