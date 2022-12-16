<template>
  <div class="wrapper">
    <div class="login-wrapper">
      <div class="title">汇海大学体侧报名系统</div>
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field left-icon="manager" v-model="user.username" name="姓名" label="姓名" placeholder="请输入姓名"
            :rules="[{ required: true, message: '请填写姓名' }]" />
          <van-field left-icon="lock" v-model="user.studentID" name="学号" label="学号" placeholder="请输入学号"
            :rules="[{ required: true, message: '请填写学号' }]" />
          <van-field left-icon="lock" v-model="user.idCard" name="身份证" label="身份证" placeholder="请输入身份证"
            :rules="[{ required: true, message: '请填写身份证' }]" />
        </van-cell-group>
        <div class="btn-wrapper">
          <van-button round block type="primary" native-type="submit">
            登录
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script setup lang='ts'>

// import router from "../../router";
import { ref, reactive } from "vue";
import { showFailToast, showLoadingToast, showSuccessToast, showToast } from 'vant';
import { useRouter } from "vue-router";
import { setToken } from "../../composables/auth";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();
// 登录模板
const user = reactive({
  username: "admin",
  studentID: "admin",
  idCard: "123456",
});

// 登录用的假数据
const formState = reactive({
  username: "admin",
  password: "123456",
});


//登录事件
const onSubmit = async (values: any) => {
  showLoadingToast({
    message: '加载中...',
    forbidClick: true,
  });

  store
    .dispatch("userlogin", user)
    .then((res) => {
      console.log(res);
      if (res.verifySuccess) {
        showSuccessToast('登录成功')
        router.push("/home");
        store.commit("SET_USERINFO", res.userInfo)
        console.log(store.state);
        
        return
      }

      // toast("登录成功！");
      showFailToast('登录失败')

    })
  // .finally(() => {
  //   loading.value = false;
  // });
  //   登录请求
  //   const res = await login(values);
  //   if (res.data.code === 0) {
  //     store.commit('setUser',res.data.data)
  //     console.log("登录成功");
  //     // router.push("/index");
  //     Toast.success("成功文案");
  //   } else {
  //     console.log("登录失败");
  //     Toast.fail("失败文案");
  //   }
  console.log(values);
  // if (values) {
  //   showSuccessToast('登录成功');
  //   router.push("/home");
  // } else {
  //   showFailToast('登录失败');
  // }
};

</script>

<style lang='less' scoped>
.wrapper {
  min-height: 100vh;
  background: #f2f2f6;
  display: flex;
  flex-direction: column;
}

.login-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.title {
  font-size: 24px;
  display: flex;
  justify-content: center;
  padding-bottom: 10px;
}

.van-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.btn-wrapper {
  margin: 16px;
}
</style>