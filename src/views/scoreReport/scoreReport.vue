<template>
  <van-config-provider :theme-vars="themeVars">
    <div class="wrapper">
      <div class="van-cell-group van-cell-group--inset">
        <div class="van-cell">
          <div class="title">2022年度初中生学业水平体测</div>
          <div class="chart">
            <div ref="echarts_one" class="echarts_one"></div>
          </div>
        </div>
      </div>
      <!-- <van-collapse v-model="activeNames" class="van-cell-group--inset" v-for="(item, index) in scoreList"> -->
      <!-- <van-collapse-item name="1">
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
        </van-collapse-item> -->
      <!-- <van-collapse-item :name=i v-for="(it, i) in item.itemList">
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
              <van-col span="18">{{ it.children }}</van-col>
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
        </van-collapse-item> -->
      <!-- </van-collapse> -->
      <van-collapse class="van-cell-group--inset" v-model="activeNames" ref="collapseRef">
        <van-collapse-item title="标题1" name="1">
          代码是写出来给人看的，附带能在机器上运行。
        </van-collapse-item>
        <van-collapse-item title="标题2" name="2">
          技术无非就是那些开发它的人的共同灵魂。
        </van-collapse-item>
        <van-collapse-item title="标题3" name="3">
          在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。
        </van-collapse-item>
      </van-collapse>
    </div>
  </van-config-provider>
</template>

<script setup lang='ts'>
import { onMounted, reactive, ref } from 'vue';
import type { CollapseInstance } from 'vant';
const collapse = ref(null);
// const activeNames = ref(['1', '2', '3', '4', '5', '6']);

const collapseRef = ref<CollapseInstance>();

const activeNames = ref(['1']);

const scoreList = reactive(
  [
    {
      total: 95.57,
      credit: 15,
      tips: '成绩优秀,请继续保持',
      itemList: [
        {
          title: '短跑',
          item: '50米跑',
          origina: "7.56秒",
          score: 20.54,
          complete: '2022-11-08 11:27:39',
          average: 80.56,
          level: '优秀'
        },
        {
          title: '立定跳远',
          item: '立定跳远',
          origina: '186厘米',
          score: 77.65,
          complete: '2022-11-08 11:27:39',
          average: 80.56,
          level: '优秀'
        },
        {
          title: '身高',
          item: '身高',
          origina: '186厘米',
          score: 0,
          complete: '2022-11-08 11:27:39',
          average: 80.56,
          level: '优秀',
        },
        {
          title: '体重',
          item: '体重',
          origina: '186厘米',
          score: 0,
          complete: '2022-11-08 11:27:39',
          average: 80.56,
          level: '优秀'
        },
        {
          title: 'BMI',
          item: 'BMI',
          origina: '186厘米',
          score: 74.32,
          complete: '2022-11-08 11:27:39',
          average: 80.56,
          level: '优秀',
        },
        {
          title: '肺活量',
          item: '肺活量',
          origina: '4059毫升',
          score: 65.58,
          complete: '2022-11-08 11:27:39',
          average: 80.56,
          level: '优秀'
        },
        {
          title: '坐位体前屈',
          item: '坐位体前屈',
          origina: '25.5cm',
          score: 88.56,
          complete: '2022-11-08 11:27:39',
          average: 80.56,
          level: '优秀'
        },
        {
          title: '1000米跑',
          item: '1000米跑',
          origina: '5分30秒',
          score: 60.53,
          complete: '2022-11-08 11:27:39',
          average: 80.56,
          level: '优秀'
        }
      ]
    }
  ]
)

onMounted(() => {
  // console.log(collapseRef.value);
  collapseRef.value?.toggleAll(true);
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
        @apply flex justify-center items-center font-bold font-size: large;
        margin-bottom: 10px;
      }
    }
  }
}
</style>