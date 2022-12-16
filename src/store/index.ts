import { createStore } from "vuex";
import { login, getinfo } from "../api/manager";
import { getSysList,getScore,getScoreReport } from '../api/score'
import { setToken, removeToken } from "../composables/auth";
// 创建一个新的 store 实例
const store = createStore({
  state() {
    return {
      // 用户信息
      user: JSON.parse(localStorage.getItem('USER_INFO') as any)||{},
    };
  },
  mutations: {
    // 记录用户信息
    SET_USERINFO(state, user) {
      state.user = user;
      localStorage.setItem('USER_INFO',JSON.stringify(user))
      // setToken('USER_INFO',JSON.stringify(user))
    },
  },
  actions: {
    // 登录
    userlogin({ commit }, { username, studentID,idCard }) {
      return new Promise((resolve, reject) => {
        login(username, studentID, idCard)
          .then((res:any) => {
            console.log(res);
            setToken(res.token);
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    // 获取当前登录用户信息
    getInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getinfo()
          .then((res) => {
            commit("SET_USERINFO", res);
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    //退出登录
    logout({ commit }) {
      // 移除cookies
      removeToken()
      // 清除用户状态
      commit("SET_USERINFO", {});

    },

    // 获取计划列表
    getPhysicalList({commit}){
      return new Promise((resolve, reject) => {
        getSysList()
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    
    // 获取总分
    getScore({commit},{ studentID, platformID }){
      return new Promise((resolve, reject) => {
        getScore(studentID, platformID)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    // 获取详细成绩列表
    getReport({commit}){
      // getScoreReport
      return new Promise((resolve, reject) => {
        getScoreReport()
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    }
  },
});

export default store;